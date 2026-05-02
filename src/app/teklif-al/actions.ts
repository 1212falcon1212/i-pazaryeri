"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { validateOfferInput } from "@/lib/validators";

export async function createOffer(formData: FormData) {
  const result = validateOfferInput({
    fullName: formData.get("fullName"),
    company: formData.get("company"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    sector: formData.get("sector"),
    networkSize: formData.get("networkSize"),
    modules: formData.get("modules"),
    message: formData.get("message")
  });

  if (!result.ok) {
    redirect(`/teklif-al?error=${encodeURIComponent(result.errors.join(" "))}`);
  }

  await prisma.offerRequest.create({ data: result.data });
  redirect("/teklif-al?success=1");
}

