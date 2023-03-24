import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("inputs should be initially empty", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox");
  const passwordInputElement = screen.getByLabelText("Enter Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");
});

test("should be able to type an email", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox", {
    name: "Email address",
  });
  userEvent.type(emailInputElement, "vajaganidhanesh@gmail.com");
  expect(emailInputElement.value).toBe("vajaganidhanesh@gmail.com");
});
