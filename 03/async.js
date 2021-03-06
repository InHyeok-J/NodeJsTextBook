const fs = require("fs");

console.log("시작!");
fs.readFile("./readme.txt", (err, data) => {
  if (err) {
    throw er;
  }
  console.log("1번", data.toString());
});
fs.readFile("./readme.txt", (err, data) => {
  if (err) {
    throw er;
  }
  console.log("2번", data.toString());
});
fs.readFile("./readme.txt", (err, data) => {
  if (err) {
    throw er;
  }
  console.log("3번", data.toString());
});

console.log("끝");
