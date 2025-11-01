'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { bakeryService } from '@/lib/database';

export default function TestDatabase() {
  const [bakeries, setBakeries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Supabase 연결 테스트
      const { data, error } = await supabase
        .from('bakeries')
        .select('*')
        .limit(5);

      if (error) {
        throw error;
      }

      setBakeries(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addSampleBakery = async () => {
    try {
      const newBakery = {
        name: '테스트 빵집',
        address: '서울특별시 강남구 테스트동 123-45',
        latitude: 37.5665,
        longitude: 127.0333,
        category: '테스트',
        price_range: '$',
        tags: ['테스트', '샘플']
      };

      const result = await bakeryService.createBakery(newBakery);
      console.log('새 빵집 생성:', result);
      testConnection(); // 목록 새로고침
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">데이터베이스 연결 테스트</h1>
        <p>연결 중...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">데이터베이스 연결 테스트</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>오류:</strong> {error}
        </div>
      )}

      <div className="mb-4">
        <button
          onClick={testConnection}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          연결 테스트
        </button>
        <button
          onClick={addSampleBakery}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          샘플 빵집 추가
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">빵집 목록 ({bakeries.length}개)</h2>
        {bakeries.length === 0 ? (
          <p>빵집이 없습니다.</p>
        ) : (
          <div className="grid gap-4">
            {bakeries.map((bakery) => (
              <div key={bakery.id} className="border p-4 rounded">
                <h3 className="font-semibold">{bakery.name}</h3>
                <p className="text-gray-600">{bakery.address}</p>
                <p className="text-sm text-gray-500">
                  {bakery.latitude}, {bakery.longitude}
                </p>
                <p className="text-sm text-gray-500">
                  카테고리: {bakery.category} | 가격대: {bakery.price_range}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
