import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { Bell } from "lucide-react"
export default function NotificationToggler(){
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Bell className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <span className="sr-only">Notification Bell</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={10}>
                <DropdownMenuLabel className="flex flex-row items-center flex-nowrap"><Bell className="h-[0.9rem] w-[0.9rem] mr-2" />Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>TEST</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}