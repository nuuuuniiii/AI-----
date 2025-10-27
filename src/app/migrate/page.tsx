'use client'

import { useState } from 'react'
import { migrateAllData, migrateUsersOnly, migrateCoursesOnly, migrateBakeriesOnly, migratePopularCoursesOnly } from '@/lib/migrate-data'

export default function MigratePage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [progress, setProgress] = useState('')

  const handleMigration = async (migrationType: string) => {
    setLoading(true)
    setMessage('')
    setProgress('')

    try {
      switch (migrationType) {
        case 'all':
          setProgress('전체 데이터 마이그레이션 시작...')
          await migrateAllData()
          setMessage('✅ 모든 데이터가 성공적으로 마이그레이션되었습니다!')
          break
        case 'users':
          setProgress('사용자 데이터 마이그레이션 중...')
          await migrateUsersOnly()
          setMessage('✅ 사용자 데이터가 성공적으로 마이그레이션되었습니다!')
          break
        case 'courses':
          setProgress('코스 데이터 마이그레이션 중...')
          await migrateCoursesOnly()
          setMessage('✅ 코스 데이터가 성공적으로 마이그레이션되었습니다!')
          break
        case 'bakeries':
          setProgress('빵집 데이터 마이그레이션 중...')
          await migrateBakeriesOnly()
          setMessage('✅ 빵집 데이터가 성공적으로 마이그레이션되었습니다!')
          break
        case 'popular':
          setProgress('인기 코스 데이터 마이그레이션 중...')
          await migratePopularCoursesOnly()
          setMessage('✅ 인기 코스 데이터가 성공적으로 마이그레이션되었습니다!')
          break
        default:
          setMessage('❌ 알 수 없는 마이그레이션 타입입니다.')
      }
    } catch (error) {
      setMessage(`❌ 마이그레이션 실패: ${error}`)
    } finally {
      setLoading(false)
      setProgress('')
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6">
      <h1 className="text-3xl font-bold mb-6">데이터 마이그레이션</h1>
      
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>주의:</strong> 먼저 Supabase 대시보드에서 <code>supabase-schema.sql</code> 파일의 내용을 실행하여 테이블을 생성해주세요.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => handleMigration('all')}
          disabled={loading}
          className="bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="font-semibold">전체 데이터 마이그레이션</div>
          <div className="text-sm opacity-90">모든 JSON 데이터를 Supabase로 이동</div>
        </button>

        <button
          onClick={() => handleMigration('users')}
          disabled={loading}
          className="bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="font-semibold">사용자 데이터</div>
          <div className="text-sm opacity-90">user-ranking.json</div>
        </button>

        <button
          onClick={() => handleMigration('courses')}
          disabled={loading}
          className="bg-purple-500 text-white py-3 px-4 rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="font-semibold">코스 데이터</div>
          <div className="text-sm opacity-90">my-courses.json + other-user-courses.json</div>
        </button>

        <button
          onClick={() => handleMigration('bakeries')}
          disabled={loading}
          className="bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="font-semibold">빵집 데이터</div>
          <div className="text-sm opacity-90">real-bakery-locations.json</div>
        </button>

        <button
          onClick={() => handleMigration('popular')}
          disabled={loading}
          className="bg-pink-500 text-white py-3 px-4 rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="font-semibold">인기 코스 데이터</div>
          <div className="text-sm opacity-90">landing-popular-courses.json</div>
        </button>
      </div>

      {loading && (
        <div className="bg-blue-100 p-4 rounded-lg mb-4">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-3"></div>
            <span className="text-blue-700">{progress}</span>
          </div>
        </div>
      )}

      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('✅') 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}

      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">마이그레이션 가이드</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
          <li>Supabase 대시보드의 SQL Editor로 이동</li>
          <li><code>supabase-schema.sql</code> 파일의 내용을 복사하여 실행</li>
          <li>테이블이 성공적으로 생성되었는지 확인</li>
          <li>위의 버튼을 클릭하여 데이터 마이그레이션 실행</li>
          <li>Supabase 대시보드에서 데이터가 정상적으로 저장되었는지 확인</li>
        </ol>
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">마이그레이션되는 데이터</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• 사용자: 10명 (user-ranking.json)</li>
          <li>• 코스: 내 코스 + 다른 사용자 코스</li>
          <li>• 빵집: 실제 빵집 위치 데이터</li>
          <li>• 인기 코스: 월별 인기 코스 순위</li>
        </ul>
      </div>
    </div>
  )
}
