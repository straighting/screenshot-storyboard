import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ChatWidget } from "@/components/ChatWidget";

// The panel is a browser-only demo: typed messages stay in the page and are
// answered from canned replies, so no server call is expected here.
describe("Chat widget", () => {
  it("adds the typed message to the conversation and shows a support reply", async () => {
    render(<ChatWidget />);

    fireEvent.change(screen.getByRole("textbox", { name: "Message" }), {
      target: { value: "I cannot connect my wallet" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));

    expect(screen.getByText("I cannot connect my wallet")).toBeInTheDocument();
    expect(
      await screen.findByText("Got it — a support agent will pick this up shortly.", undefined, {
        timeout: 2500,
      }),
    ).toBeInTheDocument();
  });

  it("closes the panel and reopens it with the conversation kept", () => {
    render(<ChatWidget />);

    fireEvent.change(screen.getByRole("textbox", { name: "Message" }), {
      target: { value: "My withdrawal is stuck" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));

    fireEvent.click(screen.getByRole("button", { name: "Close chat" }));
    expect(screen.queryByRole("textbox", { name: "Message" })).toBeNull();
    expect(screen.getByRole("button", { name: "Open chat" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Open chat" }));
    expect(screen.getByRole("textbox", { name: "Message" })).toBeInTheDocument();
    expect(screen.getByText("My withdrawal is stuck")).toBeInTheDocument();
  });
});
