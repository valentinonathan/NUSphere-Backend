import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../src/db/index.js", () => ({
  default: {
    query: vi.fn(),
  },
}));

import db from "../src/db/index.js";
import { getEvent, getIndividualEvent, createEvent } from "../src/services/event.service.js";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("event.service", () => {
  it("returns event rows from getEvent", async () => {
    db.query.mockResolvedValueOnce({ rows: [{ id: 1 }], rowCount: 1 });

    const result = await getEvent();

    expect(result).toEqual([{ id: 1 }]);
  });

  it("returns a single event from getIndividualEvent", async () => {
    db.query.mockResolvedValueOnce({ rows: [{ id: 2, title: "Test" }], rowCount: 1 });

    const result = await getIndividualEvent(2);

    expect(result).toEqual({ id: 2, title: "Test" });
  });

  it("throws when createEvent does not insert a row", async () => {
    db.query.mockResolvedValueOnce({ rowCount: 0 });

    await expect(createEvent(1, "T", "D", "L", "2026-01-01", "url")).rejects.toThrow("Update unsuccessful!");
  });

  it("succeeds when createEvent inserts a row", async () => {
    db.query.mockResolvedValueOnce({ rowCount: 1 });

    await expect(createEvent(1, "T", "D", "L", "2026-01-01", "url")).resolves.toBeUndefined();
  });
});