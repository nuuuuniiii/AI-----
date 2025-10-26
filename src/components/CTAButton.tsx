'use client';

import Link from 'next/link';

interface CTAButtonProps {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

export default function CTAButton({ text, href, variant = 'primary' }: CTAButtonProps) {
  const baseClasses = "rounded-[27.5px] px-[20px] pr-[4px] py-[12px] flex items-center justify-between hover:transition-colors w-full h-[56px]";
  const variantClasses = variant === 'primary' 
    ? "bg-[#473327] border border-[#473327] hover:bg-[#3a2a1f]" 
    : "bg-white border border-[#50392b] hover:bg-gray-50";
  
  return (
    <Link href={href} className={`${baseClasses} ${variantClasses}`}>
      <p className={`text-[20px] uppercase whitespace-nowrap leading-[1.4] ${
        variant === 'primary' ? 'text-white' : 'text-[#473327]'
      }`} style={{ fontFamily: 'Helvetica Neue, Pretendard, sans-serif', fontWeight: 700 }}>
        {text}
      </p>
      <div className="flex items-center justify-center w-[32px] h-[32px]">
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 24l8-8-8-8" 
            stroke={variant === 'primary' ? 'white' : '#473327'} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Link>
  );
}
