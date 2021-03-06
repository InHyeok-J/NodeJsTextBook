# 3 노드기능 사용하기

노드로 자바스크립트 파일을 실행하는 방법과 노드가 기본적으로 제공하는 객체와 모듈 사용법에 대해 알아본다. 모듈을 사용하면서 중요한 개념인 버퍼와 스트림, 동기와 비동기, 이벤트, 예외 처리에 대해서 배운다

## 3.1 REPL 사용하기

자바스크립트는 스크립트 언어이므로 미리 컴파일을 하지 않아도 즉석에서 코드를 실행시킬 수 있다. 브라우저 콘솔 탭에서 Js 코드를 입력하는 것 처럼 노드도 비슷한 콘솔을 제공하는데

읽고(Read), 해석하고(Eval), 결과물을 반환하고(Print), 종료할 때 까지 반복(Loop) 한다고 해서 REPL(Read Eval Pring Loop)라 부른다.

<br />

터미널에서 node를 입력하면 실행 시킬 수 있다.

```
$ node
>
```

프롬프트가 > 모양으로 바뀌면 Js코드를 입력할 수 있다.

```
> const hello = 'Hello world ~ ';
undefined
> console.log(hello);
Hello wrold ~
undefined
```

REPL을 종료하려면 Ctrl+ C를 두번 누르거나 REPL 창에 .exit를 입력하면 된다.

## 3.2 Js 파일 실행하기

REPL에 직접 코드를 입력하는 대신 Js파일을 만들어서 실행해보자

- helloWorld.js

```javascript
function helloWorld() {
  console.log("Hello World!");
  helloNode();
}
function helloNode() {
  console.log("Hello Node");
}
helloWorld();
```

```
$ node helloWorld
Hello World!
Hello Node
```

콘솔에서 **node [자바스크립트 파일 경로]** 로 실행하고 확장자(.js)는 생략해도 된다.

## 3.3 모듈로 만들기

노드는 코드를 모듈로 만들 수 있는데 모듈이랑 특정한 기능을 하는 함수나 변수들의 집합이다. 모듈로 만들어 두면 여러 프로그램에서 해당 모듈을 재사용할 수 있다. 보통 파일 하나가 모듈이 된다.

var.js, func.js, index.js를 만들어 보자

- var.js

```javascript
const odd = "홀수 입니다";
const even = "짝수 입니다";
module.exports = {
  odd,
  even,
};
```

modele.exports 에 변수들을 담은 객체를 대입함.

- func.js

```javascript
const { odd, even } = require("./var");

function checkOddOrEven(num) {
  if (num % 2) {
    return odd;
  } else {
    return even;
  }
}
module.exports = checkOddOrEven;
```

require 함수안에 불러올 모듈의 경로를 적어 준다. module.exports에 객체 뿐 아니라 함수를 넣어줘도 된다.

- index.js

```javascript
const { odd, even } = require("./var");
const checkNumber = require("./func");

function checkStringOddOrEven(str) {
  if (str.length % 2) {
    return odd;
  }
  return even;
}
console.log(checkNumber(10));
console.log(checkStringOddOrEven("hello"));
```

<img  src="../images/모듈.png"  width="700px"></img>

ES2015부터는 import from, export default 문법으로 변경됨.
위에서 썼던 require 함수나 module 객체는 따로 선언하지 않았지만 노드에서 제공하는 내장 객체이기 때문에 사용 가능하다.

## 3.4 노드 내장 객체 알아보기

노드는 기본적인 내장 모듈과 내장 객체를 제공한다. 브라우저의 window 객체와 비슷하다고 보면 된다.

### 3.4.1 global

브라우저의 window 객체와 같은 전역 객체이다. 전역 객체이므로 모든 파일에서 접근 가능하다 . global은 생략 가능하다.
이전에 사용한 require는 global.require에서 global이 생략된 것이다.
노드에 로그를 기록하는 console 객체도 global.console다.

> 노드에는 DOM 이나 BOM이 없어 window와 document 객체를 사용할 수 없다. 에러 발생.

### 3.4.2 console

console 객체는 보통 디버깅을 위해 사용된다. 대표적으로는 `console.log`가 있으며 다른 로깅 함수들도 알아보자

```javascript
const string = "abc";
const number = 1;
const boolean = true;
const obj = {
  outside: {
    inside: {
      key: "value",
    },
  },
};
console.time("전체 시간");
console.log("평범한 로그");
console.log(string, number, boolean);
console.error(" 에러 메시지는 console.error에 담아주세요");

console.dir(obj, { colors: false, depth: 2 });
console.dir(obj, { colors: false, depth: 1 });
console.dir(obj, { colors: true, depth: 1 });

console.time("시간 측정");
for (let i = 0; i < 100000; i++) {
  continue;
}
console.timeEnd("시간 측정");

function b() {
  console.trace("에러 위치 추적");
}
function a() {
  b();
}
a();

console.timeEnd("전체 시간");
```

- console.time(레이블) : console.timeEnd(레이블)과 대응 되어 같은 레이블을 가진 time과 timeEnd 사이의 시간 측정
- console.error(에러내용) : 에러를 콘솔에 표시
- console.dir(객체, 옵션): 객체를 콘솔에 표시 , 첫번째 인자로 객체를 넣고 두 번째 인자로 옵션을 넣는다. colors : 콘솔 색 추가 , depth : 객체 안의 객체를 몇 단계 까지 표시할지 설정, default : 2
  <img src="../images/console-dir.png" width="500px"></img>
- console.trace(레이블) : 에러가 어디서 발생했는지 알려준다

### 3.4.3 타이머

프론트 공부하면서 익숙하니깐 간단하게 넘어갑시다..

- setTimeout(콜백, 밀리초) : 주어진 밀리초 이후 콜백 함수를 실행
- setInterval(콜백 , 밀리초) : 주어진 밀리초마다 콜백 함수를 반복
- setImmediate(콜백) : 콜백 함수를 즉시 실행

- clearTimeout(아이디): setTimeout 을 취소
- clearInterval(아이디): setInterval 을 취소
- claerImmediate(아이디): setImmediate 를 취소

### 3.4.4 **filename, **dirname

노드는 `__fiename`, `__dirname` 이라는 키워드로 경로에 대한 정보를 제공한다.

- filename.js

```javascript
console.log(__filename);
console.log(__dirname);
```

콘솔

```
/Users/inhyeokjo/Document/Zerocho-Nodejs/03/filename.js
/Users/inhyeokjo/Document/Zerocho-Nodejs/03
```

경로가 문자열로 반환되고, \ / 같은 경로 구분자 문제도 있어 보통은 이를 해결해 주는 path 모둘과 함께 쓴다..

### 3.4.5 module, exports

기존에 사용한 module.exports 대신 exports 객체를 사용
var.js

```javascript
const odd = "홀수 입니다";
const even = "짝수 입니다";
module.exports = {
  odd,
  even,
};
/*
exports.odd = "홀수입니다";
exports.even = "짝수입니다";
*/
```

두 방식이 동일하게 동작하는 이유는 같은 객체를 참고하기 때문이다. 차이점)

```jsx
module.exports = function abc() {};
```

와 같이 식별자만 있다면 어떤 유형이든 exports 할 수 있으나
exports는

```jsx
exports.속성명 = "값";
```

과 같은 형태로 할당된 값의 키로 속성을 생성하고 해당하는 값을 넘겨주어야 한다.
exports 객체는 반드시 객체처럼 속성명과 속성 값을 대입해야 하며 exprots에 다른 값을 대입하면 객체의 참조 관계가 끊긴다.

exprots와 module.exports에는 참조 관계가 있으므로 한 모듈에 동시에 사용하지 않는것이 좋다.

### 3.4.6 process

process 객체는 현재 실행되고 있는 노드 프로세스에 대한 정보를 담고 있다.

#### 3.4.6.1 process.env

REPL에 process.env를 입력하면 많은 정보가 출력되는데 시스템의 환경 변수들을 보여준다. 또한 서비스의 중요한 키를 저장하는 공간으로도 활용된다.

const secretId = process.env.SECRET_ID

위에 처럼 만들고 process.env에 직접 SECRET_ID 를 넣어주면 되는데 운영체제마다 차이가 있으며 dotenv 모듈을 사용하는것을 권장한다.

#### 3.4.6.2. process.nextTick(콜백)

이벤트 루프가 다른 콜백 함수들보다 nextTick의 콜백 함수를 우선으로 처리하게 만든다.

- nextTick.js

```javascript
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
```

콘솔

```
nextTick
promises
Timeout
setTimmediate
```

process.nextTick은 setImmediate, setTimeout 보다 먼저 실행됨 , resolve된 Promise도 nextTick 처럼 다른 콜백보다 우선시 된다.
이렇게 우선시되는걸 마이크로태스크라고 따로 부른다.

#### 3.4.6.3 process.exit(코드)

실행중인 노드 프로세스를 종료한다. 서버를 멈추게 하거나 서버 외 독립적인 프로그램에서 수동으로 노드를 멈추게 할 수 있다.

process.exit 메서드는 인자로 코드 번호를 줄 수 있다. 인자를 주지 않거나 0 이면 정상 종료를 뜻하고 1을 주면 비정상 종료를 뜻한다.

## 3.5 노드 내장 모듈 사용하기

### 3.5.1 os

웹 브라우저에 사용되는 자바스크립트는 운영체제의 정보를 가져올 수 없지만 노드는 os 모듈에 정보가 담겨 있어 정보를 가져올 수 있다.
os 모듈은 주로 컴퓨터 내부 자원에 빈번하게 접근하는 경우 사용된다. 즉 일반적인 웹 서비스를 제작할 때는 사용 빈도가 높지 않다 하지만 운영체제 별로 다른 서비스를 제공하고 싶을 때 os 모듈이 유용하다

### 3.5.2 path

폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈. path 모듈이 필요한 이유 중 하나는 운영체제별로 경로 구분자가 다르기 때문이다. 크게 Window 타입과 POSIX 타입으로 구분된다.

- Window : C:\Users\ZeroCho 처럼 \ 로 구분
- POSIX : /home/zerchoo 처럼 /로 구분
  **path.sep** → 경로의 구분자, 전 Mac os를 쓰기 때문에 POSIX이고 /입니다.

**path.delimiter** → 환경 변수의 구분자. process.env.PATH 를 입력하면 여러 개의 경로가 이 구분자로 구분되어 있다. 윈도우는 세미콜론(;)이고 POSIX는 콜론(:)이다.

**path.dirname(경로)** → 파일이 위치한 폴더 경로를 보여준다

**path.extname(경로)** → 파일의 확장자를 보여준다

**path.basename(경로, 확장자)** → 파일의 이름(확장자 포함)을 보여주며 파일의 이름만 표시하고 싶다면 두번째 인자에 확장자를 넣어주면 된다.

```jsx
console.log("path.parse()", path.parse(string));
```

```jsx
path.parse() {
  root: '/',
  dir: '/Users/inhyeokjo/Desktop/folder/nodejstextbook/03',
  base: 'path.js',
  ext: '.js',
  name: 'path'
}
```

파일 경로를 root, dir, base, ext, name으로 분리함.

**path.format(객체)**

```jsx
console.log(
  "path.format()",
  path.format({
    dir: "/Users/inhyeokjo/Desktop/folder/nodejstextbook/03",
    name: "path",
    ext: ".js",
  })
);
```

```jsx
path.format() /
  Users /
  inhyeokjo /
  Desktop /
  folder /
  nodejstextbook /
  03 /
  path.js;
```

path.parse()한 객체를 파일 경로로 합친다.

**path.join(경로, ...) path.resolve(경로, ...)**

```jsx
console.log(
  "path.join()",
  path.join(__dirname, "..", "..", "/Users", ".", "/03")
);
console.log(
  "path.resolve():",
  path.resolve(__dirname, "..", "users", ".", "/03")
);
```

```jsx
path.join() /Users/inhyeokjo/Desktop/folder/Users/03
path.resolve(): /03

```

path.join(경로, ...) : 여러 인자를 넣으면 하나의 경로로 합쳐줌, 상대 경로인 ..와 현위치인 . 도 알아서 처리해준다

path.resolve(경로, ...) : join과의 차이점은 join은 상대경로로 처리하지만 resolve는 /를 만나면 절대경로로 인식해 앞의 경로를 무시한다.

### 3.5.3 url

인터넷 주소를 쉽게 조작하도록 도와주는 모듈. url 처리에는 크게 두 가지 방식이 있는데 노드 버전7에서 추가된 WHATWG 방식과 예전부터 노드에서 사용하는 방식이 있다.
사진에서 위에는 기존 url 구분 방식, 아래는 WHATWG 방식이다.

<img src="../images/Url.png" width="800px" height="400px"></img>

- WHATWG API 를 사용하여 URL문자열 분석

```javascript
const myURL = new URL(
  "https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash"
);
```

url 모듈 안에 URL 생성자가 있다. 이 생성자에 주소를 넣어 객체로 만들면 주소가 부분별로 정리된다.

- 기존 API를 사용하여 URL 문자열 분석

```javascript
const url = require("url");
const myURL = url.parse(
  "https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash"
);
```

- url.parse(주소) : 기존 방식에서 사용 , 주소를 분해함
- url.format(객체) : WHATWG 방식과 기존 방식 모두 사용 가능 . 분해되었던 url 객체를 다시 원래 상태로 조립한다.

---

WHATWG 방식은 search 부분을 searchParams 라는 특수한 객체로 반환하므로 유용하다.
search 부분은 보통 주소를 통해 데이터를 전달할 때 사용하는데 ? 로 시작하고 `key=value` 형식으로 데이터를 전달하며 여러 key가 있는 경우 & 로 구분한다.

- searchParams.js

```javascript
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
```

콘솔

```
searchParams URLSearchParams {
  'page' => '3',
  'limit' => '10',
  'category' => 'nodejs',
  'category' => 'javascript' }
searchParams.getAll(category) [ 'nodejs', 'javascript' ]
searchParams.get(limit) 10
searchParams.has(page) true
searchParams.keys() URLSearchParams Iterator { 'page', 'limit', 'category', 'category' }
searchParams.value() URLSearchParams Iterator { '3', '10', 'nodejs', 'javascript' }
```

- getAll(키) : 키에 대항하는 모든 값을 가져옴
- get(키) : 키에 해당하는 첫 번쨰 값만 가져옴
- has(키) : 해당 키가 있는지 없는지를 검사함
- keys() : searchParams의 모든 키를 반복기객체로 가져옴
- values() : searchParams의 모든 키를 반복기 객체로 가져옴.

### 3.5.4 querystring

기존 url 방식을 사용할때 search 부분을 사용하기 쉽게 객체로 만드는 모듈이다.

- querystring.js

```javascript
const url = require("url");
const querystring = require("querystring");

const parsedUrl = url.parse(
  "http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript"
);
const query = querystring.parse(parsedUrl.query);

console.log("querystring.parse()", query);
console.log("querystring.stringify()", querystring.stringify(query));
```

콘솔

```
querystring.parse() [Object: null prototype] {
  page: '3',
  limit: '10',
  category: [ 'nodejs', 'javascript' ]
}
querystring.stringify() page=3&limit=10&category=nodejs&category=javascript
```

- querystring.parse(쿼리) : url의 query 부분을 자바스크립트 객체로 분해해준다.
- querystring.stringify(객체) : 분해된 query 객체를 문자열로 다시 조립해준다.

### 3.5.5 crypto

다양한 방식의 암호화를 도와주는 모듈

#### 3.5.5.1 단방향 암호화

단방향 암호화란 복호화 할 수 없는 암호화 방식을 뜻한다. 복호화는 암호화된 문자열을 원래 문자열로 되돌려놓는것을 의미한다. -> 즉 단방향 암호화는 한 번 암호화하면 원래 문자열을 찾을 수 없다. 비밀번호는 보통 단방향 암호화 알고리즘을 사용해 암호화 한다.

- 복호화할 수 없는 암호화가 필요한 이유
  비밀번호를 예로 들때 비밀번호를 암호화해서 DB에 저장하면 로그인할때마다 입력받은 비밀번호를 같은 암호화 알고리즘으로 암호화 한 후 DB 값과 비교하면 되기에 원래 비밀번호는 어디에도 저장되지 않고 암호화된 문자열로만 비교한다.

- 단방향 암호화 알고리즘은 주로 해시 기법을 사용한다. 해시 기법이란 어떠한 문자열을 고정된 길이의 다른 문자열로 바꿔버리는 방식이다. 입력 문자열의 길이는 다르지만 출력 문자열의 길이는 고정되어있다.

- hash.js

```javascript
const crypto = require("crypto");

console.log(
  "base64 :",
  crypto.createHash("sha512").update("비밀번호").digest("base64")
);
console.log(
  "hex :",
  crypto.createHash("sha512").update("비밀번호").digest("hex")
);
console.log(
  "base64 : ",
  crypto.createHash("sha512").update("다른 비밀번호").digest("base64")
);
```

결과값

```
base64 : dvfV6nyLRRt3NxKSlTHOkkEGgqW2HRtfu19Ou/psUXvwlebbXCboxIPmDYOFRIpqav2eUTBFuHaZri5x+usy1g==
hex : 76f7d5ea7c8b451b773712929531ce92410682a5b61d1b5fbb5f4ebbfa6c517bf095e6db5c26e8c483e60d8385448a6a6afd9e513045b87699ae2e71faeb32d6
base64 :  cx49cjC8ctKtMzwJGBY853itZeb6qxzXGvuUJkbWTGn5VXAFbAwXGEOxU2Qksoj+aM2GWPhc1O7mmkyohXMsQw==
```

- createHash(알고리즘) : 사용할 해시 알고리즘을 넣어준다. md5, sha1, sha256, sha512 등이 가능하나 md5나 sha1은 이미 취약점이 발견되었다. 현재는 sha512정도로 충분하나 나중에 취약해지면 더 강화된 알고리즘으로 바꿔야 함
- update(문자열) : 변환할 문자열을 넣어준다
- digest(인코딩) : 인코딩할 알고리즘을 넣어준다 base64, hex, latin1이 주로 사용되는데 그중 base64가 결과 문자열이 가장 짧아 애용된다.

---

현재는 주로 pbjdf2나 bcrypt, scrypt 라는 알고리즘으로 비밀번호를 암호화 하고 있다. 이중 노드에서 지원하는 pbkdf2에 대해 알아보자 . pbkdf2는 기존 문자열에 salt 라 불리는 문자열을 붙인 후 알고리즘을 반복해서 적용하는 것이다.

- pbjdf2.js

```javascript
const crypto = require("crypto");

crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString("base64");
  console.log("salt:", salt);
  crypto.pbkdf2("비밀번호", salt, 100000, 64, "sha512", (err, key) => {
    console.log("password: ", key.toString("base64"));
  });
});
```

- readomBytes() 메서드로 64바이트 길이의 문자열을 만든다. 이게 salt가 된다.
- pbkdf2() 메서드에는 순서대로 비밀번호, salt, 반복 횟수, 출력 바이트, 해시 알고리즘을 인자로 넣어준다.

<img src="../images/pbkdf2.png" width="600px"></img>
콘솔

```
salt: 38pwNcobWtue5law8bJ7YFuYqXHBcoi9ztk8TfwR12KfVQCC3UG7+XEkyKyLFpUi8nmcACz1pwVi5pPpausR4w==
password:  Pc30MoEWeVdft3LvEOlSp9PGbo/nNGiIRSC1GCcx0rMV5uyDmbpm8teYn3bYUPnTUDofPAmN+O4fikDhplj5LQ==
```

#### 3.5.5.2 양방향 암호화

양방향 암호화는 암호화된 문자열을 복호화 할 수 있다. 여기에는 키라는것이 사용된다. 암호를 복호화하려면 암호화할때 사용한 키와 같은 키를 사용해야 한다.

- cipher.js

```javascript
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
```

책의 예제에서는 `createCipher`를 썼지만 현재 시점에서는 iv를 인자로 받지 않는 `createCipher` 는 deprecated 됐기 때문에 iv를 사용하는 `createCipheriv` 를 사용한다.

- crypto.createCipheriv(알고리즘, 키, iv) : 암호화알고리즘과 키 , iv를 넣는다. aes-256-cbc 알고리즘의 경우 키는 32바이트여야 하고 iv는 16바이트여야 한다. iv는 암호화할때 사용하는 초기화 벡터를 뜻하며 암호화 알고리즘에 iv를 추가하여 임의성을 줄 수 있으며 서로 다른 랜덤값을 iv로 제공해야 한다. (암호 해싱의 salt와 유사하다고 한다..?)
- cipher.update(문자열, 인코딩, 출력 인코딩) : 보통 문자열은 utf8을 암호는 base64를 많이 사용함
- cipher.final(출력 인코딩) : 출력 결과물의 인코딩을 넣으면 암호화 완료
- crypto.createDecipheriv(알고리즘 , 키, iv) : 복호화할때 사용, 암호화할때 사용했던 알고리즘과 키, iv를 그대로 넣어야 한다
- decipher.update(문자열, 인코딩, 출력 인코딩) : 암호화된 문장, 그 문장의 인코딩과 복호화할 인코딩을 넣는다, 위에 cipher.update와 역순으로 넣으면 됨
- decipher.final(출력 인코딩) : 복호화 결과물의 인코딩을 넣는다.
  콘솔

```
암호화 결과 :  GaRrJAlXMFmXjZ76/XOmLvX6j4V387Euc4AlNy9CIR4=
복호화 결과 :  암호화할 문장
```

### 3.5.6 util

util은 각종 평의 기능을 모아둔 모듈이다. 계속해서 추가되고 있고 가끔 deprecated 되어 사라지는 경우도 있다

> - deprecated?
>   프로그래밍 용어로 중요도가 떨어져 더 이상 사용되지 않고 앞으로 사라지게 될 것 이라는 뜻. 새로운 기능이 나와서 기존 기능보다 더 좋을때 deprecated 처리되곤 한다.

- util.js

```javascript
const util = require("util");
const crypto = require("crypto");

const dontUseMe = util.deprecate((x, y) => {
  console.log(x + y);
}, "dontUseMe 함수는 deprecated 되었으니 더 이상 사용하지 마세요! ");
dontUseMe(1, 2);

const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
  .then((buf) => {
    console.log(buf.toString("base64"));
  })
  .catch((error) => {
    console.error(error);
  });
```

- util.deprecate : 함수가 deprecated 되었음을 알려준다, 첫 번째 인자로 넣은 함수를 사용했을때 경고 메시지가 출력되며 두 번째 인자로 경고 메시지를 넣어준다
- util.promisify : 콜백 패턴을 프로미스 패턴으로 바꿔준다.
  콘솔

```
3
(node:30280) DeprecationWarning: dontUseMe 함수는 deprecated 되었으니 더 이상 사용하지 마세요!
rdWvkCowt8/9JFSVHZQ7GwGfqw+amwATF+pky0bzWTkJyoPz0Bqr4xS7JrVMR8SLHun5PmMlAiHSporByHoUlg==
```

## 3.6 파일 시스템 접근하기

fs 모듈은 파일 시스템에 접근하는 모듈이다.

- readme.txt

```txt
저를 읽어주세요
```

- readFile.js

```javascript
const fs = require("fs");

fs.readFile("./readme.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
  console.log(data.toString());
});
```

fs 모듈을 불러온 뒤 읽을 파일의 경로를 지정한다 . 유의할점은 콜백 함수도 인자로 넣어줘야 하는데 이 콜백 함수의 매개변수로 에러 혹은 데이터를 받는다.
콘솔

```
<Buffer ec a0 80 eb a5 bc 20 ec 9d bd ec 96 b4 ec a3 bc ec 84 b8 ec 9a a9>
저를 읽어주세용
```

readFile의 결과물은 버퍼 형식으로 제공되기 때문에 `toString()`을 사용해 문자열로 반환해야한다.

- writeFile.js

```javascript
const fs = require("fs");

fs.writeFile("./writeme.txt", "글이 입력됩니다", (err) => {
  if (err) {
    throw err;
  }
  fs.readFile("./writeme.txt", (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data.toString());
  });
});
```

코드처럼 writeFile 도 가능.

### 3.6.1 동기 메서드와 비동기 메서드

노드는 대부분의 메소드를 비동기 방식으로 처리한다.

- async.js

```javascript
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
```

콘솔

```
시작!
끝
3번 저를 읽어주세용
1번 저를 읽어주세용
2번 저를 읽어주세용
```

시작을 하고 바로 끝이 나오며 순서또한 다르다. readFile는 비동기 메소드이기 때문에 백그라운드에 파일을 읽으라고 요청만 하고 바로 다음작업으로 넘어간다. 나중에 읽기가 완료되면 다시 메인 스레드에 알림을 주고 등록된 콜백함수를 실행한다.

> - 동기와 비동기, 블로킹과 논 블로킹
>   노드에서는 동기와 비동기, 블로킹과 논 블로킹이라는 네 용어가 혼용된다.
> - 동기와 비동기 : 함수가 바로 retrun 되는지 여부
> - 블로킹과 논블로킹 : 백그라운드 작업 완료 여부
>   노드에서는 동기-블로킹 방식과 비동기-논블로킹 방식이 대부분이다. 동기 논블로킹이나 비동기 블로킹 방식은 없다고 봐도 된다. 동기-블로킹 방식은 백그라운드 작업 완료 여부를 계속 확인하며, 호출한 함수가 바로 리턴되지 않고 백그라운드 작업이 끝나야 retrun 되며, 비동기-논블로킹 방식에서는 호출한 함수가 바로 return 되어 다음 작업으로 넘어가고 백그라운드 작업 완료 여부는 신경쓰지 않고 나중에 백그라운드가 알림을 줄 때 처리한다.

순서대로 readFile을 출력하고 싶다면 `readFileSync` 메소드를 사용하면 된다. 하지만 이 방식을 사용했을 때 요청이 수백 개 이상 들어왔을 때 성능에 문제가 생긴다. 이전 작업이 완료되어야 다음 작업이 가능한데 백그라운드가 작업하는동안 메인 스레드는 아무것도 못하고 대기해야 한다. -> **비효율적이다**

비동기 방식으로 하되 순서를 유지하고 싶다면 콜백을 연결하면 된다.

- astncOrder.js

```javascript
const fs = require("fs");

console.log("시작");
fs.readFile("./readme.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("1번", data.toString());
  fs.readFile("./readme.txt", (err, data) => {
    if (err) {
      throw err;
    }
    console.log("2번", data.toString());
    fs.readFile("./readme.txt", (err, data) => {
      if (err) {
        throw err;
      }
      console.log("3번", data.toString());
    });
  });
});
console.log("끝");
```

콘솔

```
시작
끝
1번 저를 읽어주세용
2번 저를 읽어주세용
3번 저를 읽어주세용
```

### 3.6.2 버퍼와 스트림 이해하기

파일을 읽거나 쓰는 방식에는 버퍼를 이용하는 방식과 스트림을 이용하는 방식이 있다. 노드는 파일을 읽을 때 메모리에 파일 크기만큼 공간을 마련해두며, 파일 데이터를 메모리에 저장한 뒤 사용자가 조작할 수 있도록 해준다. 메모리에 저장된 데이터가 버퍼이다

버퍼를 직접 다룰 수 있는 클래스인 Buffer이 있다.

- buffer.js

```javascript
const buffer = Buffer.from("문자열이 버퍼로 바뀝니다");
console.log("from():", buffer);
console.log("length : ", buffer.length);
console.log("toString() : ", buffer.toString());

const array = [
  Buffer.from("띄엄"),
  Buffer.from("띄엄"),
  Buffer.from("띄어쓰기"),
];
const buffer2 = Buffer.concat(array);
console.log("concat():", buffer2.toString());

const buffer3 = Buffer.alloc(5);
console.log("alloc():", buffer3);
```

콘솔

```
from(): <Buffer eb ac b8 ec 9e 90 ec 97 b4 ec 9d b4 20 eb b2 84 ed 8d bc eb a1 9c 20 eb b0 94 eb 80 9d eb 8b 88 eb 8b a4>
length :  35
toString() :  문자열이 버퍼로 바뀝니다
concat(): 띄엄띄엄띄어쓰기
alloc(): <Buffer 00 00 00 00 00>
```

Buffer 객체는 여러 메서드를 제공한다

- from(문자열) : 문자열을 버퍼로 바꿀 수 있다. length 속성은 버퍼의 크기를 알려준다
- toString(버퍼) : 버퍼를 다시 문자열로 바꿀 수 있다. 이때 base64나 hex를 인자로 넣으면 해당 인코딩으로 변환할 수 있다.
- concat(배열): 배열 안에 든 버퍼들을 하나로 합친다
- alloc(바이트) : 빈 버퍼를 생성한다. 바이트를 인자로 지정해주면 해당 크기의 버퍼가 생성된다.

- readFile() 방식의 버퍼가 편리하나 문제점이 있는데 만약 용량이 100MB의 파일이라면 읽을 때 메모리에 100MB의 버퍼를 만들어야 한다.
- 또한 모든 내용을 버퍼에 다 쓴 후에 동작이 넘어가므로 여러 조작을 연달아 할 때 매번 전체 용량를 처리해야 다음 작업으로 넘어갈 수 있다.
- 그래서 버퍼의 크기를 작게 만들어서 여러 번에 나눠서 보내는 방식이 생겼는데 이것이 스트림이다.

파일을 읽는 스트림 메서드로는 createReadStream 이 있다.

- readme3.txt

```txt
저는 조금씩 나눠서 전달됩니다. 나눠진 조각을 chunk라고 합니다.
```

- **createReadStream.js**

```javascript
const fs = require("fs");

const readStream = fs.createReadStream("./readme3.txt", { highWaterMark: 16 });
const data = [];
readStream.on("data", (chunk) => {
  data.push(chunk);
  console.log("data:", chunk, chunk.length);
});
readStream.on("end", () => {
  console.log("end:", Buffer.concat(data).toString());
});
readStream.on("error", (err) => {
  console.log("error:", err);
});
```

콘솔

```
data: <Buffer ec a0 80 eb 8a 94 20 ec a1 b0 ea b8 88 ec 94 a9> 16
data: <Buffer 20 eb 82 98 eb 88 a0 ec 84 9c 20 ec a0 84 eb 8b> 16
data: <Buffer ac eb 90 a9 eb 8b 88 eb 8b a4 2e 20 eb 82 98 eb> 16
data: <Buffer 88 a0 ec a7 84 20 ec a1 b0 ea b0 81 ec 9d 84 20> 16
data: <Buffer 63 68 75 6e 6b eb 9d bc ea b3 a0 20 ed 95 a9 eb> 16
data: <Buffer 8b 88 eb 8b a4 2e 0a> 7
end: 저는 조금씩 나눠서 전달됩니다. 나눠진 조각을 chunk라고 합니다.
```

- `createReadStream()` 으로 읽기 스트림을 만들어준다 첫 번째 인자로 읽을 파일의 경로를 , 두 번째 인자로는 옵션 객체인데 `highWaterMark` 라는 옵션이 버퍼의 크기(바이트)를 정할 수 있는 옵션이다. 기본값은 64KB지만 16으로 낮췄음(보여주기 위해)
- readStram은 이벤트 리스너를 붙여서 사용한다. 보통 data, end , error 이벤트를 사용한다. `readStream.on('data')` 같이 사용.

---

- **createWriteStream.js**

```javascript
const fs = require("fs");
const writeStream = fs.createWriteStream("./write2.txt");
writeStream.on("finish", () => {
  console.log("파일 쓰기 완료");
});
writeStream.write("이 글을 씁니다 \n");
writeStream.write("한번 더 씁니다 .");
writeStram.end();
```

- finish 이벤트 리스너 - 파일 쓰기가 종료되면 콜백 함수 호출
- writeStream에서 제공하는 write() 메서드로 넣을 데이터를 쓴다. 여러번 호출 할 수 있으며 데이터를 다 썼다면 end() 메서드로 종료를 알려준다.
- createReadStream 으로 파일을 읽고 그 스트림을 전달받아 createWriteStream으로 파일을 쓸 수 도 있다. 파일 복사와 비슷하며 스트림끼리 연결하는것을 '파이핑한다' 라고 표현한다. -노드 8.5 전에는 이 방식으로 파일을 복사했다고 하는데 이후에 다른 방식이 나오니깐 생략.

### 3.6.3 기타 fs 메서드

- **fsCreate.js**

```javascript
const fs = require("fs");
fs.access(
  "./folder",
  fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK,
  (err) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.log("폴더 없음");
        fs.mkdir("./folder", (err) => {
          if (err) {
            throw err;
          }
          console.log("폴더 만들기 성공");
          fs.open("./folder/file.js", "w", (err, fd) => {
            if (err) {
              throw err;
            }
            console.log("빈 파일 만들기 성공", fd);
            fs.rename("./folder/file.js", "./folder/newfile.js", (err) => {
              if (err) {
                throw err;
              }
              console.log("이름 바꾸기 성공");
            });
          });
        });
      } else {
        throw err;
      }
    } else {
      console.log("이미 폴더 있음");
    }
  }
);
```

콘솔

```
폴더 없음
폴더 만들기 성공
빈 파일 만들기 성공 22
이름 바꾸기 성공
```

- fs.access(경로, 옵션, 콜백) : 폴더나 파일에 접근할 수 있는지 체크한다. 두 번째 인자로 상수들을 넣었는데 F_OK는 파일 존재 여부, R_OK는 읽기 권한 여부, W_OK는 쓰기 권한 여부를 체크한다. 파일/폴더나 권한이 없다면 에러가 발생하는데, 파일/폴더가 없을 때의 에러 코드는 ENOENT 이다
- fs.mkdir(경로, 콜백) : 폴더를 만드는 메서드이다. 이미 폴더가 있다면 에러가 발생하므로 access() 메서드를 호출해서 확인해야한다
- fs.open(경로, 옵션, 콜백): 파일의 아이디(fd변수)를 가져오는 메서드이다. 파일이 없다면 파일을 생성한 뒤 그 아이디를 가져온다. 가져온 아이디를 사용해 fs.read()나 fs.write()로 읽거나 쓸 수 있다. 두 번째 인자로 어떤 동작을 할 것인지 설정하는데 w는 쓰기 r는 읽기 기존 파일에 추가는 a 이다. (예제에서 r을 넣으면 파일이 없으므로 에러 발생)
- fs.rename(기존 경로, 새 경로, 콜백) : 파일의 이름을 바꾸는 메서드이다.

---

폴더 내용 확인 및 삭제와 관련한 메서드

- **fsDelete.js**

```javascript
const fs = require("fs");

fs.readdir("./folder", (err, dir) => {
  if (err) {
    throw err;
  }
  console.log("폴더 내용 확인", dir);
  fs.unlink("./folder/newFile.js", (err) => {
    if (err) {
      throw err;
    }
    console.log("파일 삭제 성공");
    fs.rmdir("./folder", (err) => {
      if (err) {
        throw err;
      }
      console.log("폴더 삭제 성공");
    });
  });
});
```

콘솔

```
폴더 내용 확인 [ 'newfile.js' ]
파일 삭제 성공
폴더 삭제 성공
```

- fs.readdir(경로,콜백) : 폴더 안의 내용물 확인, 배열 안에 내부 파일과 폴더명이 나온다.
- fs.unlink(경로, 콜백) : 파일을 지울 수 있다. 파일이 없다면 에러가 발생
- fs.rmdir(경로,콜백): 폴더를 지울 수 있다. 폴더 안에 파일이 잇다면 에러가 발생하므로 먼저 내부 파일을 모두 지우고 호출해야 한다.

---

파일 복사

- **copyFile.js**

```javascript
const fs = require("fs");
fs.copyFile("readme4.txt", "write4.txt", (error) => {
  if (error) {
    return console.log(error);
  }
  console.log("복사 완료");
});
```

## 3.7 이벤트 이해하기

```javascript
const EventEmitter = require("events");

const myEvent = new EventEmitter();
myEvent.addListener("event1", () => {
  console.log("이벤트 1");
});
myEvent.on("event2", () => {
  console.log("이벤트2");
});

myEvent.on("event2", () => {
  console.log("이벤트2 추가");
});
myEvent.emit("event1");
myEvent.emit("event2");
```

콘솔

```
이벤트 1
이벤트2
이벤트2 추가
```

myEvent 라는 개체를 먼저 만든다. 이 객체는 이벤트 관리를 위한 메소드를 갖고 있다.

- on(이벤트명, 콜백) : 이벤트 이름과 이벤트 발싱 새의 콜백을 연결해준다. 이렇게 연결하는 동작을 이벤트 리스닝이라 부르며 하나의 이벤트에 여러 개를 달 수 있다.
- addLister(이벤트명, 콜백): on 이랑 동일
- emit(이벤트명) : 이벤트를 호출하는 메서드. 이벤트 이름을 인자로 넣으면 등록한 이벤트 콜백이 실행된다.

## 3.8 예외 처리하기

노드에서는 예외 처리가 중요하다. 예외란 보통 처리하지 못한 에러를 뜻하는데 노드에서는 싱글 스레드 이기 때문에 에러로 인해 스레드가 멈추면 전체 서버가 멈춘다는것을 뜻한다.

- try catch 사용
- error1.js

```javascript
setInterval(() => {
  console.log("시작");
  try {
    throw new Error("서버 고장내기");
  } catch (err) {
    console.log(err);
  }
}, 1000);
```

콘솔

```
시작
Error: 서버 고장내기
    at Timeout._onTimeout (/Users/inhyeokjo/Documents/NodejsAll/Zerocho-NodeJs/03/error1.js:4:11)
    at listOnTimeout (internal/timers.js:554:17)
    at processTimers (internal/timers.js:497:7)
시작
Error: 서버 고장내기
    at Timeout._onTimeout (/Users/inhyeokjo/Documents/NodejsAll/Zerocho-NodeJs/03/error1.js:4:11)
    at listOnTimeout (internal/timers.js:554:17)
    at processTimers (internal/timers.js:497:7)
```

반복..
이렇게 에러가 발생하지만 try, catch로 잡을 수 있다.

예측 불가능한 에러

- error3.js

```javascript
process.on("uncaughtException", (err) => {
  console.log("예기치 못한 에러", err);
});
setInterval(() => {
  throw new Error("서버 고장 내기");
}, 1000);
setTimeout(() => {
  console.log("실행됩니다");
}, 2000);
```

- process 객체에 uncaughtException 이벤트 리스너를 달아줌. 처리하지 못한 에러가 발생 했을 때 이벤트리스너가 실행되고 프로세스가 유지된다. 이 부분이 없다면 setTimeout()구문이 실행되지 않는다. 실행 후 1초만에 setInerval 의 에러때문에 프로세스가 멈추기 때문이다.
- 노드 공식 문서에서는 uncaughtException 이벤트를 최후의 수단으로 사용하라고 한다. 노드는 이 이벤트 발생 후 다음 동작이 제대로 동작하는지 보증하지 않는다. 즉 복구 작업 코드를 넣어두었더라고 확신할 수 없다.
