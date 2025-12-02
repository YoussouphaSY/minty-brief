import { Card } from "@/components/ui/card";
import { presenceStats, pointageRecords, notifications, mockUser } from "@/data/mockData";
import { CheckCircle2, XCircle, Clock, Bell } from "lucide-react";
import Navigation from "@/components/Navigation";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bonjour, {mockUser.name}
          </h1>
          <p className="text-muted-foreground">Voici votre aperçu de présence</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Taux de présence</p>
                <p className="text-4xl font-bold">{presenceStats.presenceRate}%</p>
              </div>
              <CheckCircle2 className="w-12 h-12 opacity-80" />
            </div>
          </Card>

          <Card className="p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Jours présents</p>
                <p className="text-4xl font-bold text-primary">{presenceStats.presents}</p>
              </div>
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
          </Card>

          <Card className="p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Jours absents</p>
                <p className="text-4xl font-bold text-destructive">{presenceStats.absents}</p>
              </div>
              <XCircle className="w-12 h-12 text-destructive" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Pointages */}
          <Card className="p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Derniers pointages
            </h2>
            <div className="space-y-3">
              {pointageRecords.map((record, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{record.date}</p>
                    <p className="text-sm text-muted-foreground">
                      {record.arrival} - {record.departure}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
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
          <Card className="p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </h2>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 bg-primary/5 border-l-4 border-primary rounded-lg"
                >
                  <p className="text-foreground">{notification.message}</p>
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
