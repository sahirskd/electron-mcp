import { readFile } from "node:fs/promises";

interface UserData {
  prop: string;
}

async function getUserData(): Promise<UserData> {
  const text = await readFile(
    "path to file",
    {
      encoding: "utf8",
    }
  );
  return JSON.parse(text);
}

export { getUserData };

// test IPC method in electron js
