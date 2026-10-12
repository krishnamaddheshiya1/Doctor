const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");

const adminHtml = fs.readFileSync(path.join(rootDir, "admin.html"), "utf8");
const adminJs = fs.readFileSync(path.join(rootDir, "admin.js"), "utf8");
const indexHtml = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");
const styleCss = fs.readFileSync(path.join(rootDir, "style.css"), "utf8");
const scriptJs = fs.readFileSync(path.join(rootDir, "script.js"), "utf8");

fs.writeFileSync(
    path.join(__dirname, "adminHtml.js"),
    "module.exports = " + JSON.stringify(adminHtml) + ";\n"
);

fs.writeFileSync(
    path.join(__dirname, "adminJs.js"),
    "module.exports = " + JSON.stringify(adminJs) + ";\n"
);

fs.writeFileSync(
    path.join(__dirname, "indexHtml.js"),
    "module.exports = " + JSON.stringify(indexHtml) + ";\n"
);

fs.writeFileSync(
    path.join(__dirname, "styleCss.js"),
    "module.exports = " + JSON.stringify(styleCss) + ";\n"
);

fs.writeFileSync(
    path.join(__dirname, "scriptJs.js"),
    "module.exports = " + JSON.stringify(scriptJs) + ";\n"
);

console.log("Successfully bundled all assets");
