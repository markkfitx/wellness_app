"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ChevronUp,
  User2,
} from "lucide-react"
import NavItem from "@/components/utils/navigation-item"
import navData from "@/data/config/navigation.json"
import sessionData from "@/data/config/user.json"
import Link from "next/link"
import { LogoutButton
  
 } from "./utils/logout-button"
const hasPermission = (item: { permissions: string[] }) =>
  item.permissions.length === 0 ||
  item.permissions.some((role) =>
    sessionData.userData[0].permissions.includes(role)
  )

export default function AppSidebar() {
  const filteredNavigation = navData.navigation.filter(hasPermission)

  return (
    <Sidebar collapsible="icon" side="left" className="w-[250px]">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="p-0">
              <Link href="/" className="flex items-center gap-2">
                <img
                  src="https://github.com/shadcn.png"
                  className="w-[1rem] h-[1rem]"
                  alt="logo"
                />
                <span className="text-lg font-semibold">DASHBOARD</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredNavigation.map((item, idx) =>
                item.children && item.children.length > 0 ? (
                  <Collapsible key={`dropdown-${idx}`} className="group/collapsible">
                    <CollapsibleTrigger asChild>
                      <NavItem path={item.path} label={item.label} icon={item.icon} nested={true}/>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenu>
                        <SidebarMenuSub key={`submenu-${idx}`}>
                          {item.children.filter(hasPermission).map((subItem, ndx) => (
                              <SidebarMenuSubItem key={`subitem-${ndx}`}>
                                  <NavItem path={subItem.path} label={subItem.label} icon={subItem.icon} nested={false}/>
                              </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </SidebarMenu>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={`navitem-${idx}`}>
                    <NavItem path={item.path} label={item.label} icon={item.icon} nested={false}/>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator className="ms-0" />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 className="mr-2" />
                  Logout
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem><Link href="/Dashboard/Settings">Account</Link></DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem><LogoutButton/></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
