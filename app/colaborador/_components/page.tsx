"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  MessageCircle,
  CheckSquare,
  LayoutDashboard,
  Notebook,
  ChevronLeft,
  ChevronRight,
  NotebookPen,
  Camera,
} from "lucide-react";
import Link from "next/link";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // trava a sidebar no estado fechado se for mobile
      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true); // volta ao estado aberto no desktop
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menus = [
    { name: "Home", icon: <Home size={22} />, route: "/colaborador/home" },
    { name: "Chat", icon: <MessageCircle size={22} />, route: "/colaborador/chat" },
    { name: "Tarefas", icon: <CheckSquare size={22} />, route: "/colaborador/tarefas" },
    { name: "Dashboard", icon: <LayoutDashboard size={22} />, route: "/colaborador/dashboard" },
    { name: "Anotações", icon: <NotebookPen size={22} />, route: "/colaborador/anotacao" },
    { name: "Documentos", icon: <Notebook size={22} />, route: "/colaborador/documento" },
    { name: "Reuniões", icon: <Camera size={22} />, route: "/colaborador/reunioes" },
  ];

  return (
    <div
      className={`h-[95%] rounded-md ml-1 my-auto border hover:border-[#e04ce0] bg-[#b341b3] text-[#f3f3f3] shadow-lg transition-all duration-300 flex flex-col
        ${isOpen ? "w-64" : "w-20"}`}
    >
      <div className="flex items-center justify-between mb-6">
        {isOpen && !isMobile && (
          <h1 className="text-lg font-bold tracking-wide px-2">VIVI</h1>
        )}

        {!isMobile && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-white/20 transition"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        )}
      </div>

      <nav className="flex flex-col gap-2">
        {menus.map((menu, i) => (
          <Link key={i} href={menu.route}>
            <div
              className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg transition ${
                pathname === menu.route
                  ? "bg-white/30 border-l-4 border-white"
                  : "hover:bg-white/20"
              }`}
            >
              {menu.icon}
              {/* mostra texto somente se desktop e aberto */}
              {!isMobile && isOpen && (
                <span className="text-sm font-medium">{menu.name}</span>
              )}
            </div>
          </Link>
        ))}
      </nav>

      <div className="mt-auto border-t border-white/20 pt-4">
        {!isMobile && isOpen && (
          <p className="text-xs opacity-80 text-center">2025 VIVI</p>
        )}
      </div>
    </div>
  );
}
