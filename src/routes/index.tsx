import type React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, ChevronsDown, Menu, User, Send, Github, Apple, Play } from "lucide-react";
import { ChatWidget } from "@/components/ChatWidget";
import coins from "@/assets/coins.png";
import shield from "@/assets/shield.png";
import rocket from "@/assets/rocket.png";
import wallet from "@/assets/wallet.png";
import piggy from "@/assets/piggy.png";
import lock from "@/assets/lock.png";
import safe from "@/assets/safe.png";
import mining from "@/assets/mining.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DAPP — Fix Web3 Issues in Seconds" },
      { name: "description", content: "Your all-in-one tool for solving common Web3 problems. Fast and stress-free." },
      { property: "og:title", content: "DAPP — Fix Web3 Issues in Seconds" },
      { property: "og:description", content: "Your all-in-one tool for solving common Web3 problems. Fast and stress-free." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = ["Home", "Feature", "Roadmap", "Blog", "Contact"];
const partners = ["GitHub", "Quotient", "Catalog", "Calendly", "BINANCE", "coinbase"];
const why = [
  { t: "Smart", d: "Handles complex errors automatically", img: coins },
  { t: "Fast", d: "Fix most issues in under 30 seconds", img: piggy },
  { t: "Chain-Agnostic", d: "Works across major blockchains", img: lock },
  { t: "Secure", d: "We never store your keys or data", img: safe },
];
const fixes = [
  "Migration", "General Issues", "Authentication", "Validation", "Staking", "Fix Bugs",
  "Glitches", "Claim Rewards", "Withdrawal Management", "Blockchain Recovery", "Airdrops",
  "Claim Presale", "Token Bridge Solutions", "NFT (Non-Fungible Token) Solutions", "KYC Verification",
  "APR ACTIVATION", "Token Stake and Token Unstake", "Connenct to DAPP", "TRANSACTION DELAY",
  "UNABLE TO BUY COIN/TOKEN", "TOKEN BRIDGE", "Slippage Mitigation", "Rectification", "High Gas Fees",
  "Slippage Error", "Transaction Error", "Locked Account", "Trading Wallet Issues",
  "Unable To Buy Coins/Tokens", "Multi-Chain Support", "Token Burn", "Token Minting",
  "Wallet Connection Issues", "Gas Fee Estimator", "Other Issues Not Listed",
];

function Pill({ label, dark, wallet }: { label: string; dark?: boolean; wallet?: boolean }) {
  const Tag = (wallet ? Link : "button") as React.ElementType;
  return (
    <Tag
      {...(wallet ? { to: "/wallets" } : {})}
      className={`group inline-flex items-center gap-6 rounded-full px-14 py-5 font-display text-lg font-bold transition-all hover:-translate-y-0.5 ${
        dark ? "bg-background text-foreground" : "bg-secondary text-secondary-foreground hover:bg-background hover:text-foreground"
      }`}
    >
      {label}
      <ChevronRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" strokeWidth={3} />
    </Tag>
  );
}

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between px-6 py-6 lg:px-20">
          <span className="font-display text-4xl font-extrabold">DAPP</span>
          <nav className="hidden rounded-full border border-border bg-background px-20 py-7 lg:flex lg:gap-14">
            {nav.map((n, i) => (
              <a key={n} href={`#${n.toLowerCase()}`} className={`font-display text-lg font-bold uppercase tracking-[0.2em] transition-colors hover:text-primary ${i === 0 ? "text-primary" : i === 3 ? "text-muted-foreground" : ""}`}>
                {n}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <button className="hidden items-center gap-4 rounded-full bg-secondary px-8 py-5 font-display text-lg font-bold text-secondary-foreground sm:flex">
              Connects <User className="h-5 w-5 fill-primary text-primary" />
            </button>
            <button aria-label="Menu" className="grid h-16 w-16 place-items-center rounded-full bg-primary text-foreground">
              <Menu className="h-6 w-6" strokeWidth={3} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="px-4 lg:px-7">
        <div className="relative mx-auto min-h-[880px] overflow-hidden rounded-b-[2rem] bg-teal-up pt-48 text-center">
          <h1 className="font-display text-6xl font-extrabold leading-tight tracking-tighter md:text-8xl">
            <span className="text-gradient">Fix Web3 Issues</span>
            <br />
            <span className="text-gradient-teal">in Seconds</span>
          </h1>
          <p className="mx-auto mt-12 max-w-2xl text-2xl font-medium leading-relaxed">
            your all-in-one tool for solving common Web3 problems.
            <br />
            Fast and stress-free.
          </p>
          <div className="mt-20 flex flex-wrap justify-center gap-14">
            <Pill label="Connect Wallet" wallet />
            <Pill label="Import Existing Wallet" dark wallet />
          </div>
          <img src={coins} alt="" width={1024} height={1024} className="animate-floaty absolute bottom-24 left-20 hidden w-72 lg:block" />
          <img src={shield} alt="" width={1024} height={1024} className="animate-floaty absolute bottom-40 right-40 hidden w-52 [animation-delay:1.5s] lg:block" />
          <ChevronsDown className="mx-auto mt-40 h-14 w-14 animate-bounce" strokeWidth={1.5} />
        </div>
      </section>

      {/* Partners */}
      <section className="relative pt-24">
        <img src={rocket} alt="" width={1024} height={1024} loading="lazy" className="animate-floaty absolute left-14 top-16 w-48" />
        <img src={wallet} alt="" width={1024} height={1024} loading="lazy" className="animate-floaty absolute right-40 top-16 w-44 [animation-delay:2s]" />
        <p className="pt-60 text-center font-display text-xl font-bold uppercase tracking-[0.15em]">
          <span className="mr-4 inline-block h-3 w-3 rounded-full bg-primary" />Our Top Partner<span className="ml-4 inline-block h-3 w-3 rounded-full bg-primary" />
        </p>
        <div className="mt-20 overflow-hidden border-y border-border py-14">
          <div className="animate-marquee flex w-max gap-28">
            {[...partners, ...partners, ...partners, ...partners].map((p, i) => (
              <span key={i} className="flex items-center gap-3 font-display text-4xl font-bold text-muted-foreground/70">
                {p === "GitHub" && <Github className="h-10 w-10" />}
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section id="feature" className="mx-auto max-w-[1760px] px-6 py-40 lg:px-24">
        <h2 className="text-gradient text-center font-display text-6xl font-extrabold tracking-tighter">Why Choose Us</h2>
        <div className="mt-24 grid gap-10 md:grid-cols-2">
          {why.map((w) => (
            <div key={w.t} className="flex items-center justify-between rounded-3xl border border-border bg-card p-16 transition-colors hover:border-primary/40">
              <div>
                <h3 className="font-display text-4xl font-extrabold tracking-tight">{w.t}</h3>
                <p className="mt-10 max-w-[260px] text-xl leading-relaxed text-muted-foreground">{w.d}</p>
              </div>
              <img src={w.img} alt="" width={1024} height={1024} loading="lazy" className="w-44" />
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="roadmap" className="px-4 lg:px-7">
        <div className="relative overflow-hidden rounded-[2rem]">
          <div className="relative bg-teal-down pb-40 pt-40 text-center">
            <div className="bg-orb absolute -right-10 top-[-160px] h-[640px] w-[640px] rotate-180 rounded-full opacity-90 lg:right-40" />
            <div className="bg-orb absolute left-[16%] top-[150px] h-80 w-80 rotate-[200deg] rounded-full" />
            <h2 className="relative font-display text-6xl font-extrabold leading-tight tracking-tighter md:text-8xl">
              <span className="text-gradient-teal">Features</span>
              <br />
              <span className="text-primary">What You Can Fix</span>
            </h2>
          </div>
          <div className="mx-auto h-px max-w-[1700px] bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="bg-teal-up flex flex-wrap justify-center gap-x-7 gap-y-5 px-6 pb-40 pt-64">
            {fixes.map((f) => (
              <Pill key={f} label={f} dark={f.startsWith("NFT")} />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile */}
      <section id="blog" className="mx-auto max-w-[1760px] px-6 py-24 lg:px-24">
        <div className="relative flex flex-col items-center justify-between overflow-hidden rounded-3xl border border-border bg-card px-12 pt-24 lg:flex-row lg:px-28">
          <div className="bg-orb absolute -bottom-32 left-16 h-72 w-72 rounded-full opacity-50" />
          <div className="relative pb-24">
            <h2 className="text-gradient font-display text-6xl font-extrabold leading-tight tracking-tighter">
              Control Application
              <br />
              From Your Mobile
            </h2>
            <p className="mt-16 text-2xl text-muted-foreground">Coming soon!</p>
            <div className="mt-6 flex flex-wrap gap-10">
              {[{ i: Apple, s: "Download on the", b: "App Store" }, { i: Play, s: "GET IT ON", b: "Google Play" }].map(({ i: I, s, b }) => (
                <a key={b} href="#" className="flex items-center gap-5 rounded-lg border-2 border-foreground/80 bg-background px-7 py-3">
                  <I className="h-11 w-11 fill-foreground" />
                  <span className="leading-tight"><span className="block text-sm">{s}</span><span className="text-3xl font-medium">{b}</span></span>
                </a>
              ))}
            </div>
          </div>
          <div className="relative h-[580px] w-[560px] self-end">
            <div className="bg-orb absolute right-0 top-0 h-[600px] w-[600px] rotate-[-30deg] rounded-full" />
            <div className="absolute bottom-0 left-16 h-[430px] w-56 rounded-t-[2.5rem] border-4 border-muted bg-background p-6">
              <p className="mt-6 text-xl font-semibold">Articles</p>
              <p className="mt-8 text-sm font-semibold">Ethereum sharing and people</p>
              <div className="mt-6 h-24 rounded-xl bg-muted" />
            </div>
            <div className="absolute bottom-0 right-6 h-[560px] w-[380px] rounded-t-[3rem] border-4 border-muted bg-background p-8">
              <p className="text-center text-3xl font-semibold">Statistic</p>
              <div className="mt-10 flex items-center justify-between">
                <div><p className="text-xl font-semibold">Ethereum</p><p className="text-muted-foreground">ETH</p></div>
                <div className="text-right"><p className="font-semibold">$14,582.00</p><p className="text-sm text-muted-foreground">+2.6%</p></div>
              </div>
              <div className="mt-8 flex justify-between text-sm font-semibold">
                {["1d", "1w", "1m", "3m", "6m", "1y"].map((t) => (
                  <span key={t} className={`rounded-md px-2 py-1 ${t === "1m" ? "bg-secondary text-secondary-foreground" : ""}`}>{t}</span>
                ))}
              </div>
              <svg viewBox="0 0 300 160" className="mt-8 w-full stroke-foreground" fill="none" strokeWidth="1.5">
                <polyline points="0,140 20,120 35,130 50,90 65,110 80,60 95,100 110,80 125,130 140,120 160,140 180,110 200,125 220,70 235,95 250,60 270,40 290,10" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-4 pb-24 pt-12 lg:px-7">
        <div className="relative overflow-hidden rounded-t-[2rem] bg-teal-down px-8 pb-24 pt-8 lg:px-20">
          <img src={mining} alt="" width={1024} height={1024} loading="lazy" className="animate-floaty absolute right-14 top-0 w-44" />
          <div className="bg-orb absolute -left-36 top-72 h-96 w-72 rounded-full" />
          <div className="bg-orb absolute bottom-80 right-24 h-32 w-32 rotate-180 rounded-full" />
          <h2 className="text-gradient relative text-center font-display text-6xl font-extrabold tracking-tighter">Have Any Questions?</h2>
          <div className="relative mt-24 flex h-72 max-w-xl items-center justify-center rounded-2xl border border-border bg-card p-10 text-center">
            <p className="font-display text-4xl font-bold leading-snug">Contact us via our livechat</p>
          </div>
          <h3 className="relative mt-40 font-display text-2xl font-bold uppercase tracking-wider">Subscribe Newsletter</h3>
          <form className="relative mt-10 flex max-w-md overflow-hidden rounded-xl bg-card" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Info@gmail.com" className="flex-1 bg-transparent px-6 py-7 text-xl outline-none placeholder:text-muted-foreground" />
            <button aria-label="Subscribe" className="grid w-24 place-items-center rounded-xl bg-secondary text-secondary-foreground">
              <Send className="h-8 w-8 fill-secondary-foreground" />
            </button>
          </form>
        </div>
      </section>

      {/* Chat widget */}
      <ChatWidget />
    </div>
  );
}
