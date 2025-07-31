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
import navData from "@/data/config/navigation.json"
import sessionData from "@/data/config/user.json"
import { ChevronUp, User2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import {Home, Inbox, ShoppingBag, FileText, IdCardLanyard, ClipboardList, Settings, User} from "lucide-react"
import Link from "next/link"




export default function AppSidebar() {
    const filterNavigation = navData.navigation.filter((item) => item.permissions.length === 0 || item.permissions.some(role => sessionData.userData[0].permissions.includes(role)))
    const iconMap = {
        home: <Home className="h-[1rem] w-[1rem] me-2" />,
        inbox: <Inbox className="h-[1rem] w-[1rem] me-2" />,
        settings: <Settings className="h-[1rem] w-[1rem] me-2" />,
        user: <User className="h-[1rem] w-[1rem] me-2" />,
        shoppingBag: <ShoppingBag className="h-[1rem] w-[1rem] me-2" />,
        fileText: <FileText className="h-[1rem] w-[1rem] me-2" />,
        idCardLanyard: <IdCardLanyard className="h-[1rem] w-[1rem] me-2" />,
        clipboardList: <ClipboardList className="h-[1rem] w-[1rem] me-2" />
    };
    return (
        <Sidebar collapsible="icon" side="left" className="w-[250px]">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem >
                        <SidebarMenuButton asChild className="p-0">
                            <a href="/" className="flex items-center gap-2 p-0">
                                <img src="https://github.com/shadcn.png" className="w-[1rem] h-1rem]"/>
                                <span className="text-lg font-semibold">DASHBOARD</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarSeparator className="ms-0" />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                         <SidebarMenu>
                            {filterNavigation.map((item,idx) => (
                                item.children && item.children.length > 0 ? (
                                    /* If the item has children, use Collapsible for a dropdown effect */
                                    <Collapsible className="group/collapsible" key={`dropdown-${item.label}-${item.path}-${idx}`}>
                                        <CollapsibleTrigger asChild key={`${item.label}-${item.path}-${idx}`}>
                                            <SidebarMenuButton>
                                                {item.icon && iconMap[item.icon as keyof typeof iconMap]}
                                                <Link href="">{item.label}</Link>
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenu>
                                                {
                                                /* Filter children based on permissions */
                                                item.children.filter((x) => x.permissions.length === 0 || x.permissions.some(role => sessionData.userData[0].permissions.includes(role))).map((subItem,ndx,) => (
                                                    /* If the subItem has children, create a sub-menu */
                                                    <SidebarMenuSub key={`submenu-${subItem.label}-${subItem.path}-${ndx}`}>
                                                        <SidebarMenuSubItem>
                                                            {subItem.children && subItem.children.length > 0 ? (
                                                            <Collapsible className="group/collapsible" key={`submenu-dropdown-${subItem.label}-${subItem.path}-${ndx}`}>
                                                                <CollapsibleTrigger>
                                                                    <SidebarMenuButton>
                                                                        {subItem.icon && iconMap[subItem.icon as keyof typeof iconMap]}
                                                                        <Link href="">{subItem.label}</Link>
                                                                        <ChevronUp className="ml-auto" />
                                                                    </SidebarMenuButton>
                                                                </CollapsibleTrigger>
                                                                <CollapsibleContent>
                                                                    <SidebarMenu>
                                                                        {/* Filter sub-sub-items based on permissions */
                                                                        subItem.children.filter((y) => y.permissions.length === 0 || y.permissions.some(role =>sessionData.userData[0].permissions.includes(role))).map((subSubItem,rdx) => (
                                                                            <SidebarMenuItem key={`${subSubItem.label}-${subSubItem.path}-${rdx}`}>
                                                                                <SidebarMenuButton asChild> 
                                                                                    <Link href={subSubItem.path}>
                                                                                        {subSubItem.icon && iconMap[subSubItem.icon as keyof typeof iconMap]}
                                                                                        <span>{subSubItem.label}</span>
                                                                                    </Link>
                                                                                </SidebarMenuButton>
                                                                            </SidebarMenuItem>
                                                                        ))}
                                                                    </SidebarMenu>
                                                                </CollapsibleContent>
                                                            </Collapsible>
                                                                   
                                                            ) :(
                                                            <SidebarMenuButton asChild>
                                                                <Link href={subItem.path}>
                                                                    {subItem.icon && iconMap[subItem.icon as keyof typeof iconMap]}
                                                                    <span>{subItem.label}</span>
                                                                </Link>
                                                            </SidebarMenuButton>
                                                            )}
                                                        </SidebarMenuSubItem>
                                                    </SidebarMenuSub>
                                                ))}
                                            </SidebarMenu>
                                        </CollapsibleContent>
                                    </Collapsible>
                                ) : (
                                    <SidebarMenuItem key={`navitem-${item.label}-${item.path}-${idx}`}>
                                        <SidebarMenuButton asChild >
                                            
                                            <Link href={item.path}>
                                                {item.icon && iconMap[item.icon as keyof typeof iconMap]}
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            ))}
                         </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarSeparator className="ms-0" />
            <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Logout
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="top" className="w-[--radix-popper-anchor-width]">
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        </Sidebar>
    )
}