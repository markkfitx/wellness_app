import Breadcrumb from "@/components/wrappers/breadcrumbs";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";
import Navbar from '@/components/Navbar'
import SidebarProvider from '@/components/wrappers/sidebar-wrapper'
import Sidebar from "@/components/sidebar"
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import NavigationTabs from "@/components/wrappers/NavigationTabs-Wrapper";

export default async function Dashboard({children,}: Readonly<{children: React.ReactNode;}>) {
    const {isAuthenticated} = getKindeServerSession(); // THIS IS A PROMISE
    if(!(await isAuthenticated())){
        redirect("api/auth/login")
    }
    return(
        <>
        <ThemeProvider 
            defaultTheme="light" 
            attribute="class"
            enableSystem={false}
            >
            <SidebarProvider>
              <Sidebar />
              <main className="w-full flex flex-col">
                <Navbar />
                <div className="px-5">
                  <NavigationTabs />
                  {children}
                </div>
              </main>
            </SidebarProvider>
            
        </ThemeProvider>
        
        <Breadcrumb />
        <div className="grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            
        </div>
        </>
    )
}