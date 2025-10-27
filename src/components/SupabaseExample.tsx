'use client'

import { useState, useEffect } from 'react'
import { auth, db } from '@/lib/supabase-client'

export default function SupabaseExample() {
  const [user, setUser] = useState<any>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // 현재 사용자 확인
  useEffect(() => {
    const checkUser = async () => {
      const { user } = await auth.getCurrentUser()
      setUser(user)
    }
    checkUser()
  }, [])

  // 회원가입
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { data, error } = await auth.signUp(email, password)
    
    if (error) {
      setMessage(`회원가입 실패: ${error.message}`)
    } else {
      setMessage('회원가입 성공! 이메일을 확인해주세요.')
    }
    setLoading(false)
  }

  // 로그인
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { data, error } = await auth.signIn(email, password)
    
    if (error) {
      setMessage(`로그인 실패: ${error.message}`)
    } else {
      setMessage('로그인 성공!')
      setUser(data.user)
    }
    setLoading(false)
  }

  // 로그아웃
  const handleSignOut = async () => {
    const { error } = await auth.signOut()
    if (error) {
      setMessage(`로그아웃 실패: ${error.message}`)
    } else {
      setMessage('로그아웃 성공!')
      setUser(null)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Supabase 인증 예제</h2>
      
      {user ? (
        <div>
          <p className="mb-4">안녕하세요, {user.email}님!</p>
          <button
            onClick={handleSignOut}
            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSignUp} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">회원가입</h3>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? '처리중...' : '회원가입'}
            </button>
          </form>

          <form onSubmit={handleSignIn}>
            <h3 className="text-lg font-semibold mb-2">로그인</h3>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? '처리중...' : '로그인'}
            </button>
          </form>
        </div>
      )}

      {message && (
        <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
          {message}
        </div>
      )}
    </div>
  )
}
