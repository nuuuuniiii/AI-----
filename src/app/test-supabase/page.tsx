'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestSupabasePage() {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testSupabaseConnection = async () => {
    setIsLoading(true);
    setTestResult('테스트 중...');
    
    try {
      // 1. Supabase 연결 테스트
      const { data: connectionTest, error: connectionError } = await supabase
        .from('bakeries')
        .select('count')
        .limit(1);
      
      if (connectionError) {
        setTestResult(`연결 오류: ${connectionError.message}`);
        return;
      }

      setTestResult('✅ Supabase 연결 성공!\n');

      // 2. 테이블 구조 확인
      const { data: tableData, error: tableError } = await supabase
        .from('bakeries')
        .select('*')
        .limit(1);

      if (tableError) {
        setTestResult(prev => prev + `테이블 조회 오류: ${tableError.message}`);
        return;
      }

      setTestResult(prev => prev + '✅ 테이블 조회 성공!\n');

      // 3. 간단한 데이터 삽입 테스트
      const testBakery = {
        name: '테스트 빵집',
        address: '테스트 주소',
        latitude: 37.5665,
        longitude: 126.9780,
        phone: '010-1234-5678',
        website: 'https://test.com',
        category: '베이커리',
        price_range: '보통',
        image_url: 'https://example.com/test.jpg',
        parking: false,
        wifi: false,
        takeout: true,
        delivery: false,
        operating_hours: null,
        closed_days: [],
        tags: []
      };

      const { data: insertData, error: insertError } = await supabase
        .from('bakeries')
        .insert([testBakery])
        .select();

      if (insertError) {
        setTestResult(prev => prev + `데이터 삽입 오류: ${insertError.message}`);
        return;
      }

      setTestResult(prev => prev + `✅ 데이터 삽입 성공! ID: ${insertData?.[0]?.id}\n`);

      // 4. 삽입한 데이터 삭제
      if (insertData?.[0]?.id) {
        const { error: deleteError } = await supabase
          .from('bakeries')
          .delete()
          .eq('id', insertData[0].id);

        if (deleteError) {
          setTestResult(prev => prev + `데이터 삭제 오류: ${deleteError.message}`);
        } else {
          setTestResult(prev => prev + '✅ 테스트 데이터 삭제 완료!');
        }
      }

    } catch (error) {
      setTestResult(`예상치 못한 오류: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#473327] mb-8">Supabase 연결 테스트</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <button
            onClick={testSupabaseConnection}
            disabled={isLoading}
            className="bg-[#9a8779] text-white py-2 px-4 rounded-md hover:bg-[#7a6f5f] transition-colors disabled:opacity-50"
          >
            {isLoading ? '테스트 중...' : 'Supabase 연결 테스트'}
          </button>
        </div>

        {testResult && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">테스트 결과</h2>
            <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-4 rounded">
              {testResult}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
