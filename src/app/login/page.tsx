'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/supabase-client';
import GNB from '@/components/GNB';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 이미 로그인되어 있으면 메인 페이지로 이동
    const checkUser = async () => {
      const { user } = await auth.getCurrentUser();
      if (user) {
        router.push('/');
      }
    };
    checkUser();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      setLoading(false);
      return;
    }

    try {
      const { data, error: loginError } = await auth.signIn(email, password);

      if (loginError) {
        // "Email not confirmed" 오류인 경우 자동으로 이메일 확인 처리 시도
        if (loginError.message?.includes('Email not confirmed') || loginError.message?.includes('email_not_confirmed')) {
          try {
            // API Route를 호출하여 이메일 확인 처리
            const confirmResponse = await fetch('/api/confirm-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email }),
            });

            const confirmData = await confirmResponse.json();

            if (confirmResponse.ok) {
              // 이메일 확인 처리 후 다시 로그인 시도
              const { data: retryData, error: retryError } = await auth.signIn(email, password);
              if (retryError) {
                setError(retryError.message || '로그인에 실패했습니다.');
              } else {
                setMessage('로그인 성공!');
                setTimeout(() => {
                  router.push('/');
                }, 500);
              }
            } else {
              // 이메일 확인 실패 시, 다시 로그인 시도 (Supabase 설정에 따라 작동할 수 있음)
              // 또는 사용자에게 안내
              const { data: retryData, error: retryError } = await auth.signIn(email, password);
              if (retryError) {
                // 여전히 실패하면, Supabase 대시보드 설정 확인 필요
                setError('이메일 확인이 필요합니다. Supabase 대시보드에서 이메일 확인을 비활성화하거나 이메일을 확인해주세요.');
              } else {
                setMessage('로그인 성공!');
                setTimeout(() => {
                  router.push('/');
                }, 500);
              }
            }
          } catch (confirmErr) {
            // API 호출 실패 시, 일반 로그인 오류로 처리하거나 재시도
            console.error('Confirm email error:', confirmErr);
            setError('이메일 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
          }
        } else {
          // 다른 로그인 오류
          setError(loginError.message || '이메일 또는 비밀번호가 올바르지 않습니다.');
        }
      } else {
        setMessage('로그인 성공!');
        // 로그인 성공 후 홈으로 이동
        setTimeout(() => {
          router.push('/');
        }, 500);
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white flex flex-col items-start relative w-full min-h-screen">
      <GNB />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center w-full flex-1 px-[70px] py-[100px]">
        <div className="w-full max-w-[500px]">
          {/* Header */}
          <div className="mb-[50px] text-center">
            <h1 className="font-bagel-fat-one text-[50px] text-[#50392b] uppercase leading-[1.4] mb-[10px]">
              로그인
            </h1>
            <p className="font-pretendard-semibold text-[18px] text-[#dabea6] leading-[1.4]">
              빵지순례에 오신 것을 환영합니다
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-[20px]">
            {/* Email Input */}
            <div className="flex flex-col gap-[8px]">
              <label className="font-pretendard-semibold text-[14px] text-[#50392b]">
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력해주세요"
                className="bg-white border border-[#9a8779] rounded-[10px] px-[16px] py-[12px] font-pretendard-semibold text-[14px] text-[#50392b] placeholder:text-[#9a8779] outline-none focus:border-[#644c39]"
                required
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-[8px]">
              <label className="font-pretendard-semibold text-[14px] text-[#50392b]">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해주세요"
                className="bg-white border border-[#9a8779] rounded-[10px] px-[16px] py-[12px] font-pretendard-semibold text-[14px] text-[#50392b] placeholder:text-[#9a8779] outline-none focus:border-[#644c39]"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-[10px] px-[16px] py-[12px]">
                <p className="font-pretendard-semibold text-[14px] text-red-600">
                  {error}
                </p>
              </div>
            )}

            {/* Success Message */}
            {message && (
              <div className="bg-green-50 border border-green-200 rounded-[10px] px-[16px] py-[12px]">
                <p className="font-pretendard-semibold text-[14px] text-green-600">
                  {message}
                </p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#644c39] border border-[#644c39] border-solid flex items-center justify-center py-[16px] rounded-[10px] cursor-pointer hover:bg-[#5a4231] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-[10px]"
            >
              <p className="font-bold leading-[1.4] text-[20px] text-[#edebe9] uppercase whitespace-nowrap" style={{ fontFamily: 'Helvetica Neue, Noto Sans KR, sans-serif', fontWeight: 700 }}>
                {loading ? '로그인 중...' : '로그인'}
              </p>
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-[30px] text-center">
            <p className="font-pretendard-semibold text-[14px] text-[#846d5c]">
              계정이 없으신가요?{' '}
              <Link href="/signup" className="text-[#644c39] hover:underline">
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

