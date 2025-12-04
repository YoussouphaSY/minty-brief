import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, User, FileText, LogOut, History } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/profile", icon: User, label: "Profil" },
    { path: "/justification", icon: FileText, label: "Justification" },
    { path: "/justifications-history", icon: History, label: "Historique" },
  ];

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full" />
            <span className="font-semibold text-foreground">MF</span>
          </div>

          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                onClick={() => navigate(item.path)}
                className={cn(
                  "gap-2",
                  location.pathname === item.path && "bg-primary/10 text-primary"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Button>
            ))}
            
            <Button variant="ghost" onClick={handleLogout} className="gap-2 text-destructive">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
