const { URL } = require("url");

const MyUrl = new URL(
  "http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript"
);

console.log("searchParams", MyUrl.searchParams);
console.log(
  "searchParams.getAll(category)",
  MyUrl.searchParams.getAll("category")
);
console.log("searchParams.get(limit)", MyUrl.searchParams.get("limit"));
console.log("searchParams.has(page)", MyUrl.searchParams.has("page"));

console.log("searchParams.keys()", MyUrl.searchParams.keys());
console.log("searchParams.value()", MyUrl.searchParams.values());
