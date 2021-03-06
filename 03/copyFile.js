const fs = require("fs");
fs.copyFile("readme.txt", "write4.txt", (error) => {
  if (error) {
    return console.log(error);
  }
  console.log("복사 완료");
});
