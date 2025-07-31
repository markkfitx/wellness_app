
import { SidebarProvider } from '@/components/ui/sidebar'
import { cookies } from "next/headers"
type ChildrenOBJ = {
    children: React.ReactNode
}
export default async function SidebarWrapper({ children }: ChildrenOBJ) {
  
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      {children}
    </SidebarProvider>
  )
}
