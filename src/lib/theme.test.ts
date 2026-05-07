import { describe, expect, it } from "vitest";
import { brandTheme } from "./theme";

describe("brandTheme", () => {
  it("uses a copper and forest palette instead of the previous blue-led palette", () => {
    expect(brandTheme).toEqual({
      accent: "#2F6B4F",
      accentHover: "#25543F",
      copper: "#B87333",
      copperSoft: "#F3D6BE",
      forest: "#12382B",
      leaf: "#6FA77A"
    });
  });
});
