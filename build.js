require("esbuild")
  .build({
    entryPoints: ["content.js"],
    bundle: true,
    outfile: "dist/content.js",
    platform: "browser",
    target: ["chrome91"],
    format: "iife",
  })
  .catch(() => process.exit(1));
