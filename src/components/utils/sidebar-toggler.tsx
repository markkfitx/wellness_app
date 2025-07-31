"use client"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
export default function SidebarToggler(){
    const { toggleSidebar } = useSidebar()
    return (
        <SidebarTrigger onClick={toggleSidebar} />
    )
}