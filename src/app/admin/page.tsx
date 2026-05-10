import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function AdminPage() {
  await requireAdmin();
  const [packages, offers, posts] = await Promise.all([
    prisma.package.count(),
    prisma.offerRequest.count(),
    prisma.post.count()
  ]);

  return (
    <AdminShell>
      <h1 style={{ fontSize: 44 }}>Yönetim Paneli</h1>
      <div className="admin-grid">
        <div className="admin-card"><strong>{packages}</strong><p>Paket</p></div>
        <div className="admin-card"><strong>{offers}</strong><p>Teklif talebi</p></div>
        <div className="admin-card"><strong>{posts}</strong><p>Blog yazısı</p></div>
      </div>
    </AdminShell>
  );
}
