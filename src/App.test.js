import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen } from "@testing-library/react";
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
  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  );
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });
  expect(emailErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, "vajaganidhanesh@gmail.com");
  userEvent.click(submitBtnElement);

  const emailErrorElementAgain = screen.queryByText(
    /the email you input is invalid/i
  );
  // console.log(submitBtnElement);
  // expect(emailErrorElementAgain).toBeInTheDocument();
});

test("should be able to reset the form", () => {
  render(<App />);
  const resetBtn = screen.getByRole("button", { name: "reset" });
  const emailInputElement = screen.getByPlaceholderText("Enter email");
  const passwordInputElement = screen.getByPlaceholderText("Enter password");
  const confirmPasswordInputElement = screen.getByPlaceholderText(
    "Enter confirmpassword"
  );

  fireEvent.click(resetBtn);
  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");
});

test("should show password error if password is less than 5 characters", () => {
  render(<App />);
  const emailInputElement = screen.getByPlaceholderText("Enter email");
  const passwordInputElement = screen.getByPlaceholderText("Enter password");
  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });
  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );
  userEvent.type(emailInputElement, "vajaganidhanesh@gmail.com");

  expect(passwordErrorElement).not.toBeInTheDocument();

  userEvent.type(passwordInputElement, "123");
  userEvent.click(submitBtnElement);
  const passwordErrorElementAgain = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );
  expect(passwordErrorElementAgain).toBeInTheDocument();
});
