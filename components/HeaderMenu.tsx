"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart2,
  ChevronDown,
  Database,
  GitMerge,
  Info,
  Network,
  UserCircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LogoutButton from "./LogoutButton";
import { useUser } from "./UserProvider";

export default function HeaderMenu() {
  const { user, isAdmin } = useUser();
  const userEmail = user?.email;
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-white/45 hover:bg-white/90 transition-all duration-200 border border-transparent hover:border-amber-200/70 hover:shadow-[0_8px_18px_rgba(76,58,104,0.1)] active:scale-[0.98]"
      >
        <div className="size-8 rounded-full bg-linear-to-br from-[#e9ddff] to-[#ffe8ba] text-[#59447b] flex items-center justify-center font-bold shadow-sm ring-1 ring-white/90">
          {userEmail ? (
            userEmail.charAt(0).toUpperCase()
          ) : (
            <UserCircle className="size-5" />
          )}
        </div>
        <ChevronDown
          className={`size-4 text-stone-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-60 bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_22px_48px_rgba(76,58,104,0.16)] border border-white/90 py-2 z-50 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-violet-100/70 bg-linear-to-br from-violet-50/75 to-amber-50/60">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-0.5">
                Tài khoản
              </p>
              <p className="text-sm font-medium text-stone-900 truncate">
                {userEmail}
              </p>
            </div>

            <div className="py-1">
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-700 hover:text-amber-700 hover:bg-amber-50 transition-colors"
              >
                <Network className="size-4" />
                Bảng điều khiển
              </Link>

              <Link
                href="/dashboard/members"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-700 hover:text-amber-700 hover:bg-amber-50 transition-colors"
              >
                <Network className="size-4" />
                Cây gia phả
              </Link>

              <Link
                href="/dashboard/kinship"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
              >
                <GitMerge className="size-4" />
                Tra cứu danh xưng
              </Link>

              <Link
                href="/dashboard/stats"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-700 hover:text-purple-700 hover:bg-purple-50 transition-colors"
              >
                <BarChart2 className="size-4" />
                Thống kê
              </Link>

              {isAdmin && (
                <>
                  <div className="px-4 py-2 mt-1">
                    <p className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">
                      Quản trị viên
                    </p>
                  </div>

                  <Link
                    href="/dashboard/users"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-700 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                  >
                    <Users className="size-4" />
                    Quản lý Người dùng
                  </Link>

                  <Link
                    href="/dashboard/lineage"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-700 hover:text-indigo-700 hover:bg-indigo-50 transition-colors"
                  >
                    <Network className="size-4" />
                    Thứ tự gia phả
                  </Link>

                  <Link
                    href="/dashboard/data"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-700 hover:text-teal-700 hover:bg-teal-50 transition-colors"
                  >
                    <Database className="size-4" />
                    Sao lưu & Phục hồi
                  </Link>
                </>
              )}

              <div className="h-px bg-stone-100 my-1 mx-4" />

              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-700 hover:text-rose-700 hover:bg-rose-50 transition-colors"
              >
                <Info className="size-4" />
                Giới thiệu
              </Link>

              <LogoutButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
