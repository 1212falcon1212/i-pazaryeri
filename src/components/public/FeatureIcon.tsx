import { BadgePercent, Boxes, Cable, Database, FileCheck, Users } from "lucide-react";

const icons = { Users, Boxes, BadgePercent, FileCheck, Database, Cable };

export function FeatureIcon({ name }: { name: string }) {
  const Icon = icons[name as keyof typeof icons] ?? Boxes;
  return <span className="icon-badge"><Icon size={22} /></span>;
}

