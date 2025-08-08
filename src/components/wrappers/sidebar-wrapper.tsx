import { SidebarProvider } from '@/components/ui/sidebar'
//import { cookies } from "next/headers"
type ChildrenOBJ = {
    children: React.ReactNode
}
export default function SidebarWrapper({ children }: ChildrenOBJ) {
  
  //const cookieStore = cookies()
  const defaultOpen = true;//cookieStore.get('sidebar_state')?.value === 'true'  
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      {children}
    </SidebarProvider>
  )
}
