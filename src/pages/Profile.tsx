import { Card } from "@/components/ui/card";
import { User, Briefcase, Phone, Hash } from "lucide-react";
import Navigation from "@/components/Navigation";
import { authService } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  if (!currentUser) {
    return null;
  }

  const agent = currentUser.agent;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">Mon Profil</h1>

        <Card className="p-6 sm:p-8 shadow-lg">
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary rounded-full flex items-center justify-center mb-4">
              <User className="w-10 h-10 sm:w-12 sm:h-12 text-primary-foreground" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center">
              {agent.prenom} {agent.nom}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground text-center">{agent.service}</p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-secondary/50 rounded-lg">
              <Hash className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-1 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Matricule</p>
                <p className="text-base sm:text-lg font-medium text-foreground break-words">
                  {agent.matricule}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-secondary/50 rounded-lg">
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-1 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Service</p>
                <p className="text-base sm:text-lg font-medium text-foreground break-words">
                  {agent.service}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-secondary/50 rounded-lg">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-1 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Téléphone</p>
                <p className="text-base sm:text-lg font-medium text-foreground">
                  {agent.telephone || "Non renseigné"}
                </p>
              </div>
            </div>

            {agent.status && (
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-secondary/50 rounded-lg">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Statut</p>
                  <p className="text-base sm:text-lg font-medium text-foreground">
                    {agent.status}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
