import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { Plus, Utensils, Dumbbell, GlassWater, Weight } from "lucide-react"
export default function QuickAddToggler(){
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Plus className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all " />
                    <span className="sr-only">Quick Add Button</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={10}>
                <DropdownMenuLabel className="flex flex-row flex-nowrap items-center"><Plus className="h-[0.9rem] w-[0.9rem] mr-2" />Quick Add</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Utensils className="h-[1.2rem] w-[1.2rem] mr-2" />Meal</DropdownMenuItem>
                <DropdownMenuItem><Dumbbell className="h-[1.2rem] w-[1.2rem] mr-2" />Activity</DropdownMenuItem>
                <DropdownMenuItem><GlassWater className="h-[1.2rem] w-[1.2rem] mr-2" />Water Intake</DropdownMenuItem>
                <DropdownMenuItem><Weight className="h-[1.2rem] w-[1.2rem] mr-2" />Weight</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}