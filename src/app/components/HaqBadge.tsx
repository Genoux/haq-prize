import { Logo } from 'haq-assets'


export default function HaqBadge() {
  return (
    <div className="w-fit flex items-center rounded-full bg-black pl-2 pr-3 py-1 text-sm font-bold gap-1">
      <Logo size={18} />
      Tournois HAQ
    </div>
  );
}