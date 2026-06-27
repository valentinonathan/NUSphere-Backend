import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../src/db/index.js", () => ({
  default: {
    query: vi.fn(),
  },
}));

import db from "../src/db/index.js";
import { getUserDetailsByUsername, getUserDetailsByUserId, processQueryUserToDbQuery, getUserByQuery } from "../src/services/user.service.js";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("user.service", () => {
  describe("getUserDetailsByUsername", () => {
    it("throws when username is not found", async () => {
      db.query.mockResolvedValueOnce({ rowCount: 0, rows: [] });
      await expect(getUserDetailsByUsername("alice")).rejects.toThrow("Username not found");
    });

    it("returns user details when found", async () => {
      db.query.mockResolvedValueOnce({
        rowCount: 1,
        rows: [{ id: 1, first_name: "Alice", last_name: "Smith", nationality: "SG", year: "3", faculty: "Engineering", major: "CS", residence: "HDB", bio: "Hi", friends: 5 }],
      });

      const result = await getUserDetailsByUsername("alice");
      expect(result).toEqual({
        id: 1,
        username: "alice",
        firstName: "Alice",
        lastName: "Smith",
        nationality: "SG",
        year: "3",
        faculty: "Engineering",
        major: "CS",
        residence: "HDB",
        bio: "Hi",
        friends: 5,
      });
    });
  });

  describe("getUserDetailsByUserId", () => {
    it("throws when user id is not found", async () => {
      db.query.mockResolvedValueOnce({ rowCount: 0, rows: [] });
      await expect(getUserDetailsByUserId(1)).rejects.toThrow("UserId not found");
    });

    it("returns user details when found", async () => {
      db.query.mockResolvedValueOnce({
        rowCount: 1,
        rows: [{ id: 1, username: "alice", first_name: "Alice", last_name: "Smith", nationality: "SG", year: "3", faculty: "Engineering", major: "CS", residence: "HDB", bio: "Hi", friends: 5 }],
      });

      const result = await getUserDetailsByUserId(1);
      expect(result).toEqual({
        id: 1,
        username: "alice",
        firstName: "Alice",
        lastName: "Smith",
        nationality: "SG",
        year: "3",
        faculty: "Engineering",
        major: "CS",
        residence: "HDB",
        bio: "Hi",
        friends: 5,
      });
    });
  });

  describe("processQueryUserToDbQuery", () => {
    it("builds a strict query for one filter", () => {
      const query = processQueryUserToDbQuery(["year"], ["2024"], true);
      expect(query).toBe(
        "SELECT id, username, first_name, last_name, nationality, year, faculty, major, residence, bio, friends FROM users WHERE year = ANY(ARRAY['2024'])"
      );
    });

    it("builds a non-strict query with multiple filters", () => {
      const query = processQueryUserToDbQuery(["year", "major"], ["2024", "CS"], false);
      expect(query).toContain("year = ANY(ARRAY['2024'])");
      expect(query).toContain("major = ANY(ARRAY['CS'])");
      expect(query).toContain("ORDER BY CASE WHEN");
    });

    it("ignores empty and undefined query values", () => {
      const query = processQueryUserToDbQuery(["year", "major", "faculty"], ["", undefined, "Engineering"], true);
      expect(query).toBe(
        "SELECT id, username, first_name, last_name, nationality, year, faculty, major, residence, bio, friends FROM users WHERE faculty = ANY(ARRAY['Engineering'])"
      );
    });
  });

  describe("getUserByQuery", () => {
    it("adds limit and offset and returns query results", async () => {
      db.query.mockResolvedValueOnce({ rows: [{ id: 1 }], rowCount: 1 });
      const result = await getUserByQuery("SELECT * FROM users", 2);
      expect(result).toEqual({ message: "Query successful", users: [{ id: 1 }], page: 2, total: 1 });
      expect(db.query).toHaveBeenCalledWith("SELECT * FROM users LIMIT 20 OFFSET 20");
    });
  });
});