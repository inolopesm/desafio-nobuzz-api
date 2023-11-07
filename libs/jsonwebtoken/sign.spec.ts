import { describe, it } from "node:test";
import * as assert from "node:assert";
import { sign } from "./sign";

describe("sign", () => {
  it("should generate a valid JWT token", () => {
    assert.strictEqual(
      sign({ some: "data" }, "cg3dcxwaakw"),
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb21lIjoiZGF0YSJ9.oniWcnlDiFAYZvxgTOaKhMg20TueokBjPfOf8ElagwU"
    );
  });
});
