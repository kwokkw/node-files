/* 

-- Accept multiple files paths or URLs
-- Output their content in sequence
-- If `--out` provided, write to a file

*/

// GAME PLAN

// 1. Handle Multiple Command-Line Arguments
//  - Store multiple inputs
//  - Loop through the inputs
//  - For each input, determine if it's URL or path

// 2. Handle Output to a File
//  - If writing to a file, append each content sequentially

// 3. Error Handling

import { readFile, writeFile, appendFile } from "fs";
import axios from "axios";

// Input array
const argvs = process.argv;
let outputFile = null;

// Store multiple input
let inputs = [];

// 1. Check provided comment line arguments
if (argvs[2] === "--out") {
  // Capture output file name
  outputFile = argvs[3];
  // Extract inputs starting from the fourth element
  inputs = argvs.slice(4);
} else {
  // No output file
  // Extract inputs starting from the second element
  inputs = argvs.slice(2);
  console.log("it has no output file");
}

//  TODO!!!!!!!
// Loop through each input
inputs.forEach((input, index) => {
  const append = index > 0 ? true : false;

  // Determine if it's a URl or path
  // Call a function accordingly
  if (input.startsWith("http://")) {
    webCat(input, append);
    console.log("it's a url");
  } else {
    cat(input, append);
    console.log("it's a path");
  }
});

function cat(path, append) {
  readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error("Error reading ", path);
      console.error(err);
      process.exit(1);
    }
    handleOutput(data, outputFile, append);
  });
}

async function webCat(url, append) {
  try {
    const resp = await axios.get(url);
    handleOutput(resp.data, outputFile, append);
  } catch (err) {
    console.error(`Error fetching: , ${url}. ${err}`);
    process.exit(1);
  }
}

// 2. Handle output to a file
function handleOutput(content, outputFile, append) {
  const method = append ? appendFile : writeFile;
  if (outputFile) {
    method(outputFile, content, "utf8", function (err) {
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
