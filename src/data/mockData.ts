export interface User {
  email: string;
  password: string;
  name: string;
  job: string;
  phone: string;
}

export interface PresenceStats {
  presenceRate: number;
  presents: number;
  absents: number;
}

export interface PointageRecord {
  date: string;
  arrival: string;
  departure: string;
  status: "Présent" | "Retard" | "Absent";
}

export interface Notification {
  id: number;
  message: string;
}

export const mockUser: User = {
  email: "manga@example.com",
  password: "password123",
  name: "Manga Diop",
  job: "Agent de sécurité",
  phone: "77 123 45 67"
};

export const presenceStats: PresenceStats = {
  presenceRate: 87,
  presents: 18,
  absents: 2
};

export const pointageRecords: PointageRecord[] = [
  { date: "2025-12-01", arrival: "08:12", departure: "17:04", status: "Présent" },
  { date: "2025-11-30", arrival: "08:45", departure: "16:50", status: "Retard" },
  { date: "2025-11-29", arrival: "08:05", departure: "17:10", status: "Présent" },
  { date: "2025-11-28", arrival: "08:30", departure: "17:00", status: "Présent" },
  { date: "2025-11-27", arrival: "-", departure: "-", status: "Absent" }
];

export const notifications: Notification[] = [
  { id: 1, message: "Justification d'absence du 27/11 requise" },
  { id: 2, message: "Votre taux de présence a été mis à jour" }
];
