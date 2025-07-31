import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ThemeToggler from "./utils/theme-toggler";
import SidebarToggler from "./utils/sidebar-toggler";
import { LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import sessionData from "@/data/config/user.json"


export default function Navbar(){
    return (
        <nav className="px-5 py-4 flex items-center justify-between">
            {/*LEFT*/}
            <SidebarToggler/>
            {/*RIGHT*/}
            <div className="flex items-center gap-4">
                <a href="/">Dashboard</a>
                <ThemeToggler />
                <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar className="border">
                        <AvatarImage src={sessionData.userData[0].profilePicture} />
                        <AvatarFallback>MK</AvatarFallback>
                    </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={10}>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><User className="h-[1.2rem] w-[1.2rem] mr-2"/><a href="/profile">Profile</a></DropdownMenuItem>
                        <DropdownMenuItem><Settings className="h-[1.2rem] w-[1.2rem] mr-2"/>Settings</DropdownMenuItem>
                        <DropdownMenuItem variant="destructive"><LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
}