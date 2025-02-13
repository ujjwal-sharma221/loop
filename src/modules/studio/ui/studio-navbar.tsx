import Image from "next/image";
import Link from "next/link";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { TextRoll } from "@/components/ui/text-roll";
import { UserButton } from "@/modules/home/ui/user-button";
import { StudioUploadModal } from "./studio-upload-modal";

export function StudioNavbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex h-16 w-full items-center px-2 pr-8">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex flex-shrink-0 items-center">
          <SidebarTrigger />
          <Link href="/studio">
            <div className="flex items-center gap-1 p-4">
              <Image src="/images/logo.svg" alt="logo" width={32} height={32} />
              <TextRoll className="text-4xl font-semibold text-black dark:text-white">
                Studio
              </TextRoll>
            </div>
          </Link>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          <StudioUploadModal />
          <UserButton />
        </div>
      </div>
    </nav>
  );
}
