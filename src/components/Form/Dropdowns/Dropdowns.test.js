import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReduxProvider from "store/ReduxProvider";
import { validationFields } from "functions/validation";
import DropdownDefault from "./DropdownDefault";
import BtnDefault from "../Buttons/BtnDefault";

const options = [
  {
    id: 1,
    name: "Automóveis",
  },
  {
    id: 2,
    name: "E-commerce",
  },
  {
    id: 3,
    name: "Educação",
  },
];

describe("DropdownDefault", () => {
  it("should render text required", async () => {
    const Wrapper = () => {
      const [errors, setErrors] = useState("");
      const Save = () => {
        validationFields(setErrors);
      };

      return (
        <ReduxProvider>
          <DropdownDefault name="type" required={true} errors={errors} />
          <BtnDefault title={"Salvar"} onclick={Save} />
        </ReduxProvider>
      );
    };
    render(<Wrapper />);

    userEvent.click(screen.getByRole("button", { name: "Salvar" }));
    screen.getByText("Obrigatório");
  });

  it("should render options", async () => {
    render(
      <ReduxProvider>
        <DropdownDefault options={options} name="type" />
      </ReduxProvider>
    );
    screen.getByText("Automóveis");
  });
});
