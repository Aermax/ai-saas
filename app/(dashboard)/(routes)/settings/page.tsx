import { Settings } from "lucide-react";

import Header from "@/components/Header";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return ( 
    <div>
      <Header
        title="Settings"
        content="Manage account settings."
        icon={Settings}
        color="text-gray-700"
        bg="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro ? "You are currently on a Pro plan." : "You are currently on a free plan."}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
   );
}
 
export default SettingsPage;