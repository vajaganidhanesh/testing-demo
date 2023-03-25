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

test("should be able to type a Password", () => {
  render(<App />);
  const passwordInputElement = screen.getByLabelText("Enter Password");
  userEvent.type(passwordInputElement, "dhanesh");
  expect(passwordInputElement.value).toBe("dhanesh");
});

test("Both passwords should be match", () => {
  render(<App />);
  const confirmPasswordInputElement = screen.getByLabelText("Confirm Password");
  userEvent.type(confirmPasswordInputElement, "dhanesh");
  expect(confirmPasswordInputElement.value).toBe("dhanesh");
});

test("should show email error message on invalid email", () => {
  render(<App />);
  const emailErrorElement = screen.queryByText(/the email you put is invalid/i);
  const emailInputElement = screen.getByRole("textbox", {
    name: "Email address",
  });
  const submitBtnElement = screen.getByRole("button", {
    name: "Submit",
  });
  expect(emailErrorElement).not.toBeInTheDocument();
  userEvent.type(emailInputElement, "vajaganidhanesh@gmail.com");
  userEvent.click(submitBtnElement);

  expect(emailErrorElement).toBeInTheDocument();
});
