import { describe, expect, it } from "vitest";
import { brandTheme } from "./theme";

describe("brandTheme", () => {
  it("uses an ikas-inspired vivid blue primary palette", () => {
    expect(brandTheme.primary).toBe("#2563EB");
    expect(brandTheme.primaryHover).toBe("#1D4FD7");
    expect(brandTheme.primarySoft).toBe("#EFF4FF");
    expect(brandTheme.forest).toBe("#0F1730");
  });
});
