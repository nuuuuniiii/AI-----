'use client';

// 이미지 상수
const img = "http://localhost:3845/assets/82e1c3ae3c7c8d90232a432e1022ae7bb98d52fb.svg";

interface MainInputProps {
  placeholder?: string;
}

export default function MainInput({ placeholder = "맛있는 빵을 검색해보세요" }: MainInputProps) {
  return (
    <div className="bg-white flex items-center justify-between px-[20px] py-[8.5px] rounded-[100px] w-[850px]">
      <p className="font-['Pretendard',_sans-serif] font-medium leading-normal text-[18px] text-[#d3ccc6] whitespace-nowrap">
        {placeholder}
      </p>
      <div className="bg-[#473327] flex gap-[8px] h-[40px] items-center justify-center px-[20px] py-[9px] rounded-[30px] w-[41px]">
        <div className="relative size-[24px]">
          <img alt="" className="block max-w-none size-full" src={img} />
        </div>
      </div>
    </div>
  );
}
