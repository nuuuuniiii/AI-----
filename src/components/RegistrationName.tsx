'use client';

import { useRef } from 'react';
import Image from 'next/image';

interface RegistrationNameProps {
  courseName: string;
  date: string;
  onCourseNameChange: (value: string) => void;
  onDateChange: (value: string) => void;
}

const imgClockIcon = "/images/Clock icon-brown.png";
const imgMdiTag = "/images/mdi_tag.png";

const RegistrationName = ({ 
  courseName, 
  date, 
  onCourseNameChange, 
  onDateChange 
}: RegistrationNameProps) => {
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Handle date selection from calendar
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (selectedDate) {
      // Convert YYYY-MM-DD to MM-DD-YYYY format
      const [year, month, day] = selectedDate.split('-');
      const formattedDate = `${month}-${day}-${year}`;
      onDateChange(formattedDate);
    } else {
      onDateChange('');
    }
  };

  // Convert MM-DD-YYYY to YYYY-MM-DD for date input
  const getDateValue = () => {
    if (!date) return '';
    const parts = date.split('-');
    if (parts.length === 3) {
      const [month, day, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return '';
  };

  // Handle calendar icon click
  const handleCalendarIconClick = () => {
    if (dateInputRef.current) {
      if (dateInputRef.current.showPicker) {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.click();
      }
    }
  };

  return (
    <div className="relative w-[356px] h-[234px]">
      {/* Background Card with shadow */}
      <div className="absolute inset-0 bg-[#9A8779] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.12)]" />
      
      {/* Content Container */}
      <div className="relative h-full">
        {/* 순례코스 이름 입력 필드 */}
        <div className="absolute h-[71px] left-[26px] top-[28px] w-[304px]">
          <div className="flex flex-col gap-[6px]">
            <div className="flex gap-[2px] items-center">
              {/* 태그 아이콘 */}
              <div className="size-[25px] flex items-center justify-center relative">
                <Image alt="tag icon" src={imgMdiTag} width={25} height={25} className="block max-w-none size-full" unoptimized />
              </div>
              <p className="font-pretendard-semibold text-[18px] text-white leading-[1.4] whitespace-nowrap">
                순례코스 이름
              </p>
            </div>
            <div className="bg-white h-[44px] rounded-[10px] flex items-center px-[9px]">
              <input
                type="text"
                value={courseName}
                onChange={(e) => onCourseNameChange(e.target.value)}
                placeholder="코스의 이름을 입력해주세요"
                className="w-full font-pretendard-semibold text-[14px] text-[#9a8779] placeholder:text-[#9a8779] bg-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* 날짜 입력 필드 */}
        <div className="absolute h-[75px] left-[26px] top-[125px] w-[304px]">
          <div className="flex flex-col gap-[6px]">
            <div className="flex gap-[2px] items-center">
              {/* 시계 아이콘 - 흰색 */}
              <div className="size-[25px] flex items-center justify-center relative">
                <Image alt="clock icon" src={imgClockIcon} width={25} height={25} className="block max-w-none size-full brightness-[0] invert" unoptimized />
              </div>
              <p className="font-pretendard-semibold text-[18px] text-white leading-[1.4] whitespace-nowrap">
                날짜
              </p>
            </div>
            <div className="bg-white h-[44px] rounded-[10px] flex items-center px-[9px] relative">
              <input
                ref={dateInputRef}
                type="date"
                value={getDateValue()}
                onChange={handleDateChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
              />
              <div className="flex items-center justify-between w-full">
                {date ? (
                  <span className="font-pretendard-semibold text-[14px] text-[#9a8779] pointer-events-none">
                    {date}
                  </span>
                ) : (
                  <span className="font-pretendard-semibold text-[14px] text-[#9a8779] pointer-events-none">
                    다녀온 날짜를 입력하세요
                  </span>
                )}
                {/* 캘린더 아이콘 */}
                <button
                  type="button"
                  onClick={handleCalendarIconClick}
                  className="flex items-center justify-center cursor-pointer ml-auto"
                  style={{ zIndex: 2 }}
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" 
                      stroke="#9a8779" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M16 2V6" 
                      stroke="#9a8779" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M8 2V6" 
                      stroke="#9a8779" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M3 10H21" 
                      stroke="#9a8779" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M8 14H8.01" 
                      stroke="#9a8779" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M12 14H12.01" 
                      stroke="#9a8779" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M16 14H16.01" 
                      stroke="#9a8779" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M8 18H8.01" 
                      stroke="#9a8779" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M12 18H12.01" 
                      stroke="#9a8779" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M16 18H16.01" 
                      stroke="#9a8779" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
    </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
);
};

export default RegistrationName;
