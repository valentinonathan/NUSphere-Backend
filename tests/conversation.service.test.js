import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../src/db/index.js", () => ({
  default: {
    query: vi.fn(),
  },
}));

import db from "../src/db/index.js";
import {
  getOrCreateConversation,
  getMessages,
  createMessage,
  isUserInConversation,
} from "../src/services/conversation.service.js";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("conversation.service", () => {
  it("throws when sender and receiver are the same", async () => {
    await expect(getOrCreateConversation(1, 1)).rejects.toThrow("Can not create conversation with yourself");
  });

  it("returns an existing conversation with its messages", async () => {
    db.query
      .mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 10 }] })
      .mockResolvedValueOnce({ rows: [{ id: 5, content: "hi" }] });

    const conversation = await getOrCreateConversation(1, 2);

    expect(conversation).toEqual({
      myUserId: 1,
      conversationId: 10,
      messages: [{ id: 5, content: "hi" }],
    });
  });

  it("creates a new conversation when none exists", async () => {
    db.query
      .mockResolvedValueOnce({ rowCount: 0, rows: [] })
      .mockResolvedValueOnce({ rows: [{ id: 99 }] })
      .mockResolvedValueOnce({ rows: [{ id: 7, content: "hello" }] });

    const conversation = await getOrCreateConversation(2, 1);

    expect(conversation).toEqual({
      myUserId: 2,
      conversationId: 99,
      messages: [{ id: 7, content: "hello" }],
    });
  });

  it("returns message rows for a conversation", async () => {
    db.query.mockResolvedValueOnce({ rows: [{ id: 5, content: "hey" }] });

    const messages = await getMessages(100);

    expect(messages).toEqual({ messages: [{ id: 5, content: "hey" }] });
  });

  it("creates a message and returns it", async () => {
    db.query.mockResolvedValueOnce({ rows: [{ id: 10, sender_id: 1, content: "hi" }] });

    const message = await createMessage(1, 100, "hi");

    expect(message).toEqual({ id: 10, sender_id: 1, content: "hi" });
  });

  it("returns true when user is in a conversation", async () => {
    db.query.mockResolvedValueOnce({ rowCount: 1 });

    expect(await isUserInConversation(1, 100)).toBe(true);
  });

  it("returns false when user is not in a conversation", async () => {
    db.query.mockResolvedValueOnce({ rowCount: 0 });

    expect(await isUserInConversation(1, 100)).toBe(false);
  });
});