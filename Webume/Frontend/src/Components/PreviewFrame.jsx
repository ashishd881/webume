import React, { useEffect, useState } from 'react';
import { WebContainer } from '@webcontainer/api';

// Utility to strip ANSI escape codes and spinner frames
const cleanAnsi = (text) =>
  text
    .replace(/\x1b\[[0-9;]*[a-zA-Z]/g, '') // remove color codes
    .replace(/[\r\n]+/g, '\n')             // normalize newlines
    .trim();

export function PreviewFrame({ files, webContainer }) {
  const [url, setUrl] = useState("");
  const [logs, setLogs] = useState([]); // For in-app console

  // Helper to append logs
  const addLog = (message) => {
    setLogs((prev) => [...prev, message]);
  };

  useEffect(() => {
    if (!webContainer) return;

    async function main() {
      try {
        addLog("Mounting project...");
        // Mount files (ensure a valid tree)
        await webContainer.mount(
          files.reduce((tree, file) => {
            tree[file.name] =
              file.type === 'file'
                ? { file: { contents: file.content || '' } }
                : { directory: {} };
            return tree;
          }, {})
        );

        addLog("Running npm install...");
        const installProcess = await webContainer.spawn('npm', ['install']);
        installProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              const clean = cleanAnsi(data);
              if (clean && !['\\', '|', '/', '-'].includes(clean)) {
                addLog(clean);
              }
            },
          })
        );
        await installProcess.exit;

        addLog("Starting dev server...");
        const devProcess = await webContainer.spawn('npm', ['run', 'dev']);
        devProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              const clean = cleanAnsi(data);
              if (clean) addLog(clean);
            },
          })
        );

        devProcess.exit.then((code) =>
          addLog(`Dev server exited with code: ${code}`)
        );

        // Detect when server is ready
        webContainer.on('server-ready', (port, serverUrl) => {
          addLog(`Server ready at: ${serverUrl} (port ${port})`);
          setUrl(serverUrl);
        });
      } catch (error) {
        addLog(`Error: ${error.message}`);
      }
    }

    main();
  }, [webContainer, files]);

  return (
    <div className="h-full flex flex-col bg-gray-900 text-gray-200">
      {/* Logs panel */}
      <div className="bg-black p-2 text-sm h-40 overflow-auto font-mono border-b border-gray-700">
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>

      {/* Preview or loading */}
      <div className="flex-1 flex items-center justify-center">
        {!url ? (
          <p className="text-gray-400">Loading preview...</p>
        ) : (
          <iframe
            title="Preview"
            width="100%"
            height="100%"
            src={url}
            className="border-none"
          />
        )}
      </div>
    </div>
  );
}
  