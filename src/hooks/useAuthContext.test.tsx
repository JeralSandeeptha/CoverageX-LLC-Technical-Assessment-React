import { renderHook } from "@testing-library/react";
import { act, ReactNode } from "react";
import { describe, expect, test, vi } from "vitest";
import useAuthContext from "./useAuthContext";
import { AuthContext } from "../context/authContext";
import { IToken } from "../types/interfaces.types";

describe("useAuthContext Hook", () => {
  const mockAuthContextValue = {
    token: { token: null }, 
    setToken: vi.fn<(value: IToken | null | ((prev: IToken | null) => IToken | null)) => void>(),
  };

  const wrapper = ({ children }: { children: ReactNode }) => (
    <AuthContext.Provider value={mockAuthContextValue}>{children}</AuthContext.Provider>
  );

  test("should return token from context", () => {
    const { result } = renderHook(() => useAuthContext(), { wrapper });
    expect(result.current.token).toEqual({ token: null }); 
  });

  test("should call setToken function", () => {
    const { result } = renderHook(() => useAuthContext(), { wrapper });

    act(() => {
      result.current.setToken({ token: { token: null } });
    });

    expect(mockAuthContextValue.setToken).toHaveBeenCalledWith({ token: { token: null } });
  });

  test("should throw an error if used outside of AuthProvider", () => {
    expect(() => renderHook(() => useAuthContext())).toThrow(
      "Auth context should be inside of Auth Provider!"
    );
  });
});
