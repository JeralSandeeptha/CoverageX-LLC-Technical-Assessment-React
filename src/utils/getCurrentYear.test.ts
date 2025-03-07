import { expect, test, vi } from "vitest";
import { getCurrentYear } from "./getCurrentYear";

test("Get current year works correctly", () => {
  const mockYear = 2025; // Mock year for testing

  // Mock Date object
  vi.useFakeTimers();
  vi.setSystemTime(new Date(`${mockYear}-01-01`));

  expect(getCurrentYear()).toBe(mockYear);

  // Restore real timers after the test
  vi.useRealTimers();
});
