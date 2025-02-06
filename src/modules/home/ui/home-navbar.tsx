import Image from "next/image";
import Link from "next/link";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { SearchBar } from "@/modules/home/ui/search-bar";

export function HomeNavbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex h-16 w-full items-center justify-between px-2 pr-5">
      <div className="flex w-full items-center gap-4">
        <div className="flex flex-shrink-0 items-center">
          <SidebarTrigger />
          <Link href="/">
            <div className="flex items-center gap-1 p-4">
              <Image src="/images/logo.svg" alt="logo" width={32} height={32} />
              <p className="text-xl font-semibold tracking-tight">Loop</p>
            </div>
          </Link>
        </div>
      </div>
      <SearchBar />
    </nav>
  );
}
