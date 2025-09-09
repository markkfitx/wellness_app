import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Profile from "@/app/Dashboard/Settings/Sections/profile"
import Billing from "@/app/Dashboard/Settings/Sections/billing"

export default function Settings() {
  return (
    <div>
      <Tabs defaultValue="account" className="w-full mt-3 px-3">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
        </TabsList>
        <TabsContent value="profile"><Profile /></TabsContent>
        <TabsContent value="billing"><Billing/></TabsContent>
        <TabsContent value="password"></TabsContent>
        <TabsContent value="notifications"></TabsContent>
        <TabsContent value="privacy"></TabsContent>
        <TabsContent value="integration"></TabsContent>
      </Tabs>
    </div>
  );
}
