# Supabase 데이터 마이그레이션 가이드

이 가이드는 기존 JSON 데이터를 Supabase 데이터베이스로 마이그레이션하는 과정을 설명합니다.

## 1. Supabase 프로젝트 설정

### 1.1 Supabase 프로젝트 생성
1. [Supabase](https://supabase.com)에 가입
2. 새 프로젝트 생성
3. 프로젝트 URL과 API 키 복사

### 1.2 환경 변수 설정
`.env.local` 파일에 다음 내용 추가:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 2. 데이터베이스 스키마 생성

### 2.1 SQL 스키마 실행
1. Supabase 대시보드의 SQL Editor로 이동
2. `supabase-schema.sql` 파일의 내용을 복사하여 실행
3. 테이블이 성공적으로 생성되었는지 확인

### 2.2 생성되는 테이블
- `users`: 사용자 정보
- `bread_courses`: 빵지순례 코스
- `bakeries`: 빵집 정보
- `reviews`: 리뷰
- `recommendations`: 추천
- `popular_courses`: 인기 코스
- `user_stats`: 사용자 통계

## 3. 데이터 마이그레이션

### 3.1 마이그레이션 페이지 접속
브라우저에서 `http://localhost:3003/migrate`로 접속

### 3.2 마이그레이션 실행
1. **전체 데이터 마이그레이션**: 모든 JSON 데이터를 한 번에 마이그레이션
2. **개별 마이그레이션**: 특정 데이터만 선택적으로 마이그레이션
   - 사용자 데이터 (user-ranking.json)
   - 코스 데이터 (my-courses.json + other-user-courses.json)
   - 빵집 데이터 (real-bakery-locations.json)
   - 인기 코스 데이터 (landing-popular-courses.json)

## 4. 마이그레이션되는 데이터

### 4.1 사용자 데이터 (10명)
- 닉네임, 프로필 이미지, 레벨, 지역
- 업로드 수, 추천 수, 마지막 활동 시간

### 4.2 코스 데이터
- 내 코스 + 다른 사용자 코스
- 코스명, 설명, 지역, 썸네일
- 추천 수, 공개 여부

### 4.3 빵집 데이터
- 실제 빵집 위치 정보
- 이름, 주소, 좌표, 이미지
- 전화번호, 웹사이트, 카테고리
- 운영시간, 휴무일, 편의시설

### 4.4 인기 코스 데이터
- 월별 인기 코스 순위
- 추천 수 기반 랭킹

## 5. 확인 방법

### 5.1 Supabase 대시보드에서 확인
1. Table Editor에서 각 테이블의 데이터 확인
2. 데이터가 정상적으로 저장되었는지 확인

### 5.2 테스트 페이지에서 확인
1. `http://localhost:3003/supabase-test`로 접속
2. 회원가입/로그인 테스트
3. 데이터 조회/추가 테스트

## 6. 문제 해결

### 6.1 환경 변수 오류
- `.env.local` 파일의 URL과 키가 올바른지 확인
- Supabase 프로젝트가 활성화되어 있는지 확인

### 6.2 테이블 생성 오류
- SQL 스키마가 올바르게 실행되었는지 확인
- RLS 정책이 올바르게 설정되었는지 확인

### 6.3 데이터 마이그레이션 오류
- 네트워크 연결 상태 확인
- Supabase 프로젝트의 API 제한 확인
- 콘솔에서 오류 메시지 확인

## 7. 다음 단계

마이그레이션이 완료되면:
1. 기존 JSON 데이터 대신 Supabase 데이터 사용
2. 실시간 데이터 동기화 구현
3. 사용자 인증 시스템 구축
4. 데이터 CRUD 기능 구현

## 8. 파일 구조

```
src/
├── lib/
│   ├── supabase.ts              # Supabase 클라이언트 설정
│   ├── supabase-client.ts       # 인증 및 DB 유틸리티
│   └── migrate-data.ts          # 데이터 마이그레이션 스크립트
├── data/
│   └── user-ranking.ts          # 사용자 데이터 (TypeScript)
├── types/
│   └── data.ts                  # 데이터 타입 정의
└── app/
    ├── migrate/
    │   └── page.tsx             # 마이그레이션 페이지
    └── supabase-test/
        └── page.tsx             # 테스트 페이지
```

## 9. 주의사항

- 마이그레이션 전에 기존 데이터를 백업하세요
- RLS 정책이 올바르게 설정되어 있는지 확인하세요
- 프로덕션 환경에서는 더 신중하게 마이그레이션하세요
