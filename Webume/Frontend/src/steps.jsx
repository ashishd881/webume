// parseXml.js
export function parseXml(response) {
  // Extract content inside <boltArtifact>...</boltArtifact>
  const xmlMatch = response.match(/<boltArtifact[^>]*>([\s\S]*?)<\/boltArtifact>/);
  if (!xmlMatch) return [];

  const xmlContent = xmlMatch[1];   //xmlMatch[1] is just the inside content (used later as xmlContent).
  const steps = [];
  let stepId = Date.now()+1;

  // Extract artifact title (default: "Project Files")
  const titleMatch = response.match(/title="([^"]*)"/);
  const artifactTitle = titleMatch ? titleMatch[1] : "Project Files";

  // Add a first step (create folder/project)
  steps.push({
    id: stepId++,
    title: artifactTitle,
    description: "",
    type: "create-folder", // replaced StepType.CreateFolder
    status: "pending"
  });

  // Find each <boltAction> tag (type + filePath + inner content)
  const actionRegex = /<boltAction\s+type="([^"]*)"(?:\s+filePath="([^"]*)")?>([\s\S]*?)<\/boltAction>/g;
  let match;

  while ((match = actionRegex.exec(xmlContent)) !== null) {
    const [_, type, filePath, content] = match;

    if (type === "file") {
      // Step to create a file
      steps.push({
        id: stepId++,
        title: `Create ${filePath || "file"}`,
        description: "",
        type: "create-file",
        status: "pending",
        code: content.trim(),
        path: filePath
      });
    } else if (type === "shell") {
      // Step to run a command
      steps.push({
        id: stepId++,
        title: "Run command",
        description: "",
        type: "run-script",
        status: "pending",
        code: content.trim()
      });
    }
  }

  return steps;
}
