'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

interface BakeryRegistrationCardProps {
  bakeryName: string;
  businessHours: string;
  rating: string;
  review: string;
  imageUrl?: string;
  onBakeryNameChange: (value: string) => void;
  onBusinessHoursChange: (value: string) => void;
  onRatingChange: (value: string) => void;
  onReviewChange: (value: string) => void;
  onImageChange?: (url: string) => void;
  onDelete?: () => void;
}

const imgClockIcon = "http://localhost:3845/assets/5789783fae643c6e047e16c00ff331c4c98f60b9.svg";
const imgStarIcon = "http://localhost:3845/assets/8014bbe825147d61b8e56e07c88adeee7838cff7.svg";
const imgReviewIcon1 = "http://localhost:3845/assets/0d5143ff295d7dc9a64432933e8b06afbca79060.svg";
const imgReviewIcon2 = "http://localhost:3845/assets/be7b0ae62c52858011b43d5c0acf24af72210a1a.svg";
const imgDefaultBakery = "http://localhost:3845/assets/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png";
const imgAddIcon = "http://localhost:3845/assets/5770549b50f727539afba3123bee769ea208bdef.svg";

export default function BakeryRegistrationCard({
  bakeryName,
  businessHours,
  rating,
  review,
  imageUrl,
  onBakeryNameChange,
  onBusinessHoursChange,
  onRatingChange,
  onReviewChange,
  onImageChange,
  onDelete
}: BakeryRegistrationCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onImageChange) return;

    // 이미지 파일인지 확인
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // 먼저 미리보기를 위해 base64로 변환 (임시 표시용)
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        // 임시로 base64 표시 (업로드 중)
        onImageChange(reader.result as string);
      }
    };
    reader.readAsDataURL(file);

    // Cloudinary에 업로드
    setIsUploading(true);
    try {
      console.log('[BakeryRegistrationCard] 이미지 업로드 시작:', file.name, file.size);
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'bread-pilgrimage/bakeries');

      console.log('[BakeryRegistrationCard] /api/upload 호출 시작');
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('[BakeryRegistrationCard] 업로드 응답 상태:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('[BakeryRegistrationCard] 업로드 HTTP 에러:', response.status, errorText);
        throw new Error(`업로드 실패: ${response.status} ${errorText}`);
      }

      const result = await response.json();
      console.log('[BakeryRegistrationCard] 업로드 응답:', result);

      if (result.success && result.data && result.data.secure_url) {
        // Cloudinary URL로 업데이트
        console.log('[BakeryRegistrationCard] Cloudinary 업로드 성공:', result.data.secure_url);
        onImageChange(result.data.secure_url);
      } else {
        console.error('[BakeryRegistrationCard] Cloudinary 업로드 실패:', result.error || result);
        // 업로드 실패해도 base64 URL 유지 (오프라인 지원)
        alert(`이미지 업로드에 실패했습니다: ${result.error || '알 수 없는 오류'}`);
      }
    } catch (error) {
      console.error('[BakeryRegistrationCard] Cloudinary 업로드 오류:', error);
      // 업로드 실패해도 base64 URL 유지
      alert(`이미지 업로드 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsUploading(false);
      // 같은 파일을 다시 선택할 수 있도록 input 값 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="bg-[#9a8779] border border-[#ba9b7c] border-solid h-[273px] rounded-[20px] relative w-full">
      {/* X 버튼 - 우측 상단 */}
      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute top-[16px] right-[16px] w-[20px] h-[20px] flex items-center justify-center cursor-pointer z-10"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5L5 15M5 5L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      <div className="h-[273px] overflow-clip rounded-[inherit] w-full">
        <div className="absolute flex flex-col gap-[22px] items-start left-[40px] top-[24px] w-[688px]">
          {/* 빵집명 입력 필드 */}
          <div className="bg-white flex flex-col gap-[10px] h-[50px] items-start justify-center px-[20px] py-[16px] rounded-[100px] w-[231px]">
            {bakeryName ? (
              <input
                type="text"
                value={bakeryName}
                onChange={(e) => onBakeryNameChange(e.target.value)}
                className="font-pretendard-semibold text-[18px] text-[#846d5c] bg-transparent outline-none w-full"
              />
            ) : (
              <input
                type="text"
                value={bakeryName}
                onChange={(e) => onBakeryNameChange(e.target.value)}
                placeholder="빵집명 입력하기"
                className="font-pretendard-semibold text-[18px] text-[#846d5c] bg-transparent outline-none w-full placeholder:text-[#846d5c]"
              />
            )}
          </div>

          {/* 이미지 및 리뷰 입력 필드들 */}
          <div className="flex gap-[15px] items-start relative w-full">
            {/* 이미지 영역 */}
            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div 
                className="h-[131px] rounded-[10px] w-[138px] cursor-pointer relative overflow-hidden"
                onClick={handleImageClick}
              >
                {isUploading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-[10px]">
                    <p className="text-xs text-gray-600">업로드 중...</p>
                  </div>
                ) : imageUrl ? (
                  <Image alt="bakery" src={imageUrl} fill className="object-cover rounded-[10px]" unoptimized />
                ) : (
                  <Image alt="bakery placeholder" src={imgDefaultBakery} fill className="object-cover rounded-[10px]" unoptimized />
                )}
              </div>
            </div>

            {/* 리뷰 입력 필드들 */}
            <div className="flex gap-[67px] items-center relative">
              {/* 왼쪽 컬럼: 영업일, 별점 */}
              <div className="flex flex-col gap-[7px] items-start relative w-[174px]">
                {/* 영업일 */}
                <div className="flex flex-col gap-[2px] items-start relative w-full">
                  <div className="flex gap-[2px] items-center relative w-full">
                    <div className="w-[15px] h-[15px] relative flex items-center justify-center">
                      <Image alt="clock icon" src={imgClockIcon} width={15} height={15} className="block max-w-none w-full h-full" unoptimized />
                    </div>
                    <p className="font-pretendard-semibold text-[14px] text-white leading-[1.4]">
                      영업일
                    </p>
                  </div>
                  <div className="bg-white h-[37px] rounded-[10px] relative w-[163px]">
                    {businessHours ? (
                      <input
                        type="text"
                        value={businessHours}
                        onChange={(e) => onBusinessHoursChange(e.target.value)}
                        className="absolute font-pretendard-semibold text-[10px] text-[#846d5c] bg-transparent outline-none w-full h-full px-[9px] text-left"
                      />
                    ) : (
                      <input
                        type="text"
                        value={businessHours}
                        onChange={(e) => onBusinessHoursChange(e.target.value)}
                        placeholder="영업일 입력하기"
                        className="absolute font-pretendard-semibold text-[10px] text-[#846d5c] bg-transparent outline-none w-full h-full px-[9px] placeholder:text-[#846d5c] text-left"
                      />
                    )}
                  </div>
                </div>

                {/* 별점 */}
                <div className="flex flex-col gap-[2px] items-start relative w-full">
                  <div className="flex gap-[2px] items-center relative w-full">
                    <div className="w-[15px] h-[15px] relative flex items-center justify-center shrink-0">
                      <Image alt="star icon" src={imgStarIcon} width={15} height={15} className="block max-w-none w-[15px] h-[15px]" unoptimized />
                    </div>
                    <p className="font-pretendard-semibold text-[14px] text-white leading-[1.4]">
                      별점
                    </p>
                  </div>
                  <div className="bg-white h-[37px] rounded-[10px] relative w-[163px]">
                    {rating ? (
                      <input
                        type="text"
                        value={rating}
                        onChange={(e) => onRatingChange(e.target.value)}
                        className="absolute font-pretendard-semibold text-[10px] text-[#846d5c] bg-transparent outline-none w-full h-full px-[9px] text-left"
                      />
                    ) : (
                      <input
                        type="text"
                        value={rating}
                        onChange={(e) => onRatingChange(e.target.value)}
                        placeholder="별점 등록하기"
                        className="absolute font-pretendard-semibold text-[10px] text-[#846d5c] bg-transparent outline-none w-full h-full px-[9px] placeholder:text-[#846d5c] text-left"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* 오른쪽: 리뷰 */}
              <div className="h-[125px] relative w-[294px]">
                <div className="flex flex-col gap-[2px] items-start relative w-full">
                  <div className="flex gap-[2px] items-center relative w-[174px]">
                    <div className="w-[15px] h-[15px] relative flex items-center justify-center">
                      <Image alt="review icon 1" src={imgReviewIcon1} width={15} height={15} className="absolute block max-w-none w-full h-full" unoptimized />
                      <Image alt="review icon 2" src={imgReviewIcon2} width={15} height={15} className="absolute block max-w-none w-full h-full" unoptimized />
                    </div>
                    <p className="font-pretendard-semibold text-[14px] text-white leading-[1.4]">
                      리뷰
                    </p>
                  </div>
                  <div className="bg-white h-[103px] rounded-[10px] relative w-full">
                    {review ? (
                      <textarea
                        value={review}
                        onChange={(e) => onReviewChange(e.target.value)}
                        className="absolute font-pretendard-semibold text-[10px] text-[#846d5c] bg-transparent outline-none w-full h-full px-[9px] py-[12px] resize-none"
                      />
                    ) : (
                      <textarea
                        value={review}
                        onChange={(e) => onReviewChange(e.target.value)}
                        placeholder="리뷰 입력하기"
                        className="absolute font-pretendard-semibold text-[10px] text-[#846d5c] bg-transparent outline-none w-full h-full px-[9px] py-[12px] resize-none placeholder:text-[#846d5c]"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AddBakeryButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="size-[32px] cursor-pointer relative" onClick={onClick}>
      <div className="absolute inset-[8.333%] relative">
        <Image alt="add icon" src={imgAddIcon} width={24} height={24} className="block max-w-none size-full" unoptimized />
      </div>
    </div>
  );
}
