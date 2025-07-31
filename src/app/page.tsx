import ChartTooltipAdvanced from "@/components/Charts/chart-tooltip-advanced";
import ChartAreaInteractive from "@/components/Charts/chart-area-interactive";
import Breadcrumb from "@/components/wrappers/breadcrumbs";
import Box from "@/components/wrappers/box";
//import  AspAPI from "../../data/api/aspAPI";
//import globals from "../../data/config/global.json"
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "lucide-react";

interface DataResponse {
  id: string;
  name: string;
  status: string;
}
export default function Main() {
    return (
      <>
        <Breadcrumb />
        <div className="grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            
        </div>
        </>
    );
};