import config from "@/app/config";
import HeaderMenu from "@/components/HeaderMenu";
import Image from "next/image";
import Link from "next/link";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 bg-white/65 backdrop-blur-2xl border-b border-white/80 shadow-[0_10px_28px_rgba(76,58,104,0.08)] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[4.5rem] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 sm:gap-3"
          >
            <div className="relative size-10 rounded-2xl overflow-hidden shrink-0 transition-all shadow-[0_6px_16px_rgba(216,168,91,0.2)] ring-1 ring-amber-200/70 group-hover:rotate-3 group-hover:scale-105">
              <Image
                src="/icon.png"
                alt="Logo"
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold bg-linear-to-r from-[#30264d] to-[#956b38] bg-clip-text text-transparent group-hover:from-[#59447b] group-hover:to-[#c88e3e] transition-all">
              {config.siteName}
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <HeaderMenu />
        </div>
      </div>
    </header>
  );
}
