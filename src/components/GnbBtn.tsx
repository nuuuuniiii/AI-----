import Link from 'next/link';

interface GnbBtnProps {
  href: string;
  isActive?: boolean;
  children: React.ReactNode;
}

export default function GnbBtn({ href, isActive = false, children }: GnbBtnProps) {
  return (
    <Link 
      href={href} 
      className={`rounded-[8px] px-[24px] py-[8px] ${
        isActive 
          ? 'bg-[rgba(255,255,255,0.15)]' 
          : ''
      }`}
    >
      <p 
        className={`text-[13px] ${isActive ? 'text-white' : 'text-white/50'}`} 
        style={{ fontFamily: 'Pretendard, sans-serif', fontWeight: 600 }}
      >
        {children}
      </p>
    </Link>
  );
}
