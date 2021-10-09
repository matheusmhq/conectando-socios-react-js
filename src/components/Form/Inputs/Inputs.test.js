import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { validationFields } from "functions/validation";
import InputDefault from "./InputDefault";
import BtnDefault from "../Buttons/BtnDefault";
import TextareaDefault from "./TextareaDefault";

describe("InputDefault", () => {
  it("should show text required", async () => {
    const Wrapper = () => {
      const [errors, setErrors] = useState("");
      const Save = () => {
        validationFields(setErrors);
      };

      return (
        <>
          <InputDefault name="name" required={true} errors={errors} />
          <BtnDefault title={"Salvar"} onClick={Save} />
        </>
      );
    };
    render(<Wrapper />);

    userEvent.click(screen.getByRole("button", { name: "Salvar" }));
    screen.getByText("Obrigatório");
  });
});

describe("TextareaDefault", () => {
  it("should show text required", async () => {
    const Wrapper = () => {
      const [errors, setErrors] = useState("");
      const Save = () => {
        validationFields(setErrors);
      };

      return (
        <>
          <TextareaDefault name="description" required={true} errors={errors} />
          <BtnDefault title={"Salvar"} onClick={Save} />
        </>
      );
    };
    render(<Wrapper />);

    userEvent.click(screen.getByRole("button", { name: "Salvar" }));
    screen.getByText("Obrigatório");
  });
});
