import * as esbuild from "esbuild";
import { glob } from "glob";

async function build() {
  try {
    // Find all JS and CSS files, excluding node_modules and dist
    const entryPoints = await glob(["./**/*.js", "./**/*.css"], {
      ignore: ["**/node_modules/**", "**/dist/**", "build.js"],
    });

    // Build configuration
    const result = await esbuild.build({
      entryPoints,
      bundle: true,
      minify: true,
      outdir: "dist",
      target: "es2015",
      format: "iife",
      logLevel: "info",
      // Preserve directory structure in output
      outbase: ".",
    });

    console.log("Build completed successfully");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

// Handle watch mode
const isWatch = process.argv.includes("--watch");
if (isWatch) {
  // Start watch mode
  const ctx = await esbuild.context({
    entryPoints: await glob(["./**/*.js", "./**/*.css"], {
      ignore: ["**/node_modules/**", "**/dist/**", "build.js"],
    }),
    bundle: true,
    minify: true,
    outdir: "dist",
    target: "es2015",
    format: "iife",
    logLevel: "info",
    outbase: ".",
  });

  await ctx.watch();
  console.log("Watching for changes...");
} else {
  build();
}
