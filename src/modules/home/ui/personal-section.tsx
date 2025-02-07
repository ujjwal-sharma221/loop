"use client";

import Link from "next/link";

import { ClockIcon } from "@/components/icons/clock-icon";
import { IdCardIcon } from "@/components/icons/id-card-icon";
import { PartyPopperIcon } from "@/components/icons/party-popper-icon";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import CenterUnderline from "@/components/fancy/underline-center";

const ITEMS = [
  { title: "History", url: "/playlist/history", icon: ClockIcon, auth: true },
  {
    title: "Liked Videos",
    url: "/playlist/liked",
    icon: PartyPopperIcon,
    auth: true,
  },
  {
    title: "Subscriptions",
    url: "/playlist",
    icon: IdCardIcon,
    auth: true,
  },
];

export function PersonalSection() {
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
                <Link
                  className="flex items-center gap-4 text-muted-foreground"
                  href={item.url}
                >
                  <item.icon />
                  <CenterUnderline label={item.title} className="text-base" />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
