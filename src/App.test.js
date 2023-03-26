import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  // console.log("this test will return beforeEach");

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
  const emailInputElement = screen.getByRole("textbox", {
    name: "Email address",
  });
  fireEvent.change(emailInputElement, {
    target: { value: "vajaganidhanesh@gmail.com" },
  });

  // const { emailInputElement } = typeIntoForm({
  //   email: "vajaganidhanesh@gmail.com",
  // });
  expect(emailInputElement.value).toBe("vajaganidhanesh@gmail.com");
});

test("should be able to type a Password", () => {
  // const passwordInputElement = screen.getByLabelText("Enter Password");
  // userEvent.type(passwordInputElement, "dhanesh");

  const { passwordInputElement } = typeIntoForm({
    password: "dhanesh",
  });
  expect(passwordInputElement.value).toBe("dhanesh");
});

test("Both passwords should be match", () => {
  // const confirmPasswordInputElement = screen.getByLabelText("Confirm Password");
  // fireEvent.change(confirmPasswordInputElement, "dhanesh");

  const { confirmPasswordInputElement } = typeIntoForm({
    confirmPassword: "dhanesh",
  });
  expect(confirmPasswordInputElement.value).toBe("dhanesh");
});

test("should show email error message on invalid email", () => {
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

  fireEvent.change(emailInputElement, {
    target: {
      value: "vajaganidhaneshgmail.com",
    },
  });
  fireEvent.click(submitBtnElement);

  const emailErrorElementAgain = screen.queryByText(
    /the email you input is invalid/i
  );
  expect(emailErrorElementAgain).toBeInTheDocument();
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
  const emailInputElement = screen.getByPlaceholderText("Enter email");
  const passwordInputElement = screen.getByPlaceholderText("Enter password");
  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });
  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );

  fireEvent.change(emailInputElement, {
    target: {
      value: "vajaganidhanesh@gmail.com",
    },
  });

  expect(passwordErrorElement).not.toBeInTheDocument();

  fireEvent.change(passwordInputElement, {
    target: { value: "123" },
  });
  fireEvent.click(submitBtnElement);
  const passwordErrorElementAgain = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );
  expect(passwordErrorElementAgain).toBeInTheDocument();
  // await waitFor(() => {
  // });
});
