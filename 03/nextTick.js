setImmediate(() => {
  console.log("setImmediate");
});
process.nextTick(() => {
  console.log("nextTick");
});
setTimeout(() => {
  console.log("Timeout");
}, 0);
Promise.resolve().then(() => console.log("promises"));
