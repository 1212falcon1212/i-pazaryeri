import type { ReactNode } from "react";

type Block =
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string; id: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "blockquote"; text: string }
  | { type: "p"; text: string };

export function slugify(text: string): string {
  const map: Record<string, string> = {
    "ç": "c", "ğ": "g", "ı": "i", "ö": "o", "ş": "s", "ü": "u",
    "Ç": "c", "Ğ": "g", "İ": "i", "Ö": "o", "Ş": "s", "Ü": "u"
  };
  return text
    .toLowerCase()
    .replace(/[çğıöşüÇĞİÖŞÜ]/g, (ch) => map[ch] ?? ch)
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80) || "section";
}

export function parseHeadings(content: string): Array<{ id: string; text: string; level: 2 | 3 }> {
  const out: Array<{ id: string; text: string; level: 2 | 3 }> = [];
  const used = new Set<string>();
  for (const block of parse(content)) {
    if (block.type === "h2" || block.type === "h3") {
      let id = block.id;
      let i = 2;
      while (used.has(id)) id = `${block.id}-${i++}`;
      used.add(id);
      out.push({ id, text: block.text, level: block.type === "h2" ? 2 : 3 });
    }
  }
  return out;
}

function parse(content: string): Block[] {
  const raw = content.replace(/\r\n/g, "\n").trim().split(/\n{2,}/);
  return raw.map<Block>((block) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("## ")) {
      const text = trimmed.slice(3).trim();
      return { type: "h2", text, id: slugify(text) };
    }
    if (trimmed.startsWith("# ")) {
      const text = trimmed.slice(2).trim();
      return { type: "h2", text, id: slugify(text) };
    }
    if (trimmed.startsWith("### ")) {
      const text = trimmed.slice(4).trim();
      return { type: "h3", text, id: slugify(text) };
    }
    if (trimmed.startsWith("> ")) {
      return {
        type: "blockquote",
        text: trimmed
          .split("\n")
          .map((l) => l.replace(/^>\s?/, ""))
          .join(" ")
          .trim()
      };
    }
    const lines = trimmed.split("\n");
    if (lines.every((l) => /^- /.test(l))) {
      return {
        type: "ul",
        items: lines.map((l) => l.replace(/^- /, "").trim())
      };
    }
    if (lines.every((l) => /^\d+\.\s+/.test(l))) {
      return {
        type: "ol",
        items: lines.map((l) => l.replace(/^\d+\.\s+/, "").trim())
      };
    }
    return { type: "p", text: trimmed };
  });
}

function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  // Match **bold**, *italic*, `code`
  const re = /(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`\n]+`)/g;
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const tok = match[0];
    if (tok.startsWith("**")) {
      parts.push(<strong key={`b${key++}`}>{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith("`")) {
      parts.push(<code key={`c${key++}`} className="rich-inline-code">{tok.slice(1, -1)}</code>);
    } else if (tok.startsWith("*")) {
      parts.push(<em key={`i${key++}`}>{tok.slice(1, -1)}</em>);
    }
    lastIndex = re.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length === 0 ? [text] : parts;
}

export function RichContent({ content }: { content: string }) {
  const blocks = parse(content);
  const used = new Set<string>();
  const uniqId = (base: string) => {
    let id = base;
    let i = 2;
    while (used.has(id)) id = `${base}-${i++}`;
    used.add(id);
    return id;
  };

  return (
    <div className="rich-content">
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          const id = uniqId(block.id);
          return (
            <h2 key={i} id={id} className="rich-h2">
              <a href={`#${id}`} className="rich-anchor" aria-label="Bu başlığa bağlantı">#</a>
              {renderInline(block.text)}
            </h2>
          );
        }
        if (block.type === "h3") {
          const id = uniqId(block.id);
          return (
            <h3 key={i} id={id} className="rich-h3">
              <a href={`#${id}`} className="rich-anchor" aria-label="Bu başlığa bağlantı">#</a>
              {renderInline(block.text)}
            </h3>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={i} className="rich-ul">
              {block.items.map((item, j) => (
                <li key={j}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "ol") {
          return (
            <ol key={i} className="rich-ol">
              {block.items.map((item, j) => (
                <li key={j}>{renderInline(item)}</li>
              ))}
            </ol>
          );
        }
        if (block.type === "blockquote") {
          return (
            <blockquote key={i} className="rich-blockquote">
              {renderInline(block.text)}
            </blockquote>
          );
        }
        return (
          <p key={i} className="rich-p">
            {renderInline(block.text)}
          </p>
        );
      })}
    </div>
  );
}
