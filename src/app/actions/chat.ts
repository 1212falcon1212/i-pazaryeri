"use server";

import { prisma } from "@/lib/db";

export type ChatTranscriptMessage = {
  role: "bot" | "user";
  text: string;
  ts: string; // ISO
};

export type ChatTranscript = {
  topics: string[];
  messages: ChatTranscriptMessage[];
};

export type ChatLeadInput = {
  fullName: string;
  company: string;
  email?: string;
  phone?: string;
  sector?: string;
  message?: string;
  transcript: ChatTranscript;
};

export type ChatLeadResult =
  | { ok: true; id: string }
  | { ok: false; errors: string[] };

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function submitChatLead(input: ChatLeadInput): Promise<ChatLeadResult> {
  const fullName = clean(input.fullName);
  const company = clean(input.company);
  const email = clean(input.email);
  const phone = clean(input.phone);
  const sector = clean(input.sector) || "Belirtilmedi";
  const userMessage = clean(input.message);

  const errors: string[] = [];
  if (!fullName) errors.push("Ad soyad gereklidir.");
  if (!company) errors.push("Şirket adı gereklidir.");
  if (!email && !phone) errors.push("Telefon veya e-posta gereklidir.");

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const transcript = input.transcript;
  const topics = Array.isArray(transcript?.topics) ? transcript.topics : [];

  // Build a concise summary that lands in the message field so admins see context immediately
  const summaryParts: string[] = [];
  if (topics.length > 0) {
    summaryParts.push(`İlgilendiği konular: ${topics.join(", ")}`);
  }
  if (userMessage) {
    summaryParts.push(userMessage);
  } else {
    summaryParts.push("(Müşteri sohbet üzerinden iletişime geçti — detaylar transkriptte.)");
  }
  const message = summaryParts.join("\n\n");

  const created = await prisma.offerRequest.create({
    data: {
      fullName,
      company,
      email: email || null,
      phone: phone || null,
      sector,
      networkSize: null,
      modules: null,
      selectedServices: topics.join(", ") || null,
      message,
      source: "chatbot",
      chatTranscript: JSON.stringify(transcript)
    }
  });

  return { ok: true, id: created.id };
}
