import { render, screen, fireEvent } from "@testing-library/react";
import LoginProvider, { LoginContext } from "../context.js";
import Login from "../login.js";
import Auth from "../auth.js";

test("Should contain user, loggedIn, and Error Values", () => {
  render(
    <LoginProvider>
      <LoginContext.Consumer>
        {(auth) => (
          <>
            <p data-testid="loggedIn">{auth.loggedIn.toString()}</p>
            <p data-testid="username">{auth.user.name}</p>
            <p data-testid="auth-error">{auth.error}</p>
          </>
        )}
      </LoginContext.Consumer>
    </LoginProvider>
  );

  expect(screen.getByTestId("loggedIn")).toHaveTextContent("false");
  expect(screen.getByTestId("username")).toHaveTextContent("");
  expect(screen.getByTestId("auth-error")).toHaveTextContent("");
});

test("Login component should be able to login", () => {
  render(
    <LoginProvider>
      <Login />
    </LoginProvider>
  );

  expect(screen.getByText(/Login/)).toBeInTheDocument();
});

test("Should be able to input a valid user and log in", () => {
  render(
    <LoginProvider>
      <Login />
    </LoginProvider>
  );

  let userInput = screen.getByTestId("username");
  let passInput = screen.getByTestId("password");

  fireEvent.change(userInput, { target: { value: "Administrator" } });
  fireEvent.change(passInput, { target: { value: "password" } });
  fireEvent.click(screen.getByText(/Login/i));

  expect(screen.getByText(/Logout/i)).toBeInTheDocument();
});

test('Auth component should be able to render when logged in', () => {

    render(
      <LoginProvider>
        <Login />
        <Auth capability="read">
          <p>I AM IN!</p>
        </Auth>
      </LoginProvider>
    );

    expect(screen.queryByText(/I AM IN!/i)).not.toBeInTheDocument();


})