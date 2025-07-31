"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Inbox,
  ShoppingBag,
  FileText,
  IdCardLanyard,
  ClipboardList,
  Settings,
  User,
  ChevronUp,
} from "lucide-react"
import { SidebarMenuButton } from "../ui/sidebar"
import clsx from "clsx"
import { Url } from "next/dist/shared/lib/router/router"
import React from "react"

const iconMap = {
  home: <Home className="h-4 w-4 me-2" />,
  inbox: <Inbox className="h-4 w-4 me-2" />,
  settings: <Settings className="h-4 w-4 me-2" />,
  user: <User className="h-4 w-4 me-2" />,
  shoppingBag: <ShoppingBag className="h-4 w-4 me-2" />,
  fileText: <FileText className="h-4 w-4 me-2" />,
  idCardLanyard: <IdCardLanyard className="h-4 w-4 me-2" />,
  clipboardList: <ClipboardList className="h-4 w-4 me-2" />,
}

type NavigationProps = {
  path: Url
  label: string
  icon?: string
  nested?: boolean
}

// Forward ref for nested use (e.g., inside <CollapsibleTrigger asChild>)
const NavigationItem = React.forwardRef<HTMLButtonElement, NavigationProps & React.ComponentPropsWithoutRef<typeof SidebarMenuButton>>(
  ({ path, label, icon, nested, className, ...props }, ref) => {
    const pathname = usePathname()

    const content = (
      <>
        {icon && iconMap[icon as keyof typeof iconMap]}
        <span>{label}</span>
        {nested && (
          <ChevronUp className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
        )}
      </>
    )

    return (
      <SidebarMenuButton asChild className={clsx(pathname === path && "bg-blue-400", className)} ref={nested ? ref : undefined}{...props}>
        {/* only forward ref if used in nested case */ }
        <Link href={path || "#"}>{content}</Link>
      </SidebarMenuButton>
    )
  }
)

NavigationItem.displayName = "NavigationItem"
export default NavigationItem
