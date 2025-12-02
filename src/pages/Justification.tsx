import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FileText } from "lucide-react";
import Navigation from "@/components/Navigation";

const Justification = () => {
  const [justification, setJustification] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (justification.trim()) {
      toast({
        title: "Justification envoyée",
        description: "Votre justification d'absence a été enregistrée avec succès.",
      });
      setJustification("");
    } else {
      toast({
        title: "Erreur",
        description: "Veuillez saisir une justification.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">Justification d'Absence</h1>

        <Card className="p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">Nouvelle justification</h2>
              <p className="text-sm text-muted-foreground">
                Expliquez les raisons de votre absence
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="justification">Motif de l'absence</Label>
              <Textarea
                id="justification"
                placeholder="Décrivez la raison de votre absence..."
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                className="min-h-[200px] resize-none"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Envoyer la justification
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default Justification;
