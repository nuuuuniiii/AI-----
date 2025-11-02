-- 이메일 확인을 자동으로 처리하는 SQL 함수
-- Supabase 대시보드의 SQL Editor에서 이 함수를 실행하세요

CREATE OR REPLACE FUNCTION auto_confirm_email(user_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- auth.users 테이블에서 해당 이메일의 사용자를 찾아 email_confirmed를 true로 설정
  UPDATE auth.users
  SET email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
      updated_at = NOW()
  WHERE email = user_email
    AND email_confirmed_at IS NULL;
  
  -- 업데이트된 행이 있으면 true 반환
  RETURN FOUND;
END;
$$;

-- 이 함수를 실행할 수 있는 권한 부여 (public으로 설정하여 모든 사용자가 호출 가능)
GRANT EXECUTE ON FUNCTION auto_confirm_email(TEXT) TO anon, authenticated;

