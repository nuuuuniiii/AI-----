'use client';

import MainInput from './MainInput';

export default function GNB() {
  return (
    <div className="bg-[#473327] h-[90px] relative w-full flex items-center justify-between px-[34px]">
      {/* Logo */}
      <div className="flex items-center gap-[6px]">
        <img 
          src="/images/breadroad main logo.png" 
          alt="Bread Logo" 
          className="h-[40px] w-auto object-contain"
        />
        <p className="text-white text-[24px] font-normal leading-[140%] whitespace-nowrap" style={{ fontFamily: 'BagelFatOne, cursive', color: '#FFFF', fontWeight: 400 }}>
          빵지순례
        </p>
      </div>

      {/* Search Input */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <MainInput />
      </div>

      {/* Profile */}
      <div className="flex items-center gap-[8px]">
        <p className="font-semibold text-[15px] text-white opacity-70 whitespace-nowrap">
          Hyegyo Lee
        </p>
        <div className="size-[28px] rounded-full overflow-hidden bg-white flex items-center justify-center">
          <div className="size-[20px] bg-gray-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
