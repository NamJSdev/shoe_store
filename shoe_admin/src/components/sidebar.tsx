"use client";

import {
  Bell,
  Bookmark,
  Home,
  List,
  Mail,
  MoreHorizontal,
  User,
  Users,
  ShoppingBasket,
  GalleryThumbnails,
  FileSliders,
  Receipt
} from "lucide-react";
import { SidebarDesktop } from "./sidebar-desktop";
import { SidebarItems } from "@/types";
import { SidebarButton } from "./sidebar-button";
import { useMediaQuery } from "usehooks-ts";
import { SidebarMobile } from "./sidebar-mobile";
import { ModeToggle } from "@/components/mode-toggle";
import ThemeToggle from "@/components/theme-toggle";

const sidebarItems: SidebarItems = {
  links: [
    { label: "Thống Kê", href: "/", icon: Home },
    // { label: "Đơn hàng", href: "/item/notifications", icon: ShoppingBasket },
    // { label: "Messages", href: "/item/messages", icon: Mail },
    {
      href: "/shoeProducts",
      icon: Receipt,
      label: "Sản Phẩm",
    },
    {
      href: "/shoeModels",
      icon: GalleryThumbnails,
      label: "Mẫu Giày",
    },
    {
      href: "/shoeConfigs",
      icon: FileSliders,
      label: "Cấu Hình Giày",
    },
    // {
    //   href: "/",
    //   icon: Users,
    //   label: "Khách hàng",
    // },
    // {
    //   href: "/",
    //   icon: User,
    //   label: "Quản Lý Tài Khoản",
    // },
  ],
  extras: (
    <div className="flex flex-col absolute left-0 bottom-20 justify-center w-full">
      <ThemeToggle />
    </div>
  ),
};

export function Sidebar() {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  if (isDesktop) {
    return <SidebarDesktop sidebarItems={sidebarItems} />;
  }

  return <SidebarMobile sidebarItems={sidebarItems} />;
}
