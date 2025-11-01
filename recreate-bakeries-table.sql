-- bakeries 테이블 완전 재생성

-- 1. 기존 테이블 삭제
DROP TABLE IF EXISTS bakeries CASCADE;

-- 2. 새 테이블 생성 (ID 자동 생성)
CREATE TABLE bakeries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- 3. RLS 활성화
ALTER TABLE bakeries ENABLE ROW LEVEL SECURITY;

-- 4. RLS 정책 생성
CREATE POLICY "Enable read access for all users" ON bakeries
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON bakeries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON bakeries
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON bakeries
    FOR DELETE USING (true);
