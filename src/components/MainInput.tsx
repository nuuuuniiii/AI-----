'use client';

import { SearchIcon } from './Icons';

interface MainInputProps {
  placeholder?: string;
}

export default function MainInput({ placeholder = "맛있는 빵을 검색해보세요" }: MainInputProps) {
  return (
    <div className="bg-white flex items-center justify-between px-[20px] py-[8.5px] rounded-[100px] w-[850px]">
      <p className="font-['Pretendard',_sans-serif] font-medium leading-normal text-[18px] text-[#d3ccc6] whitespace-nowrap">
        {placeholder}
      </p>
      <SearchIcon />
    </div>
  );
}
