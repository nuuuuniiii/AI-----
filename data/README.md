# 빵지순례 앱 Mock 데이터 가이드

## 📁 데이터 파일 구조

### 🎯 화면별 Mock 데이터

#### 1. `landing-popular-courses.json` - 랜딩페이지 인기 코스
```json
{
  "courseId": "course_jeju_001",
  "courseName": "제주 감귤 빵지순례 코스",
  "regionName": "제주도",
  "thumbnailUrl": "https://...",
  "recommendationCount": 156,
  "bakeries": [
    {
      "bakeryId": "bakery_jeju_001",
      "bakeryName": "제주 서귀포 아늑한 빵집"
    }
  ]
}
```

#### 2. `my-courses.json` - 나만의 빵지순례 지도
```json
{
  "courseId": "course_my_001",
  "courseName": "내 제주 감귤 빵지순례",
  "regionName": "제주도",
  "iconCoordinates": {
    "lat": 33.2397,
    "lng": 126.4120
  },
  "bakeries": [...],
  "reviews": [...]
}
```

#### 3. `course-registration.json` - 코스 등록 화면
```json
{
  "bakeryId": "bakery_reg_001",
  "bakeryName": "제주 서귀포 아늑한 빵집",
  "imageUrl": "https://...",
  "closedDays": ["Monday"],
  "rating": 5,
  "reviewText": "제주 감귤을 활용한...",
  "coordinates": {
    "lat": 33.2397,
    "lng": 126.4120
  }
}
```

#### 4. `user-ranking.json` - 사용자 탐색 화면
```json
{
  "userId": "user_001",
  "nickname": "빵지순례마스터",
  "profileImage": "https://...",
  "reviewUploadCount": 45,
  "level": "빵지순례 마스터",
  "region": "서울"
}
```

#### 5. `other-user-courses.json` - 타인 지도 화면
```json
{
  "courseId": "course_other_001",
  "courseName": "제주 감귤 빵지순례 코스",
  "bakeries": [
    {
      "bakeryId": "bakery_other_001",
      "bakeryName": "제주 서귀포 아늑한 빵집",
      "lat": 33.2397,
      "lng": 126.4120,
      "reviews": [...],
      "canRecommend": true,
      "recommendationCount": 23
    }
  ]
}
```

### 🗺️ 지도 연동 데이터

#### `real-bakery-locations.json` - 실제 빵집 위치 정보
- **상세 주소**: 지오코딩 API 연동용
- **좌표**: 지도 마커 표시용
- **운영시간**: JSON 형태로 상세 정보
- **시설 정보**: 주차, 와이파이, 포장, 배달 여부
- **지역 코드**: 행정구역 정보

#### `map-integration.json` - 지도 설정
- **지역별 경계**: 각 지역의 지도 bounds
- **마커 스타일**: 지역별 색상, 아이콘 설정
- **API 엔드포인트**: 카카오/네이버/구글맵 연동 정보

### 🗄️ 데이터베이스 스키마

#### `database-schema.json` - DB 구조
- **테이블 정의**: 모든 테이블의 컬럼 및 제약조건
- **인덱스**: 성능 최적화를 위한 인덱스
- **뷰**: 자주 사용되는 쿼리를 위한 뷰
- **트리거**: 자동 업데이트를 위한 트리거
- **스토어드 프로시저**: 복잡한 로직 처리

## 🔄 API 연동 가이드

### 1. 지도 API 연동
```javascript
// 카카오맵 API 사용 예시
const mapConfig = {
  center: new kakao.maps.LatLng(36.5, 127.5),
  level: 7
};

// 빵집 마커 표시
bakeries.forEach(bakery => {
  const marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(bakery.coordinates.lat, bakery.coordinates.lng),
    title: bakery.bakeryName
  });
  marker.setMap(map);
});
```

### 2. 지오코딩 API 연동
```javascript
// 주소를 좌표로 변환
async function geocodeAddress(address) {
  const response = await fetch(`/api/geocode?address=${encodeURIComponent(address)}`);
  const data = await response.json();
  return {
    lat: data.lat,
    lng: data.lng
  };
}

// 좌표를 주소로 변환
async function reverseGeocode(lat, lng) {
  const response = await fetch(`/api/reverse-geocode?lat=${lat}&lng=${lng}`);
  const data = await response.json();
  return data.address;
}
```

### 3. 실시간 데이터 업데이트
```javascript
// 추천 수 실시간 업데이트
const updateRecommendationCount = (courseId) => {
  const courseElement = document.querySelector(`[data-course-id="${courseId}"]`);
  const countElement = courseElement.querySelector('.recommendation-count');
  
  fetch(`/api/courses/${courseId}/recommendations/count`)
    .then(response => response.json())
    .then(data => {
      countElement.textContent = data.count;
    });
};
```

## 📊 데이터 흐름

### 1. 랜딩페이지 → 인기 코스 캐러셀
```
API: GET /api/courses/popular?month=2024-01
데이터: landing-popular-courses.json
UI: 캐러셀 컴포넌트
```

### 2. 내 지도 → 코스 마커 표시
```
API: GET /api/users/me/courses
데이터: my-courses.json
UI: 지도 마커 + 모달
```

### 3. 코스 등록 → 빵집 정보 저장
```
API: POST /api/courses
데이터: course-registration.json
저장: database-schema.json 구조
```

### 4. 사용자 탐색 → 랭킹 표시
```
API: GET /api/users/ranking
데이터: user-ranking.json
UI: 랭킹 리스트
```

### 5. 타인 지도 → 코스 정보 표시
```
API: GET /api/users/:userId/courses
데이터: other-user-courses.json
UI: 읽기 전용 지도 + 추천 버튼
```

## 🚀 MVP 이후 확장

### Phase 2: 실시간 데이터
- WebSocket을 통한 실시간 추천 수 업데이트
- 실시간 사용자 랭킹 변경
- 실시간 인기 코스 순위 변경

### Phase 3: 고급 지도 기능
- 경로 안내 기능
- 대중교통 연동
- 실시간 교통 정보

### Phase 4: 개인화
- 사용자 취향 기반 코스 추천
- 지역별 맞춤 빵집 추천
- AI 기반 리뷰 분석

## 🔧 개발 시 주의사항

### 1. 좌표 정확도
- 실제 빵집 위치와 Mock 데이터 좌표 일치 확인
- 지도 API 좌표계 통일 (WGS84)
- 마커 클러스터링 성능 고려

### 2. 데이터 일관성
- bakeryId는 모든 파일에서 일관성 유지
- userId는 실제 사용자와 매핑
- courseId는 빵지순례 코스와 일치

### 3. 성능 최적화
- 대용량 이미지 최적화
- 지도 마커 렌더링 최적화
- API 응답 시간 최적화

### 4. 보안
- 사용자 데이터 암호화
- API 키 보안 관리
- 파일 업로드 보안 검증


