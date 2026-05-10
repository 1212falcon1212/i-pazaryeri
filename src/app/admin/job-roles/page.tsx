import { deleteJobRole, saveJobRole } from "../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { CheckboxField, TextAreaField, TextField } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

type Props = { searchParams: Promise<{ saved?: string; deleted?: string }> };

export default async function AdminJobRolesPage({ searchParams }: Props) {
  await requireAdmin();
  const [roles, query] = await Promise.all([
    prisma.jobRole.findMany({ orderBy: { sortOrder: "asc" } }),
    searchParams
  ]);

  return (
    <AdminShell>
      <h1 style={{ fontSize: 44 }}>İş Rolleri</h1>
      <p style={{ color: "var(--muted)", marginTop: -8 }}>
        /kariyer sayfasında görünen rol kartları.
      </p>
      {query.saved ? <div className="notice" style={{ marginBottom: 18 }}>Kaydedildi.</div> : null}
      {query.deleted ? <div className="notice" style={{ marginBottom: 18 }}>Silindi.</div> : null}

      <div className="admin-list">
        {roles.map((role) => (
          <div className="admin-card" key={role.id}>
            <form className="admin-form" action={saveJobRole}>
              <input type="hidden" name="id" value={role.id} />
              <div className="form-grid">
                <TextField label="Başlık" name="title" defaultValue={role.title} required />
                <TextField label="Icon (Lucide adı, örn. Code2)" name="icon" defaultValue={role.icon} />
                <TextField label="Departman" name="department" defaultValue={role.department} />
                <TextField label="Lokasyon" name="location" defaultValue={role.location} />
                <TextField label="Tipi (Tam zamanlı, Remote, vs.)" name="type" defaultValue={role.type} />
                <TextField label="Başvuru linki (opsiyonel)" name="applyUrl" defaultValue={role.applyUrl} />
                <TextField label="Sıra" name="sortOrder" defaultValue={role.sortOrder} />
                <CheckboxField label="Yayında" name="isPublished" defaultChecked={role.isPublished} />
              </div>
              <TextAreaField label="Açıklama" name="description" defaultValue={role.description} required />
              <button className="btn btn-primary" type="submit" style={{ marginTop: 16 }}>Kaydet</button>
            </form>
            <form action={deleteJobRole} style={{ marginTop: 10 }}>
              <input type="hidden" name="id" value={role.id} />
              <button className="btn btn-ghost btn-sm" type="submit">Sil</button>
            </form>
          </div>
        ))}

        <form className="admin-card admin-form" action={saveJobRole}>
          <h2>Yeni rol</h2>
          <div className="form-grid">
            <TextField label="Başlık" name="title" required />
            <TextField label="Icon" name="icon" defaultValue="Sparkles" />
            <TextField label="Departman" name="department" />
            <TextField label="Lokasyon" name="location" />
            <TextField label="Tipi" name="type" />
            <TextField label="Başvuru linki" name="applyUrl" />
            <TextField label="Sıra" name="sortOrder" defaultValue={99} />
            <CheckboxField label="Yayında" name="isPublished" defaultChecked />
          </div>
          <TextAreaField label="Açıklama" name="description" required />
          <button className="btn btn-primary" type="submit">Yeni rol ekle</button>
        </form>
      </div>
    </AdminShell>
  );
}
