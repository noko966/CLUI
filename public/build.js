const babel = require("@babel/core");
const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "../", "lib", "components");
const outDir = path.join(__dirname, "../", "presentation", "components");

// Function to ensure directory exists or create it
function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Function to copy and transpile files recursively
function copyAndTranspileFiles(srcFolder, outFolder) {
  ensureDirSync(outFolder);

  const entries = fs.readdirSync(srcFolder, { withFileTypes: true });

  console.log(entries);

  entries.forEach((entry) => {
    const srcPath = path.join(srcFolder, entry.name);
    const outPath = path.join(outFolder, entry.name);

    if (entry.isDirectory()) {
      // Recurse into subdirectories
      copyAndTranspileFiles(srcPath, outPath);
    } else {
      // Transpile file
      const { code } = babel.transformFileSync(srcPath, {
        presets: ["@babel/preset-env", "@babel/preset-react"],
      });

      // Ensure file extension is .js
      const outPathWithJsExt = outPath.replace(/\.[^/.]+$/, "") + ".js";
      fs.writeFileSync(outPathWithJsExt, code, "utf-8");
    }
  });
}

// Start the process
copyAndTranspileFiles(srcDir, outDir);
