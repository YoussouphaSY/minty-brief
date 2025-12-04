import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { UserCircle } from "lucide-react";
import { authService } from "@/services/authService";

const Login = () => {
  const [matricule, setMatricule] = useState("");
  const [telephone, setTelephone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const authUser = await authService.login({ matricule, telephone });

      if (authUser) {
        toast({
          title: "Connexion réussie",
          description: `Bienvenue ${authUser.agent.prenom} ${authUser.agent.nom}`,
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error.message || "Matricule ou numéro de téléphone incorrect",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-background p-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <UserCircle className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Portail Employé</h1>
          <p className="text-muted-foreground text-sm mt-2">Connectez-vous à votre compte</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="matricule">Matricule</Label>
            <Input
              id="matricule"
              type="text"
              placeholder="MAT001"
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
              required
              className="w-full"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telephone">Numéro de téléphone</Label>
            <Input
              id="telephone"
              type="tel"
              placeholder="77 123 45 67"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
              className="w-full"
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Entrez votre numéro tel qu'enregistré dans le système
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
