import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock, Bell, AlertCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { usePointagesByMatricule, usePointagesStats } from "@/hooks/usePointages";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

  // Récupérer le matricule de l'utilisateur connecté
  const matricule = currentUser?.agent.matricule;

  // Récupérer les statistiques et pointages depuis Supabase
  const { data: stats, isLoading: statsLoading } = usePointagesStats(matricule);
  const { data: pointages, isLoading: pointagesLoading } = usePointagesByMatricule(matricule);

  // État pour les filtres
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Rediriger si non authentifié
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  if (!currentUser) {
    return null;
  }

  // Filtrer les pointages par status
  const filteredPointages = pointages?.filter((pointage) => {
    if (statusFilter === "all") return true;
    const statusLower = (pointage.status || pointage.type_pointage).toLowerCase();
    return statusLower === statusFilter;
  }) || [];

  // Notifications mockées (à remplacer plus tard par des vraies notifications)
  const notifications = [
    { id: 1, message: "Bienvenue sur votre portail employé" },
    { id: 2, message: "Votre taux de présence a été mis à jour" },
    { id: 3, message: "N'oubliez pas de pointer à l'arrivée et au départ" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-6xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Bonjour, {currentUser.agent.prenom} {currentUser.agent.nom}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Voici votre aperçu de présence
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="p-3 sm:p-4 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90 mb-1">Taux de présence</p>
                <p className="text-2xl sm:text-3xl font-bold">
                  {statsLoading ? "..." : `${stats?.presenceRate || 0}%`}
                </p>
              </div>
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 opacity-80" />
            </div>
          </Card>

          <Card className="p-3 sm:p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Jours présents</p>
                <p className="text-2xl sm:text-3xl font-bold text-primary">
                  {statsLoading ? "..." : stats?.presents || 0}
                </p>
              </div>
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            </div>
          </Card>

          <Card className="p-3 sm:p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Jours absents</p>
                <p className="text-2xl sm:text-3xl font-bold text-destructive">
                  {statsLoading ? "..." : stats?.absents || 0}
                </p>
              </div>
              <XCircle className="w-8 h-8 sm:w-10 sm:h-10 text-destructive" />
            </div>
          </Card>

          <Card className="p-3 sm:p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Jours retard</p>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-600">
                  {statsLoading ? "..." : stats?.lates || 0}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-600" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Recent Pointages */}
          <Card className="p-4 sm:p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Derniers pointages
              </h2>
            </div>

            {/* Filtres par status */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
                className="text-xs"
              >
                Tous
              </Button>
              <Button
                variant={statusFilter === "validated" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("validated")}
                className="text-xs"
              >
                Validé
              </Button>
              <Button
                variant={statusFilter === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("pending")}
                className="text-xs"
              >
                En attente
              </Button>
              <Button
                variant={statusFilter === "rejected" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("rejected")}
                className="text-xs"
              >
                Rejeté
              </Button>
            </div>


            <div className={`space-y-3 max-h-96 overflow-y-auto pr-2`}>
              {pointagesLoading ? (
                <p className="text-muted-foreground text-center py-4">Chargement...</p>
              ) : filteredPointages.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  {statusFilter === "all" ? "Aucun pointage enregistré" : "Aucun pointage pour ce filtre"}
                </p>
              ) : (
                filteredPointages.map((pointage) => {
                  const date = new Date(pointage.created_at);
                  const formattedDate = format(date, "dd/MM/yyyy", { locale: fr });
                  const formattedTime = format(date, "HH:mm", { locale: fr });

                  // Utiliser le champ status s'il existe, sinon fallback sur type_pointage
                  const displayStatus = pointage.status || pointage.type_pointage;
                  const statusLower = displayStatus.toLowerCase();

                  // Mapper les statuts anglais vers français pour l'affichage
                  let displayLabel = displayStatus;
                  if (statusLower === 'validated') displayLabel = 'Validé';
                  else if (statusLower === 'rejected') displayLabel = 'Rejeté';
                  else if (statusLower === 'pending') displayLabel = 'En attente';

                  // Déterminer si le statut est "présent" (validated = validé)
                  const isPresent = statusLower === "validated" ||
                    statusLower === "validé" ||
                    statusLower === "valide" ||
                    statusLower === "présent" ||
                    statusLower === "present" ||
                    statusLower === "entrée" ||
                    statusLower === "entree" ||
                    statusLower === "sortie";

                  // Déterminer si le statut est "retard" (pending = en attente)
                  const isLate = statusLower === "pending" || statusLower === "retard";

                  // Tout le reste (rejected, absent, etc.) est considéré comme absent
                  const isAbsent = !isPresent && !isLate;

                  return (
                    <div
                      key={pointage.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-secondary/50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm sm:text-base text-foreground">
                          {formattedDate}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {formattedTime}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium self-start sm:self-center ${isPresent
                          ? "bg-primary/10 text-primary"
                          : isLate
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-destructive/10 text-destructive"
                          }`}
                      >
                        {displayLabel}
                      </span>
                    </div>
                  );
                })
              )}
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
      </main >
    </div >
  );
};

export default Dashboard;
