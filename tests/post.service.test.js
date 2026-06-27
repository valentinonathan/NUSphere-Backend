import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../src/db/index.js", () => ({
  default: {
    query: vi.fn(),
  },
}));

vi.mock("../src/utils/post.ustils.js", () => ({
  postIdExists: vi.fn(),
}));

vi.mock("../src/utils/user.utils.js", () => ({
  userIdExists: vi.fn(),
  usernameExists: vi.fn(),
}));

import db from "../src/db/index.js";
import { postIdExists } from "../src/utils/post.ustils.js";
import { userIdExists, usernameExists } from "../src/utils/user.utils.js";
import {
  getPostsByUserId,
  getPostsByUsername,
  getPostById,
  likePostById,
  unlikePostById,
  hasLiked,
  createPost,
  updateNewPostUser,
  feedRequest,
} from "../src/services/post.service.js";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("post.service", () => {
  it("throws when getPostsByUserId user does not exist", async () => {
    userIdExists.mockResolvedValueOnce(false);

    await expect(getPostsByUserId(5)).rejects.toThrow("UserId does not exist");
  });

  it("returns posts when getPostsByUserId succeeds", async () => {
    userIdExists.mockResolvedValueOnce(true);
    db.query.mockResolvedValueOnce({ rows: [{ id: 1 }], rowCount: 1 });

    const result = await getPostsByUserId(5);
    expect(result).toEqual({ posts: [{ id: 1 }], count: 1 });
  });

  it("throws when getPostsByUsername does not exist", async () => {
    usernameExists.mockResolvedValueOnce(false);
    await expect(getPostsByUsername("alice")).rejects.toThrow("Username does not exist");
  });

  it("returns posts when getPostsByUsername succeeds", async () => {
    usernameExists.mockResolvedValueOnce(true);
    db.query.mockResolvedValueOnce({ rows: [{ id: 1 }], rowCount: 1 });

    const result = await getPostsByUsername("alice");
    expect(result).toEqual({ posts: [{ id: 1 }], count: 1 });
  });

  it("throws when getPostById is not found", async () => {
    db.query.mockResolvedValueOnce({ rowCount: 0, rows: [] });
    await expect(getPostById(9)).rejects.toThrow("Post not found");
  });

  it("returns a post when getPostById succeeds", async () => {
    db.query.mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 9, username: "alice" }] });
    expect(await getPostById(9)).toEqual({ id: 9, username: "alice" });
  });

  it("throws when likePostById receives invalid post", async () => {
    postIdExists.mockResolvedValueOnce(false);
    await expect(likePostById(1, 2)).rejects.toThrow("Post Id does not exist");
  });

  it("likes a post successfully", async () => {
    postIdExists.mockResolvedValueOnce(true);
    db.query.mockResolvedValueOnce({ rowCount: 1 });
    db.query.mockResolvedValueOnce({ rowCount: 1 });

    await expect(likePostById(1, 2)).resolves.toBeUndefined();
  });

  it("throws when unlikePostById receives invalid post", async () => {
    postIdExists.mockResolvedValueOnce(false);
    await expect(unlikePostById(1, 2)).rejects.toThrow("Post Id does not exist");
  });

  it("unlikes a post successfully", async () => {
    postIdExists.mockResolvedValueOnce(true);
    db.query.mockResolvedValueOnce({ rowCount: 1 });
    db.query.mockResolvedValueOnce({ rowCount: 1 });

    await expect(unlikePostById(1, 2)).resolves.toBeUndefined();
  });

  it("returns false when hasLiked is false", async () => {
    postIdExists.mockResolvedValueOnce(true);
    db.query.mockResolvedValueOnce({ rowCount: 0 });

    expect(await hasLiked(1, 2)).toBe(false);
  });

  it("returns true when hasLiked is true", async () => {
    postIdExists.mockResolvedValueOnce(true);
    db.query.mockResolvedValueOnce({ rowCount: 1 });

    expect(await hasLiked(1, 2)).toBe(true);
  });

  it("creates a post successfully", async () => {
    db.query.mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 8, user_id: 1, url: "u", caption: "c" }] });

    const result = await createPost(1, "u", "c");
    expect(result).toEqual({ postId: 8, post: { id: 8, user_id: 1, url: "u", caption: "c" } });
  });

  it("throws when updateNewPostUser receives invalid user", async () => {
    userIdExists.mockResolvedValueOnce(false);
    await expect(updateNewPostUser(5, 7)).rejects.toThrow("User Id does not exist");
  });

  it("succeeds updateNewPostUser for valid user", async () => {
    userIdExists.mockResolvedValueOnce(true);
    db.query.mockResolvedValueOnce({ rowCount: 1 });
    await expect(updateNewPostUser(5, 7)).resolves.toBeUndefined();
  });

  it("returns feed results for page 2", async () => {
    userIdExists.mockResolvedValueOnce(true);
    db.query.mockResolvedValueOnce({ rowCount: 2, rows: [{ id: 1 }, { id: 2 }] });

    const result = await feedRequest(1, 2);
    expect(result).toEqual({ posts: [{ id: 1 }, { id: 2 }], page: 2, total: 2 });
  });

  it("returns feed results for page 1 and prepends new post when available", async () => {
    userIdExists.mockResolvedValueOnce(true);
    db.query
      .mockResolvedValueOnce({ rowCount: 2, rows: [{ id: 1 }, { id: 2 }] })
      .mockResolvedValueOnce({ rows: [{ new_post: 9 }] })
      .mockResolvedValueOnce({ rows: [{ id: 9, created_at: "now" }] })
      .mockResolvedValueOnce({});

    const result = await feedRequest(1, 1);
    expect(result.posts[0]).toEqual({ id: 9, created_at: "now" });
    expect(result.page).toBe(1);
    expect(result.total).toBe(2);
  });
});