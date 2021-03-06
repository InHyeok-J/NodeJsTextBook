const crypto = require("crypto");
const IV_LENGTH = 16; // For AES, this is always 16
const key = "abcdefghijklmnopabcdefghijklmnop";
const iv = crypto.randomBytes(IV_LENGTH);

function encrypt(text) {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let result = cipher.update(text, "utf8", "base64");
  result += cipher.final("base64");

  return result;
}

function decrypt(text) {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let result2 = decipher.update(text, "base64", "utf8");
  result2 += decipher.final("utf8");
  return result2;
}

const text = "암호화할 문장";
const encryptResult = encrypt(text);
const decryptResult = decrypt(encryptResult);

console.log("암호화 결과 : ", encryptResult);
console.log("복호화 결과 : ", decryptResult);
