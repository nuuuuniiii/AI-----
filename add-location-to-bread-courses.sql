-- bread_courses 테이블에 위치 정보(latitude, longitude) 컬럼 추가
-- Supabase 대시보드의 SQL Editor에서 실행하세요

ALTER TABLE bread_courses 
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8),
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8);

-- 인덱스 추가 (위치 기반 검색 최적화)
CREATE INDEX IF NOT EXISTS idx_bread_courses_location ON bread_courses(latitude, longitude);

