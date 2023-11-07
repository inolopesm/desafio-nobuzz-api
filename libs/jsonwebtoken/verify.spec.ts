import * as assert from "node:assert";
import { describe, it } from "node:test";
import { verify } from "./verify";

const secret = "cg3dcxwaakw";
const payload = { some: "data" };

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb21lIjoiZGF0YSJ9.oniWcnlDiFAYZvxgTOaKhMg20TueokBjPfOf8ElagwU";

describe("verify", () => {
  it("should verify a valid JWT token", () => {
    const result = verify(token, secret);
    assert.deepStrictEqual(result, payload);
  });

  it("should return an error for an invalid token", () => {
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
    const result = verify(invalidToken, secret);
    assert.deepStrictEqual(result, new Error("Invalid token"));
  });

  it("should return an error if the token is not supported", () => {
    const rs256Token =
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzQ1LCJ1c2VybmFtZSI6ImpvaG5fZG9lIiwicm9sZSI6InVzZXIifQ";

    const result = verify(rs256Token, secret);
    assert.deepStrictEqual(result, new Error("Token not supported"));
  });

  it("should return an error if the payload is not a valid JSON", () => {
    const invalidToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb21lIjoiZGF0YSI.VtwZNA-YBHjP562CY-7Eu2raNPF2SqUBDERNNGii0eA";

    const result = verify(invalidToken, secret);
    assert.deepStrictEqual(result, new Error("Invalid token"));
  });

  it("should return an error if the signature is missing", () => {
    const invalidToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb21lIjoiZGF0YSJ9";

    const result = verify(invalidToken, secret);
    assert.deepStrictEqual(result, new Error("signature is required"));
  });

  it("should return an error if the signature is invalid", () => {
    const invalidToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb21lIjoiZGF0YSJ9.AYVBp6Qj_qMtYw2AAFiBhvwk3xkJ1ophA4Peqyb2whE";

    const result = verify(invalidToken, secret);
    assert.deepStrictEqual(result, new Error("invalid signature"));
  });
});
