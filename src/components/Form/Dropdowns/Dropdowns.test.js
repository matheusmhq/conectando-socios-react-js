import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  it("should show text required", async () => {
    const Wrapper = () => {
      const [errors, setErrors] = useState("");
      const Save = () => {
        validationFields(setErrors);
      };

      return (
        <>
          <DropdownDefault name="type" required={true} errors={errors} />
          <BtnDefault title={"Salvar"} onClick={Save} />
        </>
      );
    };
    render(<Wrapper />);

    userEvent.click(screen.getByRole("button", { name: "Salvar" }));
    screen.getByText("Obrigatório");
  });

  it("should render options", async () => {
    render(
      <>
        <DropdownDefault options={options} name="type" />
      </>
    );

    options.map((item) => {
      screen.getByText(item.name);
    });
  });
});
