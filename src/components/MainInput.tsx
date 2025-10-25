'use client';

interface MainInputProps {
  placeholder?: string;
}

export default function MainInput({ placeholder = "맛있는 빵을 검색해보세요" }: MainInputProps) {
  return (
    <div className="bg-white box-border flex items-center justify-between px-[20px] py-[8.5px] rounded-[100px] w-[850px] h-[57px]">
      <p className="font-medium text-[18px] text-[#d3ccc6] whitespace-nowrap">
        {placeholder}
      </p>
      <div className="bg-[#473327] flex items-center justify-center rounded-[30px] w-[41px] h-[40px]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 21L16.5 16.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
