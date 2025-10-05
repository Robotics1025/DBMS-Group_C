// lib/serializer.ts
/**
 * Generic serializer for JSON objects that may contain BigInt values.
 * Converts all BigInt values to strings automatically.
 */

export function serializeBigInt(obj: any) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => (typeof value === "bigint" ? value.toString() : value))
  );
}
