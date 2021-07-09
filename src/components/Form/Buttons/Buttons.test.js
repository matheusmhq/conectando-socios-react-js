import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BtnDefault from "./BtnDefault";
import ReduxProvider from "store/ReduxProvider";

describe("BtnDefault", () => {
  it("should render loading in button save", async () => {
    const Wrapper = () => {
      const [loadingSave, setLoadingSave] = useState(false);
      const Save = () => {
        setLoadingSave(true);
      };

      return (
        <ReduxProvider>
          <BtnDefault title={"Salvar"} loading={loadingSave} onclick={Save} />
        </ReduxProvider>
      );
    };
    render(<Wrapper />);

    userEvent.click(screen.getByRole("button", { name: "Salvar" }));
    screen.getByRole("status");
  });
});
