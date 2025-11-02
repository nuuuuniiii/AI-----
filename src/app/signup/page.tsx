'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth, db } from '@/lib/supabase-client';
import GNB from '@/components/GNB';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (!email || !password || !nickname) {
      setError('이메일, 비밀번호, 닉네임을 모두 입력해주세요.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      setLoading(false);
      return;
    }

    try {
      // 1. Supabase Auth에 회원가입
      const { data: authData, error: signUpError } = await auth.signUp(email, password, {
        emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/login` : undefined
      });

      if (signUpError) {
        setError(signUpError.message || '회원가입에 실패했습니다.');
        setLoading(false);
        return;
      }

      if (!authData.user) {
        setError('사용자 생성에 실패했습니다.');
        setLoading(false);
        return;
      }

      // 2. users 테이블에 사용자 정보 저장
      const { error: userError } = await db.insert('users', {
        id: authData.user.id,
        email: email,
        nickname: nickname,
        totalUploads: 0,
        level: '빵지순례 초급자',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      if (userError) {
        console.error('User data insert error:', userError);
        // 사용자 데이터 저장 실패해도 계속 진행 (나중에 수정 가능)
      }

      // 회원가입 후 세션 확인
      if (authData.user && authData.session) {
        // 세션이 있으면 바로 로그인된 상태로 홈으로 이동
        setMessage('회원가입이 완료되었습니다! 홈으로 이동합니다.');
        setTimeout(() => {
          router.push('/');
        }, 1500);
        return;
      } else if (authData.user) {
        // 세션이 없지만 사용자가 생성된 경우 (이메일 확인 비활성화 상태면 세션이 있어야 함)
        // 혹시 모를 상황을 대비해 로그인 페이지로 이동
        setMessage('회원가입이 완료되었습니다! 로그인해주세요.');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setMessage('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다.');
      console.error('Signup error:', err);
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
              회원가입
            </h1>
            <p className="font-pretendard-semibold text-[18px] text-[#dabea6] leading-[1.4]">
              빵지순례에 함께하세요
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="flex flex-col gap-[20px]">
            {/* Nickname Input */}
            <div className="flex flex-col gap-[8px]">
              <label className="font-pretendard-semibold text-[14px] text-[#50392b]">
                닉네임
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력해주세요"
                className="bg-white border border-[#9a8779] rounded-[10px] px-[16px] py-[12px] font-pretendard-semibold text-[14px] text-[#50392b] placeholder:text-[#9a8779] outline-none focus:border-[#644c39]"
                required
              />
            </div>

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
                placeholder="비밀번호를 입력해주세요 (최소 6자)"
                className="bg-white border border-[#9a8779] rounded-[10px] px-[16px] py-[12px] font-pretendard-semibold text-[14px] text-[#50392b] placeholder:text-[#9a8779] outline-none focus:border-[#644c39]"
                required
                minLength={6}
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

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#644c39] border border-[#644c39] border-solid flex items-center justify-center py-[16px] rounded-[10px] cursor-pointer hover:bg-[#5a4231] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-[10px]"
            >
              <p className="font-bold leading-[1.4] text-[20px] text-[#edebe9] uppercase whitespace-nowrap" style={{ fontFamily: 'Helvetica Neue, Noto Sans KR, sans-serif', fontWeight: 700 }}>
                {loading ? '회원가입 중...' : '회원가입'}
              </p>
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-[30px] text-center">
            <p className="font-pretendard-semibold text-[14px] text-[#846d5c]">
              이미 계정이 있으신가요?{' '}
              <Link href="/login" className="text-[#644c39] hover:underline">
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

