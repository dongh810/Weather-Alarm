## 프로젝트 기획

Lambda를 활용한 서버리스 경험 및 다양한 AWS 서비스경험을 목적으로 Lambda 외에도 ELB, EC2, S3를 사용하여 날씨알림 애플리케이션을 구현

## 프로젝트 진행

### 협업내용

- Github Project를 활용하여 팀원 간 일정을 관리하고 실시간으로 맡은업무를 업데이트 하며 협업 진행

<img width="1709" alt="스크린샷 2024-07-11 오후 3 12 45" src="https://github.com/dongh810/Weather-Alarm/assets/105986200/cfe46faf-18e0-4115-9dc9-68d0006d0b23">

<img width="1709" alt="스크린샷 2024-07-11 오후 3 12 35" src="https://github.com/dongh810/Weather-Alarm/assets/105986200/0e331a91-c2a8-4ace-a1f3-2caed6e5842b">


- Miro를 활용하여 설계도 작성 및 의견 공유하며 협업 진행

<img width="1709" alt="스크린샷 2024-07-11 오후 3 16 36" src="https://github.com/dongh810/Weather-Alarm/assets/105986200/9686714d-e52b-4011-b90b-fdb49df918b1">

### 시스템 아키텍처

- Application Load Balancer에 FrontEnd와 BackEnd를 EC2서버로 띄워 관리하도록 TargetGroup으로 설정
- 사용자가 날씨정보를 얻고싶은 지역과 원하는 시간을 선택하면 그 데이터를 S3에 저장
- 데이터는 S3에 JSON형식으로 저장해서 관리
- Spring Scheduler가 1분마다 원하는 S3안의 시간값을 탐색해서 현재시간과 일치하면 알림을 신청한 지역의 날씨정보를 날씨API를 통해 획득
- 날씨정보와 사용자의 이메일을 Lambda로 전달하면 Lambda에서 SMTP를 활용하여 사용자에게 날씨정보를 전달

<img width="819" alt="KakaoTalk_Photo_2024-07-03-18-20-23" src="https://github.com/dongh810/Weather-Alarm/assets/105986200/cdd39288-2fc5-4b1f-b462-f1330180b594">

### 시연영상

https://github.com/dongh810/Weather-Alarm/assets/105986200/bc0608f1-369c-4cf7-bab3-2831cc2d3f41

