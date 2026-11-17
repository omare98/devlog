---
title: "서버를 켜 둔 채 테스트를 돌렸더니 로그인이 안 됐다: 실행 중인 서버 밑에서 jar가 바뀔 때"
date: 2026-11-17
summary: 로그인 요청에서만 NoClassDefFoundError가 난 이유. 서버가 읽고 있는 jar 파일을 Gradle 테스트가 다시 만들어서, 아직 불러오지 않은 클래스를 찾지 못했다.
tags: [Gradle, Spring Boot, 디버깅, 개발 환경]
---

개발 서버로 상점에 로그인하려는데 이메일 로그인도, Google 로그인도 실패했습니다. 서버 로그에는 이런 오류가 있었습니다.

```
Caused by: java.lang.NoClassDefFoundError: com/ahmad/mall/domain/member/EmailAddress
    at com.ahmad.mall.domain.member.MemberService.authenticate(MemberService.java:282)
Caused by: java.lang.ClassNotFoundException: com.ahmad.mall.domain.member.EmailAddress
```

클래스는 소스에 있었고(최초 구현 때부터 있던 파일), 빌드 결과물에도 있었습니다. 코드를 바꾼 적도 없는 클래스가 "없다"는 오류가 났습니다.

## 원인: 서버가 읽는 jar를 테스트가 다시 만들었다

서버는 `domain` 모듈을 `domain-0.0.1-SNAPSHOT.jar` 파일로 읽습니다. 그런데 직전에 백엔드 전체 테스트를 여러 번 돌렸고, 이때 Gradle이 같은 경로에 그 jar를 다시 만들었습니다. 서버 JVM은 jar를 연 채로 필요한 클래스를 그때그때 불러옵니다. 파일이 새로 만들어지면 JVM이 기억하던 jar 안의 위치와 실제 내용이 어긋나서, **아직 불러오지 않았던 클래스**를 찾지 못합니다.

`EmailAddress`는 로그인할 때 처음 쓰이는 클래스라 서버가 뜰 때는 불러온 적이 없었고, 로그인 순간에야 바뀐 jar에서 찾다가 실패했습니다. 그래서 다른 화면은 멀쩡한데 **처음 쓰는 기능에서만** 오류가 났습니다.

## 해결과 교훈

- 서버를 다시 시작하면 새 jar를 처음부터 읽어서 바로 해결됩니다.
- 서버를 켜 둔 채로 `gradlew test`나 `build`를 돌리면 같은 일이 다시 생길 수 있습니다. 증상은 "내가 안 건드린 클래스가 없다"는 이상한 오류이고, 코드를 뒤져도 원인이 안 나옵니다. **오류가 난 클래스가 소스와 결과물에 있는데도 없다고 하면, 서버 밑의 파일이 바뀐 것은 아닌지 먼저 의심**하면 시간을 아낄 수 있습니다.
- 테스트 DB를 공유해서 전체 테스트를 한 번에 하나만 돌려야 하는 것과 같은 종류의 개발 환경 함정입니다. 서버를 끄고 테스트를 돌리거나, 돌린 뒤 서버를 재시작하는 수밖에 없습니다.

참고로 이 오류는 로그인 실패 화면에서는 "알 수 없는 오류가 발생했습니다"로만 보였습니다. 서버가 오류 코드를 주지 못할 때 화면이 보여 주는 일반 문구라서, 화면 문구가 아니라 **서버 로그**부터 읽어야 하는 사례였습니다.
