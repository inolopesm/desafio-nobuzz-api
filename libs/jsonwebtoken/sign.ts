import * as crypto from "node:crypto";

export function sign(payload: unknown, secret: string): string {
  const header = { alg: "HS256", typ: "JWT" };
  const stringifiedHeader = JSON.stringify(header);
  const headerBase64 = Buffer.from(stringifiedHeader).toString("base64url");

  const stringifiedPayload = JSON.stringify(payload);
  const payloadBase64 = Buffer.from(stringifiedPayload).toString("base64url");

  const data = `${headerBase64}.${payloadBase64}`;

  const signature = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("base64url");

  return `${data}.${signature}`;
}
