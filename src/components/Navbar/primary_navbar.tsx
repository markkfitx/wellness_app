import ThemeToggler from "../utils/theme-toggler";
import NotificationToggler from "../utils/notifications_toggler";
import AccountAvatarToggler from "../utils/account_avatar_toggler";
import QuickAddToggler from "../utils/quick_add_toggler";
import SearchBar from "../utils/search_bar";

export default function Navbar(){
    return (
        <nav className="pl-22 pr-5 py-2 flex items-center justify-between gap-4 border-b">
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