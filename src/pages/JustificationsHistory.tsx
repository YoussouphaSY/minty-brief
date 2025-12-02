import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { justificationRecords } from "@/data/mockData";
import { FileText, ArrowLeft, Calendar, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const JustificationsHistory = () => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Validée":
        return "bg-primary/10 text-primary border-primary/20";
      case "En attente":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Refusée":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

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
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Historique des justifications</h1>
        </div>

        <div className="space-y-4">
          {justificationRecords.map((record) => (
            <Card key={record.id} className="p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">Absence du {format(new Date(record.date), "PPP", { locale: fr })}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{record.motif}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Soumis le {format(new Date(record.dateSubmission), "PP", { locale: fr })}</span>
                        </div>
                        {record.document && (
                          <div className="flex items-center gap-1">
                            <File className="w-4 h-4" />
                            <span>{record.document}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <Badge className={getStatusColor(record.status)}>
                  {record.status}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default JustificationsHistory;
