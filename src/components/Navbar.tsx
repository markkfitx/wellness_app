import ThemeToggler from "./utils/theme-toggler";
import SidebarToggler from "./utils/sidebar-toggler";
import NotificationToggler from "./utils/notifications_toggler";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import AccountAvatarToggler from "./utils/account_avatar_toggler";
import QuickAddToggler from "./utils/quick_add_toggler";
import SearchBar from "./utils/search_bar";

export default function Navbar(){
    const {isAuthenticated} = getKindeServerSession(); // THIS IS A PROMISE
    const isLoggedIn = isAuthenticated()
    return (
        <nav className="px-5 py-4 flex items-center justify-between gap-4">
            {/*LEFT*/}
            <div className="flex flex-row items-center gap-5">
                <SidebarToggler/>
            </div>
            {/*RIGHT*/}
            <SearchBar />
            <div className="flex items-center gap-2">
                <AccountAvatarToggler />
                <div className="border-l h-[25px] w-[5px] ml-2"></div>
                <QuickAddToggler />
                <NotificationToggler />
                <ThemeToggler />
            </div>
        </nav>
    )
}