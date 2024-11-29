// GAME PLAN

// 1. Handle Command-Line Arguments
//  - Check if `--out` is provided
//  - If not provided, print content to the console
//  - If provided, get output path and input file or URL

// 2. Handle Output to a File
//  - Write the content to the specified file

// 3. Error Handling

import { readFile, writeFile } from "fs";
import axios from "axios";

const argv = process.argv;
let outputFile = null;
let input = null;

function cat(path) {
  readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error("Error reading ", path);
      console.error(err);
      process.exit(1);
    }
    handleOutput(data, outputFile);
  });
}

async function webCat(url) {
  try {
    const resp = await axios.get(url);
    handleOutput(resp.data, outputFile);
  } catch (err) {
    console.error(`Error fetching: , ${url}. ${err}`);
    process.exit(1);
  }
}

// 2. Handle output to a file
function handleOutput(content, outputFile) {
  if (outputFile) {
    writeFile(outputFile, content, "utf8", function (err) {
      if (err) {
        console.error(`Couldn't write ${outputFile}. \n${err}`);
        process.exit(1);
      } else {
        console.log("writing file...");
      }
    });
  } else {
    console.log(content);
  }
}

// 1. Check provided comment line arguments
if (argv[2] === "--out") {
  outputFile = argv[3];
  input = argv[4];
} else {
  input = argv[2];
}

if (input.startsWith("http://")) {
  webCat(input);
} else {
  cat(input);
}
