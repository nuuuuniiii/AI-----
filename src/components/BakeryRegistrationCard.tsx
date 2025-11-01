'use client';

import { useState } from 'react';
import ImageUpload from './ImageUpload';
import { bakeryService } from '@/lib/database';

export default function BakeryRegistrationCard() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    website: '',
    category: '',
    priceRange: '',
    description: '',
    imageUrl: '',
    imagePublicId: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (url: string, publicId: string) => {
    setFormData(prev => ({
      ...prev,
      imageUrl: url,
      imagePublicId: publicId
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('빵집 등록 시작:', formData);
    
    try {
      const result = await bakeryService.createBakeryWithImage({
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        website: formData.website,
        category: formData.category,
        price_range: formData.priceRange,
        description: formData.description,
        image_url: formData.imageUrl
      });
      
      console.log('빵집이 성공적으로 등록되었습니다:', result);
      alert('빵집이 성공적으로 등록되었습니다!');
      
      // 폼 초기화
      setFormData({
        name: '',
        address: '',
        phone: '',
        website: '',
        category: '',
        priceRange: '',
        description: '',
        imageUrl: '',
        imagePublicId: ''
      });
    } catch (error) {
      console.error('빵집 등록 실패 - 상세 오류:', error);
      console.error('오류 타입:', typeof error);
      console.error('오류 메시지:', error instanceof Error ? error.message : 'Unknown error');
      alert(`빵집 등록에 실패했습니다: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-[#473327] mb-4">빵집 등록</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 이미지 업로드 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            빵집 이미지
          </label>
          <ImageUpload
            onImageUploaded={handleImageUpload}
            folder="bakeries"
            className="mb-2"
          />
          {formData.imageUrl && (
            <p className="text-xs text-green-600">✓ 이미지가 업로드되었습니다</p>
          )}
        </div>

        {/* 빵집 이름 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            빵집 이름 *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9a8779]"
            placeholder="빵집 이름을 입력하세요"
            required
          />
        </div>

        {/* 주소 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            주소 *
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9a8779]"
            placeholder="주소를 입력하세요"
            required
          />
        </div>

        {/* 전화번호 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            전화번호
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9a8779]"
            placeholder="전화번호를 입력하세요"
          />
        </div>

        {/* 웹사이트 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            웹사이트
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9a8779]"
            placeholder="웹사이트 URL을 입력하세요"
          />
        </div>

        {/* 카테고리 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            카테고리
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9a8779]"
          >
            <option value="">카테고리를 선택하세요</option>
            <option value="베이커리">베이커리</option>
            <option value="카페">카페</option>
            <option value="디저트">디저트</option>
            <option value="전통빵">전통빵</option>
          </select>
        </div>

        {/* 가격대 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            가격대
          </label>
          <select
            name="priceRange"
            value={formData.priceRange}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9a8779]"
          >
            <option value="">가격대를 선택하세요</option>
            <option value="저렴">저렴 (5,000원 이하)</option>
            <option value="보통">보통 (5,000-10,000원)</option>
            <option value="비쌈">비쌈 (10,000원 이상)</option>
          </select>
        </div>

        {/* 설명 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            설명
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9a8779]"
            placeholder="빵집에 대한 설명을 입력하세요"
          />
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="w-full bg-[#9a8779] text-white py-2 px-4 rounded-md hover:bg-[#7a6f5f] transition-colors"
        >
          빵집 등록하기
        </button>
      </form>
    </div>
  );
}