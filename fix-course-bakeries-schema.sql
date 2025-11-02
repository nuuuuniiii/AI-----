-- course_bakeries 테이블 스키마 확인 및 수정
-- Supabase 대시보드의 SQL Editor에서 실행하세요

-- 1. 현재 테이블 구조 확인
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'course_bakeries'
ORDER BY ordinal_position;

-- 2. bakery_name 컬럼이 없으면 추가 (NULL 허용)
-- 이미 있으면 이 명령은 실행하지 마세요
-- ALTER TABLE course_bakeries ADD COLUMN IF NOT EXISTS bakery_name VARCHAR(255);

-- 3. bakery_name 컬럼이 있고 NOT NULL이면 NULL 허용으로 변경
-- ALTER TABLE course_bakeries ALTER COLUMN bakery_name DROP NOT NULL;

-- 4. 또는 bakery_name 컬럼을 제거 (권장 - 스키마 파일에 없음)
-- ALTER TABLE course_bakeries DROP COLUMN IF EXISTS bakery_name;

-- 5. 올바른 스키마로 재생성 (bakery_name 없이)
/*
DROP TABLE IF EXISTS course_bakeries CASCADE;

CREATE TABLE course_bakeries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES bread_courses(id) ON DELETE CASCADE,
  bakery_id UUID REFERENCES bakeries(id) ON DELETE CASCADE,
  order_in_course INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_course_bakeries_course_id ON course_bakeries(course_id);
CREATE INDEX idx_course_bakeries_bakery_id ON course_bakeries(bakery_id);

-- RLS 활성화
ALTER TABLE course_bakeries ENABLE ROW LEVEL SECURITY;

-- RLS 정책 생성
CREATE POLICY "Enable read access for all users" ON course_bakeries
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON course_bakeries
    FOR INSERT WITH CHECK (true);
*/

