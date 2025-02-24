import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";

const Sidebar = () => {
  const links = [
    { path: "/add", icon: assets.add_icon, label: "Add Items" },
    { path: "/list", icon: assets.order_icon, label: "List Items" },
    { path: "/orders", icon: assets.order_icon, label: "Orders Items" },
  ];

  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        {links.map((link) => (
          <NavLink
            key={link.path}
            className="flex item-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
            to={link.path}
          >
            <img src={link.icon} className="w-5 h-5" alt="" />
            <p className="hidden md:block">{link.label}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

