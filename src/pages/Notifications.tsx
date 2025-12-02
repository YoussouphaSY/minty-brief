import { Card } from "@/components/ui/card";
import { notifications } from "@/data/mockData";
import { Bell, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Toutes les notifications</h1>
        </div>

        <Card className="p-4 sm:p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Historique complet</h2>
          </div>
          
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 bg-primary/5 border-l-4 border-primary rounded-lg hover:bg-primary/10 transition-colors"
              >
                <p className="text-sm sm:text-base text-foreground">{notification.message}</p>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Notifications;
