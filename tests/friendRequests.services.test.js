import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../src/db/index.js", () => ({
  default: {
    query: vi.fn(),
    connect: vi.fn(),
  },
}));

vi.mock("../src/utils/user.utils.js", () => ({
  userIdExists: vi.fn(),
}));

import db from "../src/db/index.js";
import { userIdExists } from "../src/utils/user.utils.js";
import {
  friendRequest,
  unfriendRequest,
  unsendFriendRequest,
  rejectFriendRequest,
  friendRequestStatus,
  getAllIncomingFriendRequests,
} from "../src/services/friendRequests.services.js";

describe("friendRequests.services", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("friendRequest", () => {
    it("throws when receiver does not exist", async () => {
      userIdExists.mockResolvedValueOnce(false);
      await expect(friendRequest(1, 2)).rejects.toThrow("receiverId does not exist");
    });

    it("throws when trying to friend yourself", async () => {
      userIdExists.mockResolvedValueOnce(true);
      await expect(friendRequest(1, 1)).rejects.toThrow("Cannot friend yourself");
    });

    it("returns isFriend when friendship already exists", async () => {
      userIdExists.mockResolvedValueOnce(true);
      db.query.mockResolvedValueOnce({ rowCount: 1 });

      const result = await friendRequest(3, 4);
      expect(result).toEqual({ status: "isFriend" });
    });

    it("creates a friend request when none exists", async () => {
      userIdExists.mockResolvedValueOnce(true);
      db.query
        .mockResolvedValueOnce({ rowCount: 0 })
        .mockResolvedValueOnce({ rowCount: 0 })
        .mockResolvedValueOnce({ rowCount: 1 });

      const result = await friendRequest(3, 4);
      expect(result).toEqual({ status: "requestSuccess" });
    });
  });

  describe("unfriendRequest", () => {
    it("throws when receiver does not exist", async () => {
      userIdExists.mockResolvedValueOnce(false);
      await expect(unfriendRequest(1, 2)).rejects.toThrow("receiverId does not exist");
    });

    it("returns isNotFriend when no existing friendship exists", async () => {
      userIdExists.mockResolvedValueOnce(true);
      userIdExists.mockResolvedValueOnce(true);
      db.query.mockResolvedValueOnce({ rowCount: 0 });

      const result = await unfriendRequest(3, 4);
      expect(result).toEqual({ status: "isNotFriend" });
    });
  });

  describe("unsendFriendRequest", () => {
    it("throws when receiver does not exist", async () => {
      userIdExists.mockResolvedValueOnce(false);
      await expect(unsendFriendRequest(1, 2)).rejects.toThrow("receiverId does not exist");
    });

    it("throws when sender and receiver are the same", async () => {
      userIdExists.mockResolvedValueOnce(true);
      await expect(unsendFriendRequest(2, 2)).rejects.toThrow("Cannot unfriend yourself");
    });

    it("returns isNotFriend when deletion succeeds", async () => {
      userIdExists.mockResolvedValueOnce(true);
      db.query.mockResolvedValueOnce({ rowCount: 1 });
      const result = await unsendFriendRequest(3, 4);
      expect(result).toEqual({ status: "isNotFriend" });
    });
  });

  describe("rejectFriendRequest", () => {
    it("throws when sender does not exist", async () => {
      userIdExists.mockResolvedValueOnce(false);
      await expect(rejectFriendRequest(2, 1)).rejects.toThrow("senderId does not exist");
    });

    it("throws when rejecting your own request", async () => {
      userIdExists.mockResolvedValueOnce(true);
      await expect(rejectFriendRequest(2, 2)).rejects.toThrow("Cannot reject your own request");
    });

    it("returns Rejected when request exists", async () => {
      userIdExists.mockResolvedValueOnce(true);
      db.query.mockResolvedValueOnce({ rowCount: 1 });
      const result = await rejectFriendRequest(2, 1);
      expect(result).toEqual({ message: "Rejected" });
    });
  });

  describe("friendRequestStatus", () => {
    it("returns sameAccount when sender and receiver are the same", async () => {
      userIdExists.mockResolvedValue(true);
      const status = await friendRequestStatus(5, 5);
      expect(status).toEqual({ status: "sameAccount" });
    });

    it("returns isFriend when users are already friends", async () => {
      userIdExists.mockResolvedValue(true);
      db.query.mockResolvedValueOnce({ rowCount: 1 });
      const status = await friendRequestStatus(3, 4);
      expect(status).toEqual({ status: "isFriend" });
    });

    it("returns hasBeenRequested when the receiver already sent a request", async () => {
      userIdExists.mockResolvedValue(true);
      db.query
        .mockResolvedValueOnce({ rowCount: 0 })
        .mockResolvedValueOnce({ rowCount: 1 });

      const status = await friendRequestStatus(2, 7);
      expect(status).toEqual({ status: "hasBeenRequested" });
    });

    it("returns requestSuccess when the sender already sent a request", async () => {
      userIdExists.mockResolvedValue(true);
      db.query
        .mockResolvedValueOnce({ rowCount: 0 })
        .mockResolvedValueOnce({ rowCount: 0 })
        .mockResolvedValueOnce({ rowCount: 1 });

      const status = await friendRequestStatus(10, 9);
      expect(status).toEqual({ status: "requestSuccess" });
    });

    it("throws if receiver does not exist", async () => {
      userIdExists.mockResolvedValue(false);
      await expect(friendRequestStatus(1, 99)).rejects.toThrow("receiverId does not exist");
    });
  });

  describe("getAllIncomingFriendRequests", () => {
    it("returns incoming requests", async () => {
      db.query.mockResolvedValueOnce({ rows: [{ sender_id: 2, username: "bob" }] });
      const result = await getAllIncomingFriendRequests(1);
      expect(result).toEqual([{ sender_id: 2, username: "bob" }]);
    });
  });
});