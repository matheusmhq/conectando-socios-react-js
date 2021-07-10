import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import ReduxProvider from "store/ReduxProvider";

describe("Login", () => {
  it("should start with inputs empty", async () => {
    render(
      <ReduxProvider>
        <Login />
      </ReduxProvider>
    );

    expect(screen.getByTestId("email")).toHaveValue("");
    expect(screen.getByTestId("password")).toHaveValue("");
  });

  it("should show loading in button sign in", async () => {
    render(
      <ReduxProvider>
        <Login />
      </ReduxProvider>
    );

    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "testing@hotmail.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "123" },
    });

    userEvent.click(screen.getByRole("button", { name: "Entrar" }));
    screen.getByRole("status");
  });
});
