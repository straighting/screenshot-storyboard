import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type Msg = { id: number; from: "bot" | "me"; text: string };

const chips = ["I have a question", "Tell me more"];

const replies = [
  "Got it — a support agent will pick this up shortly.",
  "Thanks! You can describe the issue and I’ll point you to the right fix.",
  "Most issues here are solved in under 30 seconds. Which one are you seeing?",
  "No keys or passwords needed — tell me what happened and we’ll sort it.",
  "Noted. You can also pick one of the topics listed under “What You Can Fix”.",
];

export function ChatWidget() {
  const [open, setOpen] = useState(true);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const [messages, setMessages] = useState<Msg[]>([
    { id: 1, from: "bot", text: "👋 Hi! How can we help?" },
  ]);
  const listRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const replyIdx = useRef(0);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    setMessages((m) => [...m, { id: Date.now(), from: "me", text: value }]);
    setDraft("");
    setTyping(true);
    const reply = replies[replyIdx.current % replies.length] ?? "Thanks — we’ll get back to you shortly.";
    replyIdx.current += 1;
    const t = window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: Date.now() + 1, from: "bot", text: reply }]);
      setOpen((isOpen) => {
        if (!isOpen) setUnread((u) => u + 1);
        return isOpen;
      });
    }, 900);
    timers.current.push(t);
  };

  const toggle = () => {
    setOpen((o) => {
      if (!o) setUnread(0);
      return !o;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[30rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center gap-3 bg-secondary px-4 py-3 text-secondary-foreground">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-chat text-foreground">
              <MessageCircle className="h-5 w-5 fill-foreground" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-lg font-bold leading-tight">DAPP Support</span>
              <span className="flex items-center gap-1.5 text-xs opacity-70">
                <span className="h-2 w-2 rounded-full bg-chat" />
                Online — replies instantly
              </span>
            </span>
            <button
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-background/10 transition-colors hover:bg-background/20"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={listRef} className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.from === "me"
                    ? "self-end rounded-br-sm bg-chat text-foreground"
                    : "self-start rounded-bl-sm bg-secondary text-secondary-foreground"
                }`}
              >
                {m.text}
              </div>
            ))}
            {typing && (
              <div className="flex w-16 items-center justify-center gap-1 self-start rounded-xl rounded-bl-sm bg-secondary px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-secondary-foreground"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {chips.map((c) => (
              <button
                key={c}
                onClick={() => send(c)}
                className="rounded-lg border border-chat px-3 py-1.5 text-xs text-accent transition-colors hover:bg-chat hover:text-foreground"
              >
                {c}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
            className="flex items-center gap-2 border-t border-border px-4 py-3"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message…"
              aria-label="Message"
              className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!draft.trim()}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-chat text-foreground transition-opacity disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <button
        aria-label={open ? "Minimise chat" : "Open chat"}
        onClick={toggle}
        className="relative grid h-20 w-20 place-items-center rounded-full bg-chat text-foreground shadow-lg"
      >
        <MessageCircle className="h-9 w-9 fill-foreground" />
        {!open && unread > 0 && (
          <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-destructive text-xs font-bold">
            {unread}
          </span>
        )}
      </button>
    </div>
  );
}
