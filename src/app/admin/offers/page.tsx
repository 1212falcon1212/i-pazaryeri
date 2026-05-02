import { updateOffer } from "../actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { TextAreaField, TextField } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function AdminOffersPage() {
  await requireAdmin();
  const offers = await prisma.offerRequest.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <AdminShell>
      <h1 style={{ fontSize: 44 }}>Teklif Talepleri</h1>
      <div className="admin-list">
        {offers.map((offer) => (
          <form className="admin-card admin-form" action={updateOffer} key={offer.id}>
            <input type="hidden" name="id" value={offer.id} />
            <h2>{offer.company}</h2>
            <p>{offer.fullName} · {offer.email || offer.phone} · {offer.sector}</p>
            <p>{offer.message}</p>
            <div className="form-grid">
              <TextField label="Durum" name="status" defaultValue={offer.status} />
              <TextAreaField label="İç not" name="internalNote" defaultValue={offer.internalNote} />
            </div>
            <button className="btn btn-primary" type="submit">Güncelle</button>
          </form>
        ))}
        {offers.length === 0 ? <div className="admin-card">Henüz teklif talebi yok.</div> : null}
      </div>
    </AdminShell>
  );
}
