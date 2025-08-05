import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NavigationTabs(){
    return (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="home">Home</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="health">Health</TabsTrigger>
                <TabsTrigger value="train">Training Plans</TabsTrigger>
            </TabsList>
            <TabsContent value="home">Make changes to your account here.</TabsContent>
            <TabsContent value="activities">Change your password here.</TabsContent>
            <TabsContent value="health">Change your password here.</TabsContent>
            <TabsContent value="train">Change your password here.</TabsContent>
        </Tabs>
    )
}