import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import useLocalStorage from "./useLocalStorage";

describe("useLocalStorage Hook", () => {
    const { setLocalStorageItem, getLocalStorageItem, clearLocalStorageItem } = useLocalStorage();
  
    beforeEach(() => {
      vi.spyOn(Storage.prototype, "setItem");
      vi.spyOn(Storage.prototype, "getItem");
      vi.spyOn(Storage.prototype, "removeItem");
    });
  
    afterEach(() => {
      localStorage.clear();
      vi.restoreAllMocks();
    });
  
    test("should set and retrieve a string value", () => {
      setLocalStorageItem("username", "JohnDoe");
      expect(localStorage.setItem).toHaveBeenCalledWith("username", "JohnDoe");
  
      const result = getLocalStorageItem("username");
      expect(localStorage.getItem).toHaveBeenCalledWith("username");
      expect(result).toBe("JohnDoe");
    });
  
    test("should set and retrieve an object", () => {
      const user = { id: 1, name: "JohnDoe" };
      setLocalStorageItem("user", user);
      expect(localStorage.setItem).toHaveBeenCalledWith("user", JSON.stringify(user));
  
      const result = getLocalStorageItem("user");
      expect(localStorage.getItem).toHaveBeenCalledWith("user");
      expect(result).toEqual(user);
    });
  
    test("should return null for non-existing key", () => {
      const result = getLocalStorageItem("nonExistingKey");
      expect(localStorage.getItem).toHaveBeenCalledWith("nonExistingKey");
      expect(result).toBeNull();
    });
  
    test("should clear an item from local storage", () => {
      setLocalStorageItem("testItem", "testValue");
      expect(localStorage.setItem).toHaveBeenCalledWith("testItem", "testValue");
  
      clearLocalStorageItem("testItem");
      expect(localStorage.removeItem).toHaveBeenCalledWith("testItem");
      expect(getLocalStorageItem("testItem")).toBeNull();
    });
  
    test("should handle JSON parse errors gracefully", () => {
      localStorage.setItem("invalidJSON", "{invalid");
      const result = getLocalStorageItem("invalidJSON");
      expect(result).toBe("{invalid"); // Returns raw string when parsing fails
    });
});