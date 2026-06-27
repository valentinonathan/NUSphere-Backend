import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../src/db/index.js", () => ({
  default: {
    query: vi.fn(),
  },
}));

vi.mock("../src/utils/post.ustils.js", () => ({
  postIdExists: vi.fn(),
}));

import db from "../src/db/index.js";
import { postIdExists } from "../src/utils/post.ustils.js";
import { getCommentByPostId, postCommentByPostId } from "../src/services/comment.service.js";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("comment.service", () => {
  describe("getCommentByPostId", () => {
    it("throws when post does not exist", async () => {
      postIdExists.mockResolvedValueOnce(false);

      await expect(getCommentByPostId(5)).rejects.toThrow("Post Id does not exist");
    });

    it("returns comments and count when post exists", async () => {
      postIdExists.mockResolvedValueOnce(true);
      db.query.mockResolvedValueOnce({ rows: [{ id: 1, content: "hi" }], rowCount: 1 });

      const result = await getCommentByPostId(5);

      expect(result).toEqual({ comments: [{ id: 1, content: "hi" }], count: 1 });
    });
  });

  describe("postCommentByPostId", () => {
    it("throws when post does not exist", async () => {
      postIdExists.mockResolvedValueOnce(false);

      await expect(postCommentByPostId(5, 2, "hello")).rejects.toThrow("Post Id does not exist");
    });

    it("throws when comment insert fails", async () => {
      postIdExists.mockResolvedValueOnce(true);
      db.query.mockResolvedValueOnce({ rowCount: 0 });

      await expect(postCommentByPostId(5, 2, "hello")).rejects.toThrow("Post comment failed");
    });

    it("throws when comment count increment fails and rolls back", async () => {
      postIdExists.mockResolvedValueOnce(true);
      db.query
        .mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 10, post_id: 5, user_id: 2, content: "hello" }] })
        .mockRejectedValueOnce(new Error("update failed"))
        .mockResolvedValueOnce({});

      await expect(postCommentByPostId(5, 2, "hello")).rejects.toThrow("Post comment unsuccessful");
      expect(db.query).toHaveBeenCalledWith("DELETE FROM comments WHERE id = $1", [10]);
    });

    it("returns the created comment with user name data", async () => {
      postIdExists.mockResolvedValueOnce(true);
      db.query
        .mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 10, post_id: 5, user_id: 2, content: "hello" }] })
        .mockResolvedValueOnce({ rowCount: 1 })
        .mockResolvedValueOnce({ rows: [{ first_name: "Alice", last_name: "Smith" }] });

      const result = await postCommentByPostId(5, 2, "hello");

      expect(result).toEqual({ id: 10, post_id: 5, user_id: 2, content: "hello", first_name: "Alice", last_name: "Smith" });
    });
  });
});