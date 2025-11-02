'use client';

import Link from 'next/link';

export interface TabItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface TabForFilter {
  id: string;
  label: string;
}

export interface TabNavigationProps {
  items?: TabItem[];
  tabs?: TabForFilter[];
  activeTab?: string | number | unknown;
  onTabChange?: (tab: string | number) => void;
}

export default function TabNavigation({ items, tabs, activeTab, onTabChange }: TabNavigationProps) {
  // Filter-based tabs (ranking page style)
  if (tabs && activeTab !== undefined) {
    return (
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-pretendard-medium transition-colors ${
              String(activeTab) === String(tab.id)
                ? 'bg-[#8B4513] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  // Link-based items (original style)
  if (items) {
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

  return null;
}
