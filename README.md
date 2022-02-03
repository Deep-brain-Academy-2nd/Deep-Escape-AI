# DEEPESCAPE AI

딥브레인AI 개인 프로젝트 - 방탈출 AI 소개 서비스

[**웹 사이트 바로가기**](http://ec2-3-36-65-216.ap-northeast-2.compute.amazonaws.com/) 👈

<br />

## 🗂 목차

- [**프로젝트 소개**](#1)
- [**기술 스택**](#2)
- [**주요 기능**](#3)
- [**웹서비스 소개**](#4)
- [**개발 기간**](#5)
- [**실행 방법**](#6)
- [**참고 사이트**](#7)

<div id='1'></div>
<br />

### 💁‍♂️ 프로젝트 소개

- 딥브레인AI 풀스택 2기 개인 프로젝트
- 주제: 방탈출 소식과 정보를 알려주는 AI 제작 관리 서비스
- 개요: 대중에게는 다소 생소한 방탈출에 대한 정보와 소식을 영상AI를 통해 소개하는 서비스입니다. 관리자는 방탈출 소개 영상과 어워즈 영상, 테마 영상 등에 대해 제작 및 관리를 할 수가 있으며 사용자는 영상 및 페이지를 통해 원하는 정보를 얻을 수 있습니다. 나아가 실제 매장의 경우 룰과 자물쇠 설명, 입장 안내 등에 있어서 많은 시간을 소모하게 되는데 추후 키오스크 안내원을 통해 모든 안내를 하게 된다면 인건비 절감에 도움이 될 것 같다는 생각이 들어 본 서비스를 만들게 되었습니다.

<div id='2'></div>
<br />

### 🛠 기술 스택

1. Front-end : typescript, react, redux, redux-saga, styled-components, antd
2. Back-end : node, express, mongoose
3. Database : mongoDB
4. External API : 딥브레인AI - AI Studios API
5. DevOps : Git, Github, AWS EC2, Nginx

<div id='3'></div>
<br />

### 💡 주요 기능

- 서비스 소개 페이지
  1. 방탈출에 대한 AI 안내와 방탈출 정보 등을 통한 서비스 소개
- 테마 페이지
  1. 방탈출 어워즈로 선정된 올해의 테마 정보
  2. 방탈출 테마 정보(미완료)
- 관리 페이지
  1. 영상 제작 및 관리
  2. 테마 정보 생성 및 관리(미완료)
- 로그인 페이지
  1. 로그인, 회원가입

<div id='4'></div>
<br />

### ⭐️ 웹서비스 소개

|            서비스 소개 페이지 UI             |
| :------------------------------------------: |
| <img src='./images/intro.gif' alt='intro' /> |

|                    로그인                    |
| :------------------------------------------: |
| <img src='./images/login.gif' alt='login' /> |

|               관리자 페이지 UI               |
| :------------------------------------------: |
| <img src='./images/admin.gif' alt='admin' /> |

|                      영상 수정                      |
| :-------------------------------------------------: |
| <img src='./images/adminUpdate.gif' alt='update' /> |

|                테마 페이지 UI                |
| :------------------------------------------: |
| <img src='./images/theme.gif' alt='theme' /> |

<div id='5'></div>
<br />

### 🗓 개발 기간

`2022.01.11(화) ~ 2022.01.25(화)`

<div id='6'></div>
<br />

### 🖥 실행 방법

- 로컬에 mongodb가 실행되고 있어야 원활하게 서비스 이용이 가능합니다.

1. 저장소 복제
2. frontend 이동 후 설치

```bash
$ cd frontend
$ yarn install
$ yarn start
```

3. 새로운 터미널 열기
4. backend 이동 후 설치

```bash
$ cd backend
$ yarn install
$ yarn start
```

<div id='7'></div>
<br />

### 📌 참고 사이트

- [**인트로 게임영상**](https://pixabay.com/ko/videos/%EA%B2%8C%EC%9E%84-%EC%9A%B0%EB%A6%AC-%EA%B0%80%EC%9A%B4%EB%8D%B0-%EC%9A%B0%EC%A3%BC%EC%84%A0-72488/)
- [**이미지 출처**](https://unsplash.com/)
