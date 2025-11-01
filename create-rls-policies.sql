-- RLS 정책 생성 (권장 방법)

-- 1. bakeries 테이블 정책
-- 모든 사용자가 읽기 가능
CREATE POLICY "Enable read access for all users" ON bakeries
    FOR SELECT USING (true);

-- 모든 사용자가 삽입 가능
CREATE POLICY "Enable insert for all users" ON bakeries
    FOR INSERT WITH CHECK (true);

-- 모든 사용자가 업데이트 가능
CREATE POLICY "Enable update for all users" ON bakeries
    FOR UPDATE USING (true);

-- 모든 사용자가 삭제 가능
CREATE POLICY "Enable delete for all users" ON bakeries
    FOR DELETE USING (true);

-- 2. users 테이블 정책
CREATE POLICY "Enable read access for all users" ON users
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON users
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON users
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON users
    FOR DELETE USING (true);

-- 3. reviews 테이블 정책
CREATE POLICY "Enable read access for all users" ON reviews
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON reviews
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON reviews
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON reviews
    FOR DELETE USING (true);

-- 4. bread_courses 테이블 정책
CREATE POLICY "Enable read access for all users" ON bread_courses
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON bread_courses
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON bread_courses
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON bread_courses
    FOR DELETE USING (true);

-- 5. recommendations 테이블 정책
CREATE POLICY "Enable read access for all users" ON recommendations
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON recommendations
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON recommendations
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON recommendations
    FOR DELETE USING (true);
