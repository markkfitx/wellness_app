import Navbar from './Navbar'
import AppSidebar from './AppSidebar'
import { ThemeProvider } from './providers/ThemeProvider'
import { SidebarProvider } from './ui/sidebar'
import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const sidebarState: string | undefined = Cookies.get("sidebar_state");
  const defaultOpen: boolean = sidebarState === "true";

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main className="w-full flex flex-col">
          <Navbar />
          <div className="pt-4 px-4"><Outlet /></div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}