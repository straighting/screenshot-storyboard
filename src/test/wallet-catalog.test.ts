import { existsSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { wallets } from "@/routes/wallets";

const logoDir = path.resolve(process.cwd(), "public/wallets") + path.sep;

describe("Wallet catalog", () => {
  it("offers WalletConnect as a connect option", () => {
    const wc = wallets.find((w) => w.id === "walletconnect");

    expect(wc?.name).toBe("WalletConnect");
    expect(existsSync(`${logoDir}walletconnect.png`)).toBe(true);
  });

  it("has an official logo file for every wallet", () => {
    const missing = wallets.filter((w) => !existsSync(`${logoDir}${w.id}.png`)).map((w) => w.id);

    expect(missing).toEqual([]);
  });
});
