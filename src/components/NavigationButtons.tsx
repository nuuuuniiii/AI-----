'use client';

interface NavigationButtonProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function NavigationButton({ label, active = false, onClick }: NavigationButtonProps) {
  return active ? (
    <button
      onClick={onClick}
      className="bg-[rgba(255,255,255,0.15)] rounded-[8px] px-[24px] py-[8px]"
    >
      <p className="font-semibold text-[13px] text-white">{label}</p>
    </button>
  ) : (
    <button
      onClick={onClick}
      className="rounded-[8px] px-[24px] py-[8px]"
    >
      <p className="font-semibold text-[13px] text-white/50">{label}</p>
    </button>
  );
}

export function HomeButton({ active }: { active?: boolean }) {
  return <NavigationButton label="Home" active={active} />;
}

export function AddStopButton({ active }: { active?: boolean }) {
  return <NavigationButton label="Add Stop" active={active} />;
}

export function ViewMapButton({ active }: { active?: boolean }) {
  return <NavigationButton label="View Map" active={active} />;
}
