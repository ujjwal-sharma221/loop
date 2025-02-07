import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { MainSection } from "./main-section";
import { SeparatorText } from "@/components/ui/separator-text";
import { PersonalSection } from "./personal-section";

export function HomeSidebar() {
  return (
    <Sidebar className="z-40 border-none pt-16">
      <SidebarContent className="bg-background">
        <MainSection />
        <SeparatorText label="You" className="mx-3" />
        <PersonalSection />
      </SidebarContent>
    </Sidebar>
  );
}
