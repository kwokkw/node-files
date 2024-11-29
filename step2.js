import { readFile } from "fs";
import axios from "axios";

function cat(path) {
  readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log("Error reading ", path);
      console.log(err);
      process.exit(1);
    }
    console.log(data);
  });
}

async function webCat(url) {
  try {
    const resp = await axios.get(url);
    console.log(resp.data);
  } catch (err) {
    console.log(`Error fetching: , ${url}: ${err}`);
    process.exit(1);
  }
}

// The 3rd item in process.argv is the user input
const input = process.argv[2];

if (input.startsWith("http://")) {
  webCat(input);
} else {
  cat(input);
}
