import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  render(<App />);
});

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  const passwordInputElement = screen.getByLabelText("Enter Password");
  const confirmPasswordInputElement = screen.getByPlaceholderText(
    "Enter confirmpassword"
  );
  if (email) {
    fireEvent.change(emailInputElement, {
      target: { value: email },
    });
  }
  if (password) {
    fireEvent.change(passwordInputElement, {
      target: { value: password },
    });
  }
  if (confirmPassword) {
    fireEvent.change(confirmPasswordInputElement, {
      target: { value: confirmPassword },
    });
  }

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  };
};

const submitEvent = () => {
  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });
  fireEvent.click(submitBtnElement);
};

test("inputs should be initially empty", () => {
  const emailInputElement = screen.getByRole("textbox");
  const passwordInputElement = screen.getByLabelText("Enter Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");
});

test("should be able to type an email", () => {
  const { emailInputElement } = typeIntoForm({
    email: "vajaganidhanesh@gmail.com",
  });

  expect(emailInputElement.value).toBe("vajaganidhanesh@gmail.com");
});

test("should be able to type a Password", () => {
  const { passwordInputElement } = typeIntoForm({
    password: "dhanesh",
  });
  expect(passwordInputElement.value).toBe("dhanesh");
});

test("Both passwords should be match", () => {
  const { confirmPasswordInputElement } = typeIntoForm({
    confirmPassword: "dhanesh",
  });
  expect(confirmPasswordInputElement.value).toBe("dhanesh");
});

test("should show email error message on invalid email", () => {
  expect(
    screen.queryByText(/the email you input is invalid/i)
  ).not.toBeInTheDocument();

  typeIntoForm({ email: "vajaganidhanesh.com" });
  submitEvent();

  expect(
    screen.queryByText(/the email you input is invalid/i)
  ).toBeInTheDocument();
});

test("should be able to reset the form", () => {
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
  typeIntoForm({
    email: "vajaganidhanesh@gmail.com",
    password: "123",
  });

  expect(
    screen.queryByText(
      /the password you entered should contain 5 or more characters/i
    )
  ).not.toBeInTheDocument();

  submitEvent();

  expect(
    screen.queryByText(
      /the password you entered should contain 5 or more characters/i
    )
  ).toBeInTheDocument();
});

test("should match password with confirmPassword", () => {
  typeIntoForm({
    email: "vajaganidhanesh@gmail.com",
    password: "dhanesh",
    confirmPassword: "dhane",
  });

  expect(
    screen.queryByText(/password should match with previous password/i)
  ).not.toBeInTheDocument();

  submitEvent();

  expect(
    screen.queryByText(/password should match with previous password/i)
  ).toBeInTheDocument();
});
