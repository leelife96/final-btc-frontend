<template>
  <div class="about-page">
    <h1 class="page-title">암호화폐 비트코인 시세 모니터링 프로젝트</h1>
    <p class="intro-text">
      암호화폐 비트코인의 시세를 실시간으로 모니터링하고, 사용자에게 비트코인
      관련 정보를 제공하는 사이트입니다.
      <br />
      개발자로서의 커리어를 쌓기 위한 마지막 프로젝트로, 프론트엔드와 백엔드
      영역을 나누어 구현하였습니다.
    </p>

    <h2 class="section-title">기술 스택</h2>
    <ul class="tech-stack">
      <li>
        <strong>프론트엔드:</strong> Vue.js, Moment.js, HTML, CSS, JavaScript
      </li>
      <li><strong>백엔드:</strong> Spring Boot, Mybatis, Java</li>
      <li><strong>데이터베이스:</strong> MySQL, HeidiSQL</li>
      <li>
        <strong>기타:</strong> WebSocket, RESTful API, AWS EC2, Git, Ubuntu,
        Nginx, RDS
      </li>
    </ul>

    <h2 class="section-title">주요 기능</h2>
    <div class="features">
      <div class="feature">
        <h5>실시간 비트코인 시세 모니터링</h5>
        <p>
          비트코인의 실시간 시세를 Binance Public Open API를 통해 가져와서 메인
          화면에서 실시간으로 업데이트됩니다.
          <br />
          비트코인의 현재 가격과 시세 변동을 쉽게 확인할 수 있습니다.
        </p>
      </div>

      <div class="feature">
        <h5>실시간 채팅 기능</h5>
        <p>
          WebSocket을 사용하여 실시간 채팅방 기능을 구현하였습니다.
          <br />
          로그인을 하지 않아도 서로의 메시지를 실시간으로 주고받을 수 있습니다.
        </p>
      </div>

      <div class="feature">
        <h5>게시판 기능</h5>
        <p>
          게시판 기능을 통해 사용자들이 게시글을 작성하고, 수정하고, 삭제할 수
          있습니다.
          <br />
          글의 작성자는 로그인한 사용자로 자동 설정되며, 작성한 글의 세부사항을
          확인할 수 있습니다.
        </p>
      </div>

      <div class="feature">
        <h5>로그인 및 회원가입</h5>
        <p>
          사용자는 회원가입을 통해 새로운 계정을 생성할 수 있으며, 로그인 기능을
          통해 개인 계정으로 시스템에 접근할 수 있습니다.
          <br />
          로그인 후에는 개인화된 기능을 사용할 수 있으며, 글쓰기 버튼 등 특정
          기능에 접근할 수 있습니다.
        </p>
      </div>

      <div class="feature">
        <h5>AWS EC2 배포</h5>
        <p>
          AWS EC2 클라우드 컴퓨팅 서비스를 활용하여 실제 웹 사이트를 프론트 영역
          부분만 배포하였습니다.
        </p>
      </div>
    </div>

    <h2 class="section-title">프로젝트의 도전 과제 및 해결 방법</h2>
    <p>
      이번 프로젝트에서의 핵심은 프론트엔드 Vue.js와 백엔드 Spring Boot 간의
      효율적인 데이터 통신과 실시간 데이터 업데이트를 구현하는 것이었습니다.
      <br />
      이를 위해 RESTful API와 WebSocket을 사용하여 데이터의 실시간성을
      보장하였고, Binance 사이트를 직접 둘러보면서 사용자 경험을 고려하여
      직관적인 UI 설계 그리고 디자이닝 하였습니다.
    </p>

    <h2 class="section-title">향후 계획</h2>
    <p>
      향후 계획으로는 비트코인 외에도 다른 암호화폐에 대한 시세 모니터링 기능을
      추가하고, 채팅 기능을 개선하여 더욱 안정적이고 편리한 UX/UI를 제공할
      계획입니다.
      <br />
      웹소켓 부분이 배포된 사이트에서는 기능이 작동하지 않아 고쳐나갈 것입니다.
      <br />
      CI/CD 파이프라인을 구축하여 언제든지 쉽게 수정하고 배포하는 방향으로
      나아가보겠습니다.
      <br />
      또한, 모의투자 기능 작업도 진행할 예정입니다.
    </p>

    <h2 class="section-title">GitHub</h2>
    <p>
      프로젝트의 Frontend 코드는 다음 GitHub 리포지토리에서 확인하실 수
      있습니다:
      <a
        href="https://github.com/leelife96/final-btc-frontend.git"
        target="_blank"
        class="repo-link"
      >
        final-btc-frontend
      </a>
    </p>
    <p>
      프로젝트의 Backend 소스 코드는 다음 GitHub 리포지토리에서 확인하실 수
      있습니다:
      <a
        href="https://github.com/leelife96/final-btc-backend.git"
        target="_blank"
        class="repo-link"
      >
        final-btc-frontend
      </a>
    </p>
  </div>
</template>

<style scoped>
.about-page {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  max-width: 1000px;
  margin: 0 auto;
  color: #ffffff;
}

.page-title {
  color: #2c3e50;
  text-align: center;
  margin-top: 20px;
}

.intro-text {
  text-align: center;
  margin: 0 auto;
}

.section-title {
  margin-top: 80px;
  margin-bottom: 20px;
  color: #2c3e50;
}

.tech-stack {
  list-style-type: none;
  padding: 0;
  margin: 0;
  text-align: center;
}

.tech-stack li {
  margin-bottom: 10px;
}

.features {
  margin-top: 20px;
}

.feature {
  margin-bottom: 20px;
}

.feature h5 {
  font-size: 1.2em;
  color: #2c3e50;
}

.feature p {
  text-align: center;
  margin: 0 auto;
}
</style>
