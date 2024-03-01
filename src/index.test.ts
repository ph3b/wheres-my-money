import { UnstableDevWorker, unstable_dev } from "wrangler";

describe("Smoke test", () => {
  let worker: UnstableDevWorker;

  beforeAll(async () => {
    worker = await unstable_dev("./src/index.ts", {
      experimental: {
        disableExperimentalWarning: true,
      },
    });
  });

  it("Should return calculations", async () => {
    const resp = await worker.fetch("balance?salary=10000&payDayOfMonth=10");
    const body = (await resp.json()) as any;

    expect(resp.status).toBe(200);
    expect(body.balance).toBeDefined();
    expect(body.prDay).toBeDefined();
    expect(body.errors).toBeUndefined();
  });

  afterAll(() => worker.stop());
});
