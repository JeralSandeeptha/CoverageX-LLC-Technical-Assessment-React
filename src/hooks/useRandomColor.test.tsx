import { renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import useRandomColor from "./useRandomColor";
import { act } from "react";

describe('useRandomColor Hook', () => {

    const colors: string[] = [
        'red',
        'blue',
        'green',
        'yellow',
        'pink',
    ];

    test('Should have 5 default colors ', () => {
        expect(colors.length).toEqual(5);
    });
    test('Default colors should be available', () => {
        expect(colors).toEqual(colors);
    });
    test('Default colors should array', () => {
        expect(colors).toBeInstanceOf(Array);
    });
    test("should initialize with an empty string as the randomColor", () => {
        const { result } = renderHook(() => useRandomColor());
        expect(result.current.randomColor).toBe("");
    });
    test('Get random color should works correctly', () => {
        const { result } = renderHook(() => useRandomColor());
        const randomColor = result.current.getRandomColor();
        
        const colors = ["red", "blue", "green", "yellow", "pink"];
        expect(colors).toContain(randomColor);
    });
    test("setRandomColor should update the state", () => {
        const { result } = renderHook(() => useRandomColor());
    
        act(() => {
          result.current.setRandomColor("blue");
        });
    
        expect(result.current.randomColor).toBe("blue");
    });
});