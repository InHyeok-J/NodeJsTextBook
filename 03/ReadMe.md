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

<img  src="../imgaes/모듈.png"  width="700px"></img>

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

<img src="../images/url.png" width="800px" height="400px"></img>

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
