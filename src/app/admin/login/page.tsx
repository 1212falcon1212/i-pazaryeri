import { login } from "../actions";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const query = await searchParams;
  return (
    <main className="admin-layout">
      <div className="container" style={{ maxWidth: 460, paddingTop: 100 }}>
        <form className="admin-card admin-form" action={login}>
          <h1 style={{ fontSize: 42 }}>Admin Girişi</h1>
          {query.error ? <div className="notice">Şifre hatalı.</div> : null}
          <div className="field">
            <label>Şifre</label>
            <input name="password" required type="password" />
          </div>
          <button className="btn btn-primary" type="submit">Giriş yap</button>
        </form>
      </div>
    </main>
  );
}

