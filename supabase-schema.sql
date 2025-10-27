-- Supabase 데이터베이스 스키마 생성
-- 이 SQL을 Supabase 대시보드의 SQL Editor에서 실행하세요

-- 1. 사용자 테이블 (Supabase auth.users와 연동)
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  nickname VARCHAR(50) NOT NULL,
  profileImage TEXT,
  totalUploads INTEGER DEFAULT 0,
  level VARCHAR(20) DEFAULT '빵지순례 초급자',
  region VARCHAR(20),
  lastActiveAt TIMESTAMP WITH TIME ZONE,
  isActive BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 빵지순례 코스 테이블
CREATE TABLE bread_courses (
  id VARCHAR(50) PRIMARY KEY,
  userId UUID REFERENCES users(id) ON DELETE CASCADE,
  courseName VARCHAR(100) NOT NULL,
  description TEXT,
  region VARCHAR(20) NOT NULL,
  thumbnailUrl TEXT,
  totalRecommendations INTEGER DEFAULT 0,
  isPublic BOOLEAN DEFAULT TRUE,
  isActive BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 빵집 테이블
CREATE TABLE bakeries (
  id VARCHAR(50) PRIMARY KEY,
  courseId VARCHAR(50) REFERENCES bread_courses(id) ON DELETE CASCADE,
  bakeryName VARCHAR(100) NOT NULL,
  address VARCHAR(200) NOT NULL,
  detailedAddress VARCHAR(300),
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  imageUrl TEXT,
  phoneNumber VARCHAR(20),
  website TEXT,
  category VARCHAR(50),
  priceRange VARCHAR(10),
  parking BOOLEAN DEFAULT FALSE,
  wifi BOOLEAN DEFAULT FALSE,
  takeout BOOLEAN DEFAULT TRUE,
  delivery BOOLEAN DEFAULT FALSE,
  operatingHours JSONB,
  closedDays JSONB,
  orderInCourse INTEGER NOT NULL,
  isActive BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 리뷰 테이블
CREATE TABLE reviews (
  id VARCHAR(50) PRIMARY KEY,
  bakeryId VARCHAR(50) REFERENCES bakeries(id) ON DELETE CASCADE,
  userId UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  images JSONB,
  isActive BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 추천 테이블
CREATE TABLE recommendations (
  id VARCHAR(50) PRIMARY KEY,
  courseId VARCHAR(50) REFERENCES bread_courses(id) ON DELETE CASCADE,
  fromUserId UUID REFERENCES users(id) ON DELETE CASCADE,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(courseId, fromUserId)
);

-- 6. 인기 코스 테이블
CREATE TABLE popular_courses (
  id VARCHAR(50) PRIMARY KEY,
  courseId VARCHAR(50) REFERENCES bread_courses(id) ON DELETE CASCADE,
  month VARCHAR(7) NOT NULL,
  rank INTEGER NOT NULL,
  totalRecommendations INTEGER NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(courseId, month)
);

-- 7. 사용자 통계 테이블
CREATE TABLE user_stats (
  userId UUID REFERENCES users(id) ON DELETE CASCADE PRIMARY KEY,
  totalUploads INTEGER DEFAULT 0,
  totalRecommendations INTEGER DEFAULT 0,
  totalReviews INTEGER DEFAULT 0,
  averageRating DECIMAL(3, 2) DEFAULT 0.00,
  lastActiveAt TIMESTAMP WITH TIME ZONE,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_nickname ON users(nickname);
CREATE INDEX idx_users_totalUploads ON users(totalUploads);
CREATE INDEX idx_users_region ON users(region);

CREATE INDEX idx_courses_userId ON bread_courses(userId);
CREATE INDEX idx_courses_region ON bread_courses(region);
CREATE INDEX idx_courses_totalRecommendations ON bread_courses(totalRecommendations);
CREATE INDEX idx_courses_isPublic ON bread_courses(isPublic);

CREATE INDEX idx_bakeries_courseId ON bakeries(courseId);
CREATE INDEX idx_bakeries_bakeryName ON bakeries(bakeryName);
CREATE INDEX idx_bakeries_coordinates ON bakeries(latitude, longitude);
CREATE INDEX idx_bakeries_category ON bakeries(category);
CREATE INDEX idx_bakeries_orderInCourse ON bakeries(orderInCourse);

CREATE INDEX idx_reviews_bakeryId ON reviews(bakeryId);
CREATE INDEX idx_reviews_userId ON reviews(userId);
CREATE INDEX idx_reviews_rating ON reviews(rating);

CREATE INDEX idx_recommendations_courseId ON recommendations(courseId);
CREATE INDEX idx_recommendations_fromUserId ON recommendations(fromUserId);

CREATE INDEX idx_popular_courses_courseId ON popular_courses(courseId);
CREATE INDEX idx_popular_courses_month ON popular_courses(month);
CREATE INDEX idx_popular_courses_rank ON popular_courses(rank);

CREATE INDEX idx_user_stats_totalUploads ON user_stats(totalUploads);
CREATE INDEX idx_user_stats_totalRecommendations ON user_stats(totalRecommendations);

-- RLS (Row Level Security) 활성화
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bread_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE bakeries ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE popular_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- RLS 정책 생성
-- 사용자 정책
CREATE POLICY "Users can view all users" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- 코스 정책
CREATE POLICY "Users can view all courses" ON bread_courses FOR SELECT USING (true);
CREATE POLICY "Users can insert own courses" ON bread_courses FOR INSERT WITH CHECK (auth.uid() = userId);
CREATE POLICY "Users can update own courses" ON bread_courses FOR UPDATE USING (auth.uid() = userId);
CREATE POLICY "Users can delete own courses" ON bread_courses FOR DELETE USING (auth.uid() = userId);

-- 빵집 정책
CREATE POLICY "Users can view all bakeries" ON bakeries FOR SELECT USING (true);
CREATE POLICY "Users can insert bakeries" ON bakeries FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update bakeries" ON bakeries FOR UPDATE USING (true);

-- 리뷰 정책
CREATE POLICY "Users can view all reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert own reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = userId);
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE USING (auth.uid() = userId);
CREATE POLICY "Users can delete own reviews" ON reviews FOR DELETE USING (auth.uid() = userId);

-- 추천 정책
CREATE POLICY "Users can view all recommendations" ON recommendations FOR SELECT USING (true);
CREATE POLICY "Users can insert own recommendations" ON recommendations FOR INSERT WITH CHECK (auth.uid() = fromUserId);
CREATE POLICY "Users can delete own recommendations" ON recommendations FOR DELETE USING (auth.uid() = fromUserId);

-- 인기 코스 정책
CREATE POLICY "Users can view all popular courses" ON popular_courses FOR SELECT USING (true);

-- 사용자 통계 정책
CREATE POLICY "Users can view all user stats" ON user_stats FOR SELECT USING (true);
CREATE POLICY "Users can update own stats" ON user_stats FOR UPDATE USING (auth.uid() = userId);
CREATE POLICY "Users can insert own stats" ON user_stats FOR INSERT WITH CHECK (auth.uid() = userId);

-- 함수 생성 (업데이트 시간 자동 갱신)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 생성
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bread_courses_updated_at BEFORE UPDATE ON bread_courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bakeries_updated_at BEFORE UPDATE ON bakeries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_popular_courses_updated_at BEFORE UPDATE ON popular_courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_stats_updated_at BEFORE UPDATE ON user_stats FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
