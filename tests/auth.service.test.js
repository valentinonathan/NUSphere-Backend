import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";

vi.mock("../src/db/index.js", () => ({
  default: {
    query: vi.fn(),
  },
}));

vi.mock("bcrypt", () => ({
  default: {
    compare: vi.fn(),
    hash: vi.fn(),
  },
  hash: vi.fn(),
}));

vi.mock("jsonwebtoken", () => ({
  default: {
    sign: vi.fn(),
  },
}));

import db from "../src/db/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateUser, createAccount, editAccountDetails } from "../src/services/auth.service.js";

beforeAll(() => {
  process.env.JWT_PASSWORD = "test-secret";
});

beforeEach(() => {
  vi.resetAllMocks();
});

describe("auth.service", () => {
  describe("validateUser", () => {
    it("throws when username is not found", async () => {
      db.query.mockResolvedValueOnce({ rows: [] });

      await expect(validateUser("alice", "password")).rejects.toThrow("Username not found");
    });

    it("throws when password does not match", async () => {
      db.query.mockResolvedValueOnce({ rows: [{ id: 1, password_hash: "hash" }] });
      bcrypt.compare.mockResolvedValueOnce(false);

      await expect(validateUser("alice", "wrongpass")).rejects.toThrow("Password does not match");
    });

    it("returns a token when credentials are valid", async () => {
      db.query.mockResolvedValueOnce({ rows: [{ id: 1, password_hash: "hash" }] });
      bcrypt.compare.mockResolvedValueOnce(true);
      jwt.sign.mockReturnValueOnce("token-value");

      const token = await validateUser("alice", "password");

      expect(token).toBe("token-value");
      expect(jwt.sign).toHaveBeenCalledWith({ userId: 1 }, "test-secret");
    });
  });

  describe("createAccount", () => {
    it("throws when username is already used", async () => {
      db.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

      await expect(createAccount("A", "B", "alice", "pass")).rejects.toThrow("Username has been used");
    });

    it("throws when user insert does not succeed", async () => {
      db.query.mockResolvedValueOnce({ rows: [] });
      bcrypt.hash.mockResolvedValueOnce("hashed");
      db.query.mockResolvedValueOnce({ rowCount: 0 });

      await expect(createAccount("A", "B", "alice", "pass")).rejects.toThrow("Update unsuccessful!");
    });

    it("returns a token after successfully creating a new account", async () => {
      db.query.mockResolvedValueOnce({ rows: [] });
      bcrypt.hash.mockResolvedValueOnce("hashed");
      db.query.mockResolvedValueOnce({ rowCount: 1 });
      db.query.mockResolvedValueOnce({ rows: [{ id: 7 }] });
      jwt.sign.mockReturnValueOnce("token-created");

      const token = await createAccount("A", "B", "alice", "pass");

      expect(token).toBe("token-created");
      expect(jwt.sign).toHaveBeenCalledWith({ userId: 7 }, "test-secret");
    });
  });

  describe("editAccountDetails", () => {
    it("throws when update does not affect exactly one row", async () => {
      db.query.mockResolvedValueOnce({ rowCount: 0 });

      await expect(editAccountDetails({ Nationality: "SG", Year: "3", Faculty: "Engineering", Major: "CS", Residence: "HDB", Bio: "Hi" }, 1)).rejects.toThrow("Update unsuccessful!");
    });

    it("succeeds when update affects one row", async () => {
      db.query.mockResolvedValueOnce({ rowCount: 1 });

      await expect(editAccountDetails({ Nationality: "SG", Year: "3", Faculty: "Engineering", Major: "CS", Residence: "HDB", Bio: "Hi" }, 1)).resolves.toBeUndefined();
    });
  });
});