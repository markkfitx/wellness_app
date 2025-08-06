// app/dashboard/layout.tsx
import { ReactNode } from 'react';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import PrimaryNavbar from '@/components/Navbar/primary_navbar';
import SidebarProvider from '@/components/wrappers/sidebar-wrapper';
import Sidebar from "@/components/sidebar";
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import SecondaryNavbar from '@/components/Navbar/secondary_navbar';

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  return (
    <ThemeProvider defaultTheme="light" attribute="class" enableSystem={false}>
      <SidebarProvider>
        <Sidebar />
        <main className="w-full flex flex-col">
            <div className="flex flex-col gap-1">
                <PrimaryNavbar />
                <SecondaryNavbar />
            </div>
            <div className="px-5">
                {children}
            </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}
