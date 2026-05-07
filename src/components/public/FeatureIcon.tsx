import {
  BadgePercent,
  Boxes,
  Cable,
  Code2,
  Database,
  FileCheck,
  Gauge,
  Layers3,
  ListChecks,
  LayoutDashboard,
  MessageSquare,
  MessagesSquare,
  Plug,
  Rocket,
  Search,
  Settings2,
  ShieldCheck,
  Truck,
  WalletCards,
  Users
} from "lucide-react";

const icons = {
  Users,
  Boxes,
  BadgePercent,
  Code2,
  FileCheck,
  Database,
  Cable,
  Gauge,
  Layers3,
  LayoutDashboard,
  ListChecks,
  MessageSquare,
  MessagesSquare,
  Plug,
  Rocket,
  Search,
  Settings2,
  ShieldCheck,
  Truck,
  WalletCards
};

export function FeatureIcon({ name }: { name: string }) {
  const Icon = icons[name as keyof typeof icons] ?? Boxes;
  return (
    <span className="icon-badge">
      <Icon size={20} />
    </span>
  );
}
