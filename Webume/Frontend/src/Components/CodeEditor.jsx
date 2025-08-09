import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

export default function CodeEditor({file}) {
   if (!file) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select a file to view its content
      </div>
    );
  }

  return (
    <Editor
      height="100%"
      defaultLanguage="typescript"
      theme="vs-dark"
      value={file.content || ''}
      options={{
        readOnly: false,
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on',
        scrollBeyondLastLine: false,
      }}
    />
  );
}
