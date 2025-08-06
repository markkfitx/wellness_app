import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import sessionData from "@/data/config/user.json"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
export default function AccountAvatarToggler(){
    return(
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
            <DropdownMenuItem><User className="h-[1.2rem] w-[1.2rem] mr-2"/><a href="/Dashboard/Account">Profile</a></DropdownMenuItem>
            <DropdownMenuItem><Settings className="h-[1.2rem] w-[1.2rem] mr-2"/><a href="/Dashboard/Settings">Settings</a></DropdownMenuItem>
            <DropdownMenuItem variant="destructive"><LogoutLink className="flex flex-row gap-2 flex-nowrap items-center"><LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />Logout</LogoutLink></DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    )
}