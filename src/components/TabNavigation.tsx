'use client';

import Link from 'next/link';

interface TabItem {
  label: string;
  href: string;
  active?: boolean;
}

interface TabNavigationProps {
  items: TabItem[];
}

export default function TabNavigation({ items }: TabNavigationProps) {
  return (
    <div className="bg-[#9a8779] h-[44px] relative w-full">
      <div className="absolute left-[30px] top-1/2 -translate-y-1/2 flex items-center gap-[8px]">
        {items.map((item, index) => (
          item.active ? (
            <button
              key={index}
              className="bg-[rgba(255,255,255,0.15)] rounded-[8px] px-[24px] py-[8px]"
            >
              <p className="font-semibold text-[13px] text-white">{item.label}</p>
            </button>
          ) : (
            <Link
              key={index}
              href={item.href}
              className="rounded-[8px] px-[24px] py-[8px]"
            >
              <p className="font-semibold text-[13px] text-white/50">{item.label}</p>
            </Link>
          )
        ))}
      </div>
    </div>
  );
}
