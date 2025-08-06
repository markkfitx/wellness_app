import SidebarToggler from "../utils/sidebar-toggler";
import Breadcrumb from "@/components/wrappers/breadcrumbs";

export default function SecondaryNavbar(){
    return (
        <nav className="px-5 py-2 flex items-center justify-between gap-4">
            <div className="flex flex-row items-center gap-10">
                <SidebarToggler/>
                <Breadcrumb />
            </div>
        </nav>
    )
}