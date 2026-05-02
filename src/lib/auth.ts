import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "ipazaryeri_admin";

function expectedToken() {
  const secret = process.env.ADMIN_SESSION_SECRET ?? "ipazaryeri-local-secret";
  return `admin:${secret}`;
}

export async function isAdmin() {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === expectedToken();
}

export async function requireAdmin() {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }
}

export async function setAdminSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

