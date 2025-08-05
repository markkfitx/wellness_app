import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ThemeToggler from "./utils/theme-toggler";
import SidebarToggler from "./utils/sidebar-toggler";
import { Bell, LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import sessionData from "@/data/config/user.json"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "./ui/button";

export default function Navbar(){
    const {isAuthenticated} = getKindeServerSession(); // THIS IS A PROMISE
    const isLoggedIn = isAuthenticated()
    return (
        <nav className="px-5 py-4 flex items-center justify-between">
            {/*LEFT*/}
            <div className="flex flex-row items-center gap-5">
                <SidebarToggler/>
            </div>
            {/*RIGHT*/}
            <div className="flex items-center gap-2">
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
                        <DropdownMenuItem variant="destructive"><LogoutLink className="flex flex-row gap-2 flex-nowrap items-center"><LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />Logout</LogoutLink></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="border-l h-[25px] w-[5px] ml-2"></div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Bell className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                            <span className="sr-only">Notification Bell</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={10}>
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>TEST</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <ThemeToggler />
            </div>
        </nav>
    )
}