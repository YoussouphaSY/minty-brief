import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { FileText, Calendar as CalendarIcon, Upload } from "lucide-react";
import Navigation from "@/components/Navigation";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

const Justification = () => {
  const [justification, setJustification] = useState("");
  const [date, setDate] = useState<Date>();
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (justification.trim() && date) {
      toast({
        title: "Justification envoyée",
        description: "Votre justification d'absence a été enregistrée avec succès.",
      });
      setJustification("");
      setDate(undefined);
      setFile(null);
    } else {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">Justification d'Absence</h1>

        <Card className="p-6 sm:p-8 shadow-lg">
          <div className="flex items-start gap-3 mb-6">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">Nouvelle justification</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Expliquez les raisons de votre absence
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="date">Date d'absence *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: fr }) : <span>Sélectionnez une date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="justification">Motif de l'absence *</Label>
              <Textarea
                id="justification"
                placeholder="Décrivez la raison de votre absence..."
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                className="min-h-[150px] resize-none"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Document justificatif (optionnel)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <Upload className="w-5 h-5 text-muted-foreground" />
              </div>
              {file && (
                <p className="text-sm text-muted-foreground">
                  Fichier sélectionné : {file.name}
                </p>
              )}
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
