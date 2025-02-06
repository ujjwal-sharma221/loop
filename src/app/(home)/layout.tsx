import { SidebarProvider } from "@/components/ui/sidebar";
import { HomeNavbar } from "@/modules/home/ui/home-navbar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <HomeNavbar />
        {children}
      </div>
    </SidebarProvider>
  );
};
export default HomeLayout;
