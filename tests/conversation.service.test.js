import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../src/db/index.js", () => ({
  default: {
    query: vi.fn(),
    connect: vi.fn(),
  },
}));

import db from "../src/db/index.js";
import {
  getOrCreateConversation,
  createConversationAndMessage,
  getConversationsByUserId,
  getMessagesByConversation,
  createMessage,
  isUserInConversation,
} from "../src/services/conversation.service.js";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("conversation.service", () => {
  it("throws when sender or receiver is invalid", async () => {
    await expect(getOrCreateConversation("x", 2)).rejects.toThrow("Invalid sender or receiver id");
  });

  it("throws when sender and receiver are the same", async () => {
    await expect(getOrCreateConversation(1, 1)).rejects.toThrow("You cannot start a conversation with yourself");
  });

  it("throws when receiver does not exist", async () => {
    const client = { query: vi.fn(), release: vi.fn() };
    db.connect.mockResolvedValueOnce(client);
    client.query.mockResolvedValueOnce({});
    client.query.mockResolvedValueOnce({ rowCount: 0, rows: [] });

    await expect(getOrCreateConversation(1, 2)).rejects.toThrow("Receiver not found");
    expect(client.query).toHaveBeenCalledWith(expect.stringContaining("BEGIN"));
  });

  it("returns an existing conversation when one already exists", async () => {
    const existing = { id: 10, type: "direct", created_by: 1 };
    const client = { query: vi.fn(), release: vi.fn() };
    db.connect.mockResolvedValueOnce(client);
    client.query.mockResolvedValueOnce({});
    client.query.mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 2 }] });
    client.query.mockResolvedValueOnce({ rowCount: 1, rows: [existing] });
    client.query.mockResolvedValueOnce({});

    const conversation = await getOrCreateConversation(1, 2);
    expect(conversation).toEqual(existing);
  });

  it("returns a conversation and message list when creating a conversation with initial message", async () => {
    const existing = { id: 10, type: "direct", created_by: 1 };
    const client = { query: vi.fn(), release: vi.fn() };
    db.connect.mockResolvedValueOnce(client);
    client.query.mockResolvedValueOnce({});
    client.query.mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 2 }] });
    client.query.mockResolvedValueOnce({ rowCount: 1, rows: [existing] });
    client.query.mockResolvedValueOnce({});

    db.query
      .mockResolvedValueOnce({ rowCount: 1 })
      .mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 20, sender_id: 1, content: "hi" }] })
      .mockResolvedValueOnce({ rowCount: 1 })
      .mockResolvedValueOnce({ rows: [{ id: 20, sender_id: 1, content: "hi" }] });

    const result = await createConversationAndMessage(1, 2, "hi");
    expect(result.conversation).toEqual(existing);
    expect(result.createdMessage).toEqual({ id: 20, sender_id: 1, content: "hi" });
    expect(result.messages).toEqual([{ id: 20, sender_id: 1, content: "hi" }]);
  });

  it("returns conversation rows for getConversationsByUserId", async () => {
    db.query.mockResolvedValueOnce({ rows: [{ conversation_id: 1, other_username: "bob" }], rowCount: 1 });
    const rows = await getConversationsByUserId(1);
    expect(rows).toEqual([{ conversation_id: 1, other_username: "bob" }]);
  });

  it("throws when getMessagesByConversation access is denied", async () => {
    db.query.mockResolvedValueOnce({ rowCount: 0 });
    await expect(getMessagesByConversation(1, 100)).rejects.toThrow("Access denied");
  });

  it("returns messages when getMessagesByConversation succeeds", async () => {
    db.query.mockResolvedValueOnce({ rowCount: 1 });
    db.query.mockResolvedValueOnce({ rows: [{ id: 5, content: "hey" }], rowCount: 1 });
    const messages = await getMessagesByConversation(1, 100);
    expect(messages).toEqual([{ id: 5, content: "hey" }]);
  });

  it("throws when createMessage access is denied", async () => {
    db.query.mockResolvedValueOnce({ rowCount: 0 });
    await expect(createMessage(1, 100, "hi")).rejects.toThrow("Access denied");
  });

  it("creates a message when user is in the conversation", async () => {
    db.query.mockResolvedValueOnce({ rowCount: 1 });
    db.query.mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 10, sender_id: 1, content: "hi" }] });
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