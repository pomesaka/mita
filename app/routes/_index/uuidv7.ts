export function generateUUIDv7(): string {
  const timestamp = Date.now(); // 現在のタイムスタンプ
  const randomHex = (Math.random() * 0xffffffffffffffff)
    .toString(16)
    .padStart(16, "0");

  return `${timestamp.toString(16).padStart(13, "0")}${randomHex}`;
}
