-- Supabase 테이블 스키마 (snake_case 버전)

-- 1. 빵집 테이블
CREATE TABLE bakeries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  phone VARCHAR(20),
  website TEXT,
  category VARCHAR(100),
  price_range VARCHAR(10),
  parking BOOLEAN DEFAULT false,
  wifi BOOLEAN DEFAULT false,
  takeout BOOLEAN DEFAULT false,
  delivery BOOLEAN DEFAULT false,
  operating_hours JSONB,
  closed_days TEXT[],
  tags TEXT[],
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 사용자 테이블
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  nickname VARCHAR(100) NOT NULL,
  profile_image TEXT,
  level VARCHAR(50) DEFAULT '빵지순례 초급자',
  region VARCHAR(100),
  review_count INTEGER DEFAULT 0,
  total_courses INTEGER DEFAULT 0,
  total_recommendations INTEGER DEFAULT 0,
  last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 리뷰 테이블
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  bakery_id UUID REFERENCES bakeries(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  image_urls TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 빵지순례 코스 테이블
CREATE TABLE bread_courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  region VARCHAR(100) NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  estimated_time VARCHAR(50),
  difficulty VARCHAR(20),
  total_distance VARCHAR(20),
  recommendation_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 코스-빵집 연결 테이블
CREATE TABLE course_bakeries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES bread_courses(id) ON DELETE CASCADE,
  bakery_id UUID REFERENCES bakeries(id) ON DELETE CASCADE,
  order_in_course INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. 추천 테이블
CREATE TABLE recommendations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  bakery_id UUID REFERENCES bakeries(id) ON DELETE CASCADE,
  course_id UUID REFERENCES bread_courses(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. 인덱스 생성
CREATE INDEX idx_bakeries_location ON bakeries(latitude, longitude);
CREATE INDEX idx_reviews_bakery_id ON reviews(bakery_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_course_bakeries_course_id ON course_bakeries(course_id);
CREATE INDEX idx_recommendations_user_id ON recommendations(user_id);

-- 8. RLS (Row Level Security) 설정
ALTER TABLE bakeries ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE bread_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_bakeries ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;

-- 9. 공개 읽기 정책 (모든 테이블)
CREATE POLICY "Public read access" ON bakeries FOR SELECT USING (true);
CREATE POLICY "Public read access" ON users FOR SELECT USING (true);
CREATE POLICY "Public read access" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public read access" ON bread_courses FOR SELECT USING (true);
CREATE POLICY "Public read access" ON course_bakeries FOR SELECT USING (true);
CREATE POLICY "Public read access" ON recommendations FOR SELECT USING (true);

-- 10. 인증된 사용자만 쓰기 가능
CREATE POLICY "Authenticated users can insert" ON bakeries FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update" ON bakeries FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete" ON bakeries FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert" ON users FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update" ON users FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete" ON users FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert" ON reviews FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update" ON reviews FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete" ON reviews FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert" ON bread_courses FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update" ON bread_courses FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete" ON bread_courses FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert" ON course_bakeries FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update" ON course_bakeries FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete" ON course_bakeries FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert" ON recommendations FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update" ON recommendations FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete" ON recommendations FOR DELETE USING (auth.role() = 'authenticated');
