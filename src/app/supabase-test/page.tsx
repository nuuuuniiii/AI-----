'use client'

import { useState, useEffect } from 'react'
import { auth, db } from '@/lib/supabase-client'

export default function SupabaseTestPage() {
  const [user, setUser] = useState<any>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [courses, setCourses] = useState<any[]>([])
  const [bakeries, setBakeries] = useState<any[]>([])

  // 현재 사용자 확인
  useEffect(() => {
    const checkUser = async () => {
      const { user } = await auth.getCurrentUser()
      setUser(user)
      if (user) {
        loadData()
      }
    }
    checkUser()
  }, [])

  // 데이터 로드
  const loadData = async () => {
    try {
      // 코스 데이터 로드
      const { data: coursesData, error: coursesError } = await db.select('courses')
      if (coursesError) throw coursesError
      setCourses(coursesData || [])

      // 빵집 데이터 로드
      const { data: bakeriesData, error: bakeriesError } = await db.select('bakeries')
      if (bakeriesError) throw bakeriesError
      setBakeries(bakeriesData || [])
    } catch (error) {
      console.error('데이터 로드 실패:', error)
    }
  }

  // 회원가입
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { data, error } = await auth.signUp(email, password)
      
      if (error) {
        setMessage(`회원가입 실패: ${error.message}`)
      } else {
        setMessage('회원가입 성공! 이메일을 확인해주세요.')
        // 프로필 생성
        if (data.user) {
          await db.insert('profiles', {
            id: data.user.id,
            email: data.user.email,
            nickname: email.split('@')[0]
          })
        }
      }
    } catch (error) {
      setMessage(`오류: ${error}`)
    }
    setLoading(false)
  }

  // 로그인
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { data, error } = await auth.signIn(email, password)
      
      if (error) {
        setMessage(`로그인 실패: ${error.message}`)
      } else {
        setMessage('로그인 성공!')
        setUser(data.user)
        loadData()
      }
    } catch (error) {
      setMessage(`오류: ${error}`)
    }
    setLoading(false)
  }

  // 로그아웃
  const handleSignOut = async () => {
    try {
      const { error } = await auth.signOut()
      if (error) {
        setMessage(`로그아웃 실패: ${error.message}`)
      } else {
        setMessage('로그아웃 성공!')
        setUser(null)
        setCourses([])
        setBakeries([])
      }
    } catch (error) {
      setMessage(`오류: ${error}`)
    }
  }

  // 테스트 데이터 추가
  const addTestData = async () => {
    if (!user) return

    try {
      // 테스트 코스 추가
      const { data: courseData, error: courseError } = await db.insert('courses', {
        user_id: user.id,
        title: '테스트 빵지순례 코스',
        description: 'Supabase 연결 테스트용 코스입니다.'
      })

      if (courseError) throw courseError

      // 테스트 빵집 추가
      const { data: bakeryData, error: bakeryError } = await db.insert('bakeries', {
        name: '테스트 빵집',
        address: '서울시 강남구',
        latitude: 37.5665,
        longitude: 126.9780,
        rating: 4.5
      })

      if (bakeryError) throw bakeryError

      setMessage('테스트 데이터가 추가되었습니다!')
      loadData()
    } catch (error) {
      setMessage(`테스트 데이터 추가 실패: ${error}`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6">
      <h1 className="text-3xl font-bold mb-6">Supabase 연결 테스트</h1>
      
      {user ? (
        <div className="space-y-6">
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-green-800">✅ 로그인됨: {user.email}</p>
            <button
              onClick={handleSignOut}
              className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              로그아웃
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">빵지순례 코스 ({courses.length})</h3>
              {courses.length > 0 ? (
                <ul className="space-y-2">
                  {courses.map((course) => (
                    <li key={course.id} className="p-2 bg-gray-50 rounded">
                      <div className="font-medium">{course.title}</div>
                      <div className="text-sm text-gray-600">{course.description}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">코스가 없습니다.</p>
              )}
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">빵집 ({bakeries.length})</h3>
              {bakeries.length > 0 ? (
                <ul className="space-y-2">
                  {bakeries.map((bakery) => (
                    <li key={bakery.id} className="p-2 bg-gray-50 rounded">
                      <div className="font-medium">{bakery.name}</div>
                      <div className="text-sm text-gray-600">{bakery.address}</div>
                      <div className="text-sm text-yellow-600">⭐ {bakery.rating}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">빵집이 없습니다.</p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={addTestData}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              테스트 데이터 추가
            </button>
            <button
              onClick={loadData}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              데이터 새로고침
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSignUp} className="mb-6">
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
              placeholder="비밀번호 (최소 6자)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              required
              minLength={6}
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
