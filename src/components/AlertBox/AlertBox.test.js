import { render, screen, waitFor } from "@testing-library/react";
import ReduxProvider from "store/ReduxProvider";
import { alertDispatch } from "store/dispatchs/dispatchs";
import AlertBox from "./AlertBox";

describe("AlertBox", () => {
  it("should show alert box", async () => {
    render(
      <ReduxProvider>
        <AlertBox />
      </ReduxProvider>
    );

    alertDispatch("success", "Testing");
    await waitFor(() => screen.getByRole("alert"));
  });
});
