import { Card } from "@/components/ui/card";
import { mockUser } from "@/data/mockData";
import { User, Briefcase, Mail, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">Mon Profil</h1>

        <Card className="p-8 shadow-lg">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">{mockUser.name}</h2>
            <p className="text-muted-foreground">{mockUser.job}</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
              <Briefcase className="w-6 h-6 text-primary mt-1" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Poste</p>
                <p className="text-lg font-medium text-foreground">{mockUser.job}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
              <Mail className="w-6 h-6 text-primary mt-1" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <p className="text-lg font-medium text-foreground">{mockUser.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
              <Phone className="w-6 h-6 text-primary mt-1" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Téléphone</p>
                <p className="text-lg font-medium text-foreground">{mockUser.phone}</p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
