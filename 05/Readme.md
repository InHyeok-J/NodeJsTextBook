# 5 패키지 매니저

## 5.1 npm 알아보기

npm은 Node Package Manager의 약어로 이름 그대로 노드 패키지 매니저이다. 20년 5월 기준 125만개의 달하는 패키지가 npm에 등록되어있다.

> npm의 대체자로 yarn이 있다. yarn은 페이스북이 내놓은 패지키 매니저이다. React나 React Native 같은 페이스북 진영의 프레임워크를 사용할 때 종종 볼 수 있다.

## 5.2 package.json으로 패키지 관리하기

설치한 패키지 수가 많거나 같은 패키지라도 버전별로 기능이 다를 수 있으므로 프로젝트를 설치할 때 패키지도 동일한 버전을 설치하지 않으면 문제가 생길 수 있다. 이때 패키지의 버전을 관리하는 파일이 `package.json`이다.
**노드 프로젝트를 시작하기 전에는 폴더 내부에 무조건 package.json부터 만들고 시작해야 한다**

프로젝트를 시작할 폴더로 이동한후 다음 명령어를 입력한다

```
npm init
```

package name : -> .json 파일에 name 속성에 저장
version : -> 버전
entry point : 자바스크립트 실행 파일의 진입점. .json의 main 속성에 저장.
test commad : .json scripts 속성 안의 test 속성에 저장
keywords : npm 공식 홈페이지에서 패키지를 쉽게 찾을수 있게 해준다.

- package.json

```javascript
{
"name":  "testnode",
"version":  "1.0.0",
"description":  "",
"main":  "index.js",
"scripts":  {
"test":  "echo \"Error: no test specified\" && exit 1"
},
"author":  "",
"license":  "ISC"
}
```

- scripts 부분은 npm 명령어를 저장해두는 부분이다 콘솔에서 npm run [스크립트 명렁어]를 입력하면 해당 스크립트가 실행된다
- 보통 start 명령어에 node [파일명] 을 지정해 두고 npm start 로 실행한다.
- start나 test 같은 스크립트는 run을 붙이지 않아도 실행된다.

6장에서 사용할 express을 설치해보자

```
npm install express
```

- package.json

```
"dependencies":  {
	"express":  "^4.17.1"
}
```

- dependencies 속성이 새로 생겼고 express 라는 이름과 설치된 버전이 .json 파일에 업데이트 됨.
- 이후 node_modules 라는 폴더가 생성되었는데 express 만 설치했지만 이 express가 의존하는 모듈들도 같이 설치되기에 많은 폴더가 담겨져있다.
  <br>
- package-lock.json 이라는 파일도 생성되었다. 내용을 보면 exporess 외에도 node_module 에 들어있는 패키지의 정보가 담겨져있는데 npm으로 패키지를 설치,수정,삭제 할 대마다 내부 의존 관계를 이 파일에 저장한다.

이제 모듈 여러개를 설치해보자 . npm install [패키지1] [패키지2] [패키지3] .. 같이 나열하면 된다

```
npm install morgan cookie-parser express-session
```

개발용 패키지도 설치할 수 있다. 실제 배포시에는 사용되지 않고 개발 중에만 사용할 패키지들이다.
npm install --save-dev [패키지] [...] 로 설치한다

```
npm install --save-dev nodemon
```

```
"dependencies":  {
	"cookie-parser":  "^1.4.5",
	"express":  "^4.17.1",
	"express-session":  "^1.17.1",
	"morgan":  "^1.10.0"
},
	"devDependencies":  {
	"nodemon":  "^2.0.7"
}
```

devDependencies 라는 속성이 생겼는데 이 속성에서는 개발용 패키지들만 따로 관리한다.

- 전역 설치
  npm 에는 전역 설치라는 옵션도 있다. 패키지를 현재 폴더의 node_modules에 설치하는것이 아니라 npm이 설치되어있는 폴더 mac에서는 `/usr/local/lib/node_modules` 에 설치한다. 이 폴더의 경로는 보통 시스템 환경 변수에 등록되어있으므로 전역 설치한 패키지는 콘솔의 커맨드로 설치할 수 있다.

```
npm install --global rimraf
```

rimraf 은 윈도우에서 rm -rf을 사용할 수 있게 해주는 모듈이다. 전역설치한 패키지는 package.json에 기록되지 않는다.

```
rimraf node_modules
```

node_modules 파일을 삭제 했지만 package.json 에 설치한 패키지 내역이 들어 있으므로 npm install만 다시 해주면 다시 설치해준다.

## 5.3 패키지 버전 이해하기

노드의 패키지 버전은 세 자리로 이루어져 있다. 이 이유는 SemVer 방식의 넘버링을 따르기 때문이다.
SerVer은 Semantic Versioning(유의적 버전)의 약어이다. 각 자리가 모드 의미를 가지고 이다는 것이다.

- 첫번째 자리 : major , 주 버전이 0 이면 초기 개발 중, 1부터는 정식 버전이라는 뜻이다. major 버전은 하위 호환이 안 될 정도로 패키지의 내용이 수정되었을 때 올린다. 예를들어 1.5에서 2로 올리면 1.5버전 패키지를 사용하고 있던 사람들이 2.0으로 업데이트를 하면 에러가 발생할 확률이 크다
- 두 번째 자리: minor : minor 버전은 하위 호환이 되는 기능 업데이트 시에 올린다. 버전을 1.5에서 1.6으로 올렸다면 업데이트시 아무문제가 없어야 한다
- 세 번째 자리: patch : 새로운 기능이 추가되었다기 보다는 기존 기능에 문제가 있어 수정했을때 patch 버전을 올린다.

- package.json 에서는 SemVer식 세 자리 버전 외에도 버전 앞에 ^나 ~ 또는 >,< 같은 문자가 붙어있는데 버전에는 포함되지 않지만 설치 또는 업데이트 시 어떤 버전을 설치해야하는지 알려준다.
- ^ :minor 버전까지만 설치 또는 업데이트 한다 예를들어 npm i express@^1.1.1 이면 1.xx까지 업데이트가 되고 2.0은 설치되지 않음.
- ~ : patch 버전까지 설치 또는 업데이트 한다. npm i express@~1.1.1 이면 1.1.x 까지 업데이트 된다.
- > , < , <=. >-= 는 초과 , 미만, 이상, 이하 라는 뜻
- 추가로 @lastest 라는 문자를 붙이면 항상 최신 버전의 패키지를 사용한다.

## 5.4 기타 npm 명령어

npm으로 설치한 패키지를 사용하다가 새로운 기능이 추가되거나 버그를 고친 새로운 버전이 나올때가 있다. npm outdated 명령어로 업데이트 할 수있는 패키지가 있는지 확인 가능하다.

```
npm outdated
Package          Current  Wanted  Latest  Location
cookie-parser    MISSING   1.4.5   1.4.5  testnode
express          MISSING  4.17.1  4.17.1  testnode
express-session  MISSING  1.17.1  1.17.1  testnode
morgan           MISSING  1.10.0  1.10.0  testnode
```

- npm update [패키지명]
- npm uninstall [패키지명]
- npm search [패키지명]
- npm info [패키지명]

등등 이있다.
