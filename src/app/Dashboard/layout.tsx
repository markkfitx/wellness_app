// app/dashboard/layout.tsx
import { ReactNode } from 'react';
import Breadcrumb from "@/components/wrappers/breadcrumbs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Navbar from '@/components/Navbar';
import SidebarProvider from '@/components/wrappers/sidebar-wrapper';
import Sidebar from "@/components/sidebar";
import { ThemeProvider } from '@/components/providers/ThemeProvider';

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
          <Navbar />
          <div className="px-5">
            <Breadcrumb />
            {children}
          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}
