"use client";

import { useState } from "react";
import { Link2, MessageCircle, Check } from "lucide-react";

function IconX({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.84l-5.36-7-6.13 7H1.4l8.03-9.18L1 2h6.99l4.84 6.39L18.244 2Zm-2.4 18h1.84L7.27 4h-1.95l10.524 16Z" />
    </svg>
  );
}

function IconLinkedIn({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43A2.06 2.06 0 1 1 5.34 3.31a2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function BlogShare({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${slug}`
      : `https://i-pazaryeri.com/blog/${slug}`;
  const shareText = encodeURIComponent(title);
  const shareUrl = encodeURIComponent(url);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <div className="blog-share" aria-label="Paylaş">
      <span className="blog-share-label">Paylaş</span>
      <div className="blog-share-buttons">
        <a
          className="blog-share-btn"
          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter)'da paylaş"
          title="X'te paylaş"
        >
          <IconX size={14} />
        </a>
        <a
          className="blog-share-btn"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn'de paylaş"
          title="LinkedIn'de paylaş"
        >
          <IconLinkedIn size={14} />
        </a>
        <a
          className="blog-share-btn"
          href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp'ta paylaş"
          title="WhatsApp'ta paylaş"
        >
          <MessageCircle size={15} />
        </a>
        <button
          type="button"
          className={`blog-share-btn ${copied ? "is-copied" : ""}`}
          onClick={handleCopy}
          aria-label="Bağlantıyı kopyala"
          title={copied ? "Kopyalandı" : "Bağlantıyı kopyala"}
        >
          {copied ? <Check size={15} /> : <Link2 size={15} />}
        </button>
      </div>
    </div>
  );
}
