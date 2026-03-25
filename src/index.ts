import * as core from "@actions/core";
import * as exec from "@actions/exec";
import {
  installNitro,
  getSourceMetadata,
} from "@chillicream/nitro-github-actions";
import pkg from "../package.json" with { type: "json" };

const nitroVersion: string = pkg.version;

async function executeCommand(): Promise<void> {
  try {
    const tag = core.getInput("tag", { required: true });
    const mcpFeatureCollectionId = core.getInput("mcp-feature-collection-id", {
      required: true,
    });
    const apiKey = core.getInput("api-key", { required: true });
    const sourceMetadataInput = core.getInput("source-metadata") || null;
    const jobId = core.getInput("job-id") || undefined;
    const sourceMetadata =
      sourceMetadataInput ?? JSON.stringify(getSourceMetadata(jobId));
    const cloudUrl = core.getInput("cloud-url") || null;

    const promptPatterns = core.getMultilineInput("prompt-pattern");
    const toolPatterns = core.getMultilineInput("tool-pattern");

    if (promptPatterns.length === 0 && toolPatterns.length === 0) {
      core.setFailed("At least one of prompt-pattern or tool-pattern must be provided.");
      return;
    }

    const args: string[] = [
      "mcp",
      "upload",
      "--tag",
      tag,
      "--mcp-feature-collection-id",
      mcpFeatureCollectionId,
      "--source-metadata",
      sourceMetadata,
    ];

    for (const promptPattern of promptPatterns) {
      args.push("--prompt-pattern", promptPattern);
    }

    for (const toolPattern of toolPatterns) {
      args.push("--tool-pattern", toolPattern);
    }

    if (cloudUrl) {
      args.push("--cloud-url", cloudUrl);
    }

    const env = {
      ...process.env,
      NITRO_API_KEY: apiKey,
    };

    const exitCode = await exec.exec("nitro", args, { env });

    if (exitCode !== 0) {
      core.setFailed(`Nitro CLI exited with code ${exitCode}`);
    }
  } catch (error) {
    core.setFailed(error instanceof Error ? error.message : String(error));
  }
}

async function run(): Promise<void> {
  await installNitro(nitroVersion);

  await executeCommand();
}

run();
