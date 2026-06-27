import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../src/db/index.js", () => ({
  default: {
    query: vi.fn(),
  },
}));

vi.mock("../src/utils/event.utils.js", () => ({
  eventIdExists: vi.fn(),
}));

vi.mock("../src/utils/user.utils.js", () => ({
  userIdExists: vi.fn(),
}));

import db from "../src/db/index.js";
import { eventIdExists } from "../src/utils/event.utils.js";
import { userIdExists } from "../src/utils/user.utils.js";
import { getEventAttendance, createEventAttendance, deleteEventAttendance } from "../src/services/event.attendance.service.js";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("event.attendance.service", () => {
  it("returns attendance info when event exists", async () => {
    eventIdExists.mockResolvedValueOnce(true);
    db.query.mockResolvedValueOnce({ rows: [{ id: 1, username: "alice" }], rowCount: 1 });

    const result = await getEventAttendance(2, 1);

    expect(result).toEqual({ containUser: false, rows: [{ id: 1, username: "alice" }], count: 1 });
  });

  it("throws when createEventAttendance user does not exist", async () => {
    userIdExists.mockResolvedValueOnce(false);

    await expect(createEventAttendance(1, 2)).rejects.toThrow("UserId does not exist");
  });

  it("throws when createEventAttendance event does not exist", async () => {
    userIdExists.mockResolvedValueOnce(true);
    eventIdExists.mockResolvedValueOnce(false);

    await expect(createEventAttendance(1, 2)).rejects.toThrow("EventId does not exist");
  });

  it("throws when createEventAttendance is duplicated", async () => {
    userIdExists.mockResolvedValueOnce(true);
    eventIdExists.mockResolvedValueOnce(true);
    db.query.mockResolvedValueOnce({ rowCount: 0 });

    await expect(createEventAttendance(1, 2)).rejects.toThrow("User already attend the event");
  });

  it("succeeds when createEventAttendance inserts a row", async () => {
    userIdExists.mockResolvedValueOnce(true);
    eventIdExists.mockResolvedValueOnce(true);
    db.query.mockResolvedValueOnce({ rowCount: 1 });

    await expect(createEventAttendance(1, 2)).resolves.toBeUndefined();
  });

  it("throws when deleteEventAttendance user does not exist", async () => {
    userIdExists.mockResolvedValueOnce(false);

    await expect(deleteEventAttendance(1, 2)).rejects.toThrow("UserId does not exist");
  });

  it("throws when deleteEventAttendance event does not exist", async () => {
    userIdExists.mockResolvedValueOnce(true);
    eventIdExists.mockResolvedValueOnce(false);

    await expect(deleteEventAttendance(1, 2)).rejects.toThrow("EventId does not exist");
  });

  it("throws when deleteEventAttendance is not found", async () => {
    userIdExists.mockResolvedValueOnce(true);
    eventIdExists.mockResolvedValueOnce(true);
    db.query.mockResolvedValueOnce({ rowCount: 0 });

    await expect(deleteEventAttendance(1, 2)).rejects.toThrow("User is not attending this event");
  });

  it("succeeds when deleteEventAttendance removes the event attendance", async () => {
    userIdExists.mockResolvedValueOnce(true);
    eventIdExists.mockResolvedValueOnce(true);
    db.query.mockResolvedValueOnce({ rowCount: 1 });

    await expect(deleteEventAttendance(1, 2)).resolves.toBeUndefined();
  });
});