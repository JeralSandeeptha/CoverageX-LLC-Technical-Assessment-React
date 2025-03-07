import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Navbar from "./Navbar";
import AuthProvider from "../../context/authContext";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

vi.mock("../../services/user-service/logoutUser/logoutUser");

import logoutUser from "../../services/user-service/logoutUser/logoutUser";

describe("Header Component", () => {
  const renderComponent = () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthProvider>
    );
  };

  test("Navbar render correctly", () => {
    renderComponent();
    const ele = screen.getByTestId("navbar");
    expect(ele).toBeInTheDocument();
  });
  test("Logo render correctly", () => {
    renderComponent();
    const ele = screen.getByTestId("logo");
    expect(ele).toBeInTheDocument();
    expect(ele.getAttribute("src")).toBe("/src/assets/icons/pfizer.png");
  });
  test("Logout button render correctly", () => {
    renderComponent();
    const ele = screen.getByTestId("logout-btn");
    expect(ele).toBeInTheDocument();
  });
  test("Logout image render correctly", () => {
    renderComponent();
    const ele = screen.getByTestId("logout-image");
    expect(ele).toBeInTheDocument();
    expect(ele.getAttribute("src")).toBe("/src/assets/icons/exit.png");
  });
  test("Logout button tooltip works correctly", async () => {
    renderComponent();
    const button = screen.getByTestId("logout-btn");
    await userEvent.hover(button);
    const tooltip = await screen.findByText("Logout");
    expect(tooltip).toBeInTheDocument();
  });
  test("Logout button pop up should be render", async () => {
    renderComponent();
    const confirmSpy = vi.spyOn(window, "confirm");

    const button = screen.getByTestId("logout-btn");
    await userEvent.click(button);
    // Check if the popup was opened
    expect(confirmSpy).toHaveBeenCalledTimes(1);
    expect(confirmSpy).toHaveBeenCalledWith("Are you sure want to logout?");
    // Cleanup
    confirmSpy.mockRestore();
  });
  test("Cancle logout should do nothing ", async () => {
    renderComponent();
    const confirmSpy = vi
      .spyOn(window, "confirm")
      .mockImplementation(() => false);

    const button = screen.getByTestId("logout-btn");
    await userEvent.click(button);

    expect(confirmSpy).toHaveBeenCalledTimes(1);
    expect(confirmSpy).toHaveBeenCalledWith("Are you sure want to logout?");
    expect(confirmSpy.mock.results[0].value).toBe(false);

    expect(button).toBeInTheDocument();
    confirmSpy.mockRestore();
  });
  test("After successful logout user should navigate to the login page", async () => {
    renderComponent();
    const confirmSpy = vi
      .spyOn(window, "confirm")
      .mockImplementation(() => true);
    const button = screen.getByTestId("logout-btn");
    await userEvent.click(button);

    expect(window.location.href).toBe('http://localhost:3000/');

    confirmSpy.mockRestore();
  });



  test("Logout function should be called when the successful logout", async () => {
    renderComponent();
    const confirmSpy = vi
      .spyOn(window, "confirm")
      .mockImplementation(() => true);

    const button = screen.getByTestId("logout-btn");
    await userEvent.click(button);

    // pup up rendered and return true
    expect(confirmSpy).toHaveBeenCalledTimes(1);
    expect(confirmSpy).toHaveBeenCalledWith("Are you sure want to logout?");
    expect(confirmSpy.mock.results[0].value).toBe(true);

    // should call logOut function
    expect(logoutUser).toHaveBeenCalled();

    confirmSpy.mockRestore();
  });
  test('should call navigate on logout', () => {

    renderComponent();

    // Simulate the logout button click
    const logoutBtn = screen.getByTestId('logout-btn');
    userEvent.click(logoutBtn);

  });
});
