"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  ArrowLeftRightIcon,
  CircleUserRoundIcon,
  GemIcon,
  LayoutDashboardIcon,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Transações",
    url: "/transacoes",
    icon: ArrowLeftRightIcon,
  },
  {
    title: "Conta",
    url: "/conta",
    icon: CircleUserRoundIcon,
  },
];

export const AppSidebar = () => {
  const pathname = usePathname();

  const handleSignOut = async () => {};

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        {/* <Image src="/logo.svg" alt="Doutor Agenda" width={136} height={28} /> */}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* <SidebarGroup>
          <SidebarGroupLabel>Outros</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/assinatura'}
                >
                  <Link href="/assinatura">
                    <GemIcon />
                    <span>Assinatura</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>
      <SidebarFooter>
        <Button variant="ghost" onClick={handleSignOut}>
          <LogOut />
          Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
