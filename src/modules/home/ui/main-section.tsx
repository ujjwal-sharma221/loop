"use client";

import Link from "next/link";

import { AudioLinesIcon } from "@/components/icons/audio-lines-icon";
import { HomeIcon } from "@/components/icons/home-icon";
import { TrendingUpIcon } from "@/components/icons/trending-up-icon";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import CenterUnderline from "@/components/fancy/underline-center";

const ITEMS = [
  { title: "Home", url: "/", icon: HomeIcon },
  { title: "Trending", url: "/feed/trending", icon: TrendingUpIcon },
  {
    title: "Subscriptions",
    url: "/feed/subscriptions",
    icon: AudioLinesIcon,
    auth: true,
  },
];

export function MainSection() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {ITEMS.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                onClick={() => {}}
              >
                <Link className="flex items-center gap-4" href={item.url}>
                  <item.icon />
                  <CenterUnderline
                    label={item.title}
                    className="text-base font-semibold"
                  />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
