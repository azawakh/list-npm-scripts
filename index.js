#!/usr/bin/env node

const fs = require("fs");

const args = process.argv;

fs.readFile("./package.json", "utf8", (err, data) => {
  if (err) {
    throw err;
  }
  const json = JSON.parse(data);
  if (json.scripts) {
    if (args[2]) {
      const scriptName = args[2];
      if (json.scripts[scriptName]) {
        process.stdout.write(`${json.scripts[scriptName]}\n`);
        return;
      } else {
        process.stdout.write("そんなもんねー！！\n");
        return;
      }
    }

    const maxLength = Math.max.apply(
      null,
      Object.keys(json.scripts).map((scriptName) => scriptName.length)
    );

    const scripts = Object.entries(
      json.scripts
    ).map(([scriptName, command]) => [
      scriptName,
      " ".repeat(maxLength + 3 - scriptName.length),
      command,
    ]);
    process.stdout.write("npm scripts:\n");
    process.stdout.write("  [command]\n");
    scripts.forEach(([scriptName, shims, command]) => {
      process.stdout.write(`    ${scriptName}${shims}${command}\n`);
    });
  }
});
