import { SidebarProvider } from "@/components/ui/sidebar";
import { StudioNavbar } from "@/modules/studio/ui/studio-navbar";
import { StudioSidebar } from "@/modules/studio/ui/studio-sidebar";

const StudioLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <StudioNavbar />
        <div className="flex min-h-screen pt-[4rem]">
          <StudioSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
export default StudioLayout;
