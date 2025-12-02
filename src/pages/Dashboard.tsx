import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { presenceStats, pointageRecords, notifications, mockUser } from "@/data/mockData";
import { CheckCircle2, XCircle, Clock, Bell, AlertCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-6xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Bonjour, {mockUser.name}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">Voici votre aperçu de présence</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="p-3 sm:p-4 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90 mb-1">Taux de présence</p>
                <p className="text-2xl sm:text-3xl font-bold">{presenceStats.presenceRate}%</p>
              </div>
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 opacity-80" />
            </div>
          </Card>

          <Card className="p-3 sm:p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Jours présents</p>
                <p className="text-2xl sm:text-3xl font-bold text-primary">{presenceStats.presents}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            </div>
          </Card>

          <Card className="p-3 sm:p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Jours absents</p>
                <p className="text-2xl sm:text-3xl font-bold text-destructive">{presenceStats.absents}</p>
              </div>
              <XCircle className="w-8 h-8 sm:w-10 sm:h-10 text-destructive" />
            </div>
          </Card>

          <Card className="p-3 sm:p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Jours retard</p>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-600">{presenceStats.lates}</p>
              </div>
              <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-600" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Recent Pointages */}
          <Card className="p-4 sm:p-6 shadow-lg">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Derniers pointages
            </h2>
            <div className="space-y-3">
              {pointageRecords.map((record, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-secondary/50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm sm:text-base text-foreground">{record.date}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {record.arrival} - {record.departure}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium self-start sm:self-center ${
                      record.status === "Présent"
                        ? "bg-primary/10 text-primary"
                        : record.status === "Retard"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {record.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-4 sm:p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notifications
              </h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/notifications")}
                className="text-primary hover:text-primary/80"
              >
                Voir tout
              </Button>
            </div>
            <div className="space-y-3">
              {notifications.slice(0, 3).map((notification) => (
                <div
                  key={notification.id}
                  className="p-3 sm:p-4 bg-primary/5 border-l-4 border-primary rounded-lg"
                >
                  <p className="text-sm sm:text-base text-foreground">{notification.message}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
