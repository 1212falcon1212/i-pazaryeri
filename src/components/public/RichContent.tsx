type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "p"; text: string };

function parse(content: string): Block[] {
  const raw = content.replace(/\r\n/g, "\n").trim().split(/\n{2,}/);
  return raw.map<Block>((block) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("## ")) {
      return { type: "h2", text: trimmed.slice(3).trim() };
    }
    if (trimmed.startsWith("### ")) {
      return { type: "h3", text: trimmed.slice(4).trim() };
    }
    if (/^- /m.test(trimmed) && trimmed.split("\n").every((l) => l.startsWith("- "))) {
      return {
        type: "ul",
        items: trimmed.split("\n").map((l) => l.replace(/^- /, "").trim())
      };
    }
    return { type: "p", text: trimmed };
  });
}

export function RichContent({ content }: { content: string }) {
  const blocks = parse(content);
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2
              key={i}
              style={{
                margin: i === 0 ? "0 0 12px" : "36px 0 12px",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 2vw, 28px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                color: "var(--ink)"
              }}
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3
              key={i}
              style={{
                margin: i === 0 ? "0 0 8px" : "24px 0 8px",
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "var(--ink)"
              }}
            >
              {block.text}
            </h3>
          );
        }
        if (block.type === "ul") {
          return (
            <ul
              key={i}
              style={{
                margin: "10px 0 14px",
                paddingLeft: 22,
                color: "var(--ink-2)",
                lineHeight: 1.65
              }}
            >
              {block.items.map((item, j) => (
                <li key={j} style={{ marginBottom: 6 }}>
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p
            key={i}
            style={{
              margin: i === 0 ? 0 : "14px 0 0",
              lineHeight: 1.7,
              color: "var(--ink-2)"
            }}
          >
            {block.text}
          </p>
        );
      })}
    </>
  );
}
