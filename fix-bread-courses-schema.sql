-- bread_courses 테이블의 created_by 컬럼을 NULL 허용으로 변경

-- 기존 외래 키 제약 조건 삭제
ALTER TABLE bread_courses DROP CONSTRAINT IF EXISTS bread_courses_created_by_fkey;

-- created_by 컬럼을 NULL 허용으로 변경
ALTER TABLE bread_courses ALTER COLUMN created_by DROP NOT NULL;

-- 외래 키 제약 조건 다시 추가 (NULL 허용)
ALTER TABLE bread_courses ADD CONSTRAINT bread_courses_created_by_fkey 
FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL;
