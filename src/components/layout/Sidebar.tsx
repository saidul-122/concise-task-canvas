
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Folder, List, LayoutDashboard } from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: Folder,
  },
  {
    title: "All Tasks",
    href: "/tasks",
    icon: List,
  },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="w-[240px] hidden md:block bg-white border-r p-4 shrink-0">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) => 
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-700 hover:bg-gray-100"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
