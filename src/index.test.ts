import { test, expect } from "vitest";
import { SELF as worker } from "cloudflare:test";
import "./index";

test("Run integration smoke test", async () => {
  const response = await worker.fetch(
    "http://example.com/wmm/balance?salary=10000&payDayOfMonth=10"
  );
  const body = (await response.json()) as any;

  expect(response.status).toBe(200);
  expect(body.balance).toBeDefined();
  expect(body.prDay).toBeDefined();
  expect(body.errors).toBeUndefined();
});
