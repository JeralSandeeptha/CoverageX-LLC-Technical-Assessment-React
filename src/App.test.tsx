import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component should be visible', () => {
    test('App component renders correctly', () => {
        render(<App />);
        const element = screen.getByText(/Welcome Back/);
        expect(element).toBeVisible();
    });
});