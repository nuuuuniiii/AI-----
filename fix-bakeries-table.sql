-- bakeries 테이블 수정
-- 1. id 컬럼을 UUID로 변경하고 기본값 설정
ALTER TABLE bakeries ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- 2. 또는 id 컬럼을 SERIAL로 변경 (자동 증가)
-- ALTER TABLE bakeries ALTER COLUMN id SET DEFAULT nextval('bakeries_id_seq');

-- 3. RLS 정책도 추가
CREATE POLICY "Enable read access for all users" ON bakeries
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON bakeries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON bakeries
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON bakeries
    FOR DELETE USING (true);
