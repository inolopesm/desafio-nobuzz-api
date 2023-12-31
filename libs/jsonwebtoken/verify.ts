import * as crypto from "node:crypto";
import * as SafeJSON from "../safe-json";

export function verify<T>(token: string, secret: string): T | Error {
  const [headerBase64, payloadBase64, signature] = token.split(".", 3) as [
    string,
    string | undefined,
    string | undefined,
  ];

  const headerText = Buffer.from(headerBase64, "base64url").toString("utf-8");
  const expectedHeader = '{"alg":"HS256","typ":"JWT"}';
  if (headerText !== expectedHeader) return new Error("Token not supported");

  if (payloadBase64 === undefined) return new Error("Invalid token");
  const payloadBuffer = Buffer.from(payloadBase64, "base64url");
  const payloadText = payloadBuffer.toString("utf8");
  const payloadObject = SafeJSON.parse<T>(payloadText);
  if (payloadObject === undefined) return new Error("Invalid token");

  if (signature === undefined) return new Error("signature is required");

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${headerBase64}.${payloadBase64}`)
    .digest("base64url");

  if (signature !== expectedSignature) return new Error("invalid signature");

  return payloadObject as T;
}
