import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BtnDefault from "./BtnDefault";

describe("BtnDefault", () => {
  it("should show loading in button save", async () => {
    const Wrapper = () => {
      const [loadingSave, setLoadingSave] = useState(false);
      const Save = () => {
        setLoadingSave(true);
      };

      return (
        <BtnDefault title={"Salvar"} loading={loadingSave} onclick={Save} />
      );
    };
    render(<Wrapper />);

    userEvent.click(screen.getByRole("button", { name: "Salvar" }));
    screen.getByRole("status");
  });
});
