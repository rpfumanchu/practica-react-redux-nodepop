import { render, screen } from "@testing-library/react";
import LoginPage from "../LoginPage";
import { defaultState } from "../../../store/reducers";
import { authLogin, userInterfaceResetError } from "../../../store/actions";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

jest.mock("../../../store/actions");

describe("LoginPage", () => {
  const renderComponent = (error = null) => {
    const store = {
      getState: () => {
        const state = defaultState;
        state.userInterface.error = error;

        return state;
      },
      subscribe: () => {},
      dispatch: () => {},
    };
    return render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );
  };

  test("snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test("shoul dispatch authLogin action", () => {
    const email = "rober";
    const password = "123";
    const checkbox = true;

    //NOTE renderizo el componente
    renderComponent();

    const emailInput = screen.getByLabelText(/Email/);

    const passwordInput = screen.getByLabelText(/Password/);

    const checkboxInput = screen.getByLabelText(/rememberMe/);

    const submitButton = screen.getByRole("button");
    //const submitButton = screen.getByTestId("button");

    console.log(submitButton);

    expect(submitButton).toBeDisabled();

    //NOTE para lanzar eventos
    //fireEvent.change(emailInput, { target: { value: email } });

    // fireEvent.change(passwordInput, { target: { value: password } });

    //fireEvent.change(checkboxInput, { target: { checked: checkbox } });

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.type(checkboxInput, checkbox);

    console.log("averque", email, password, checkbox);

    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/)).toBeInTheDocument();
    expect(screen.getByLabelText(/rememberMe/)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();

    //expect(submitButton).toBeEnabled();

    //fireEvent.click(submitButton);

    userEvent.click(submitButton);
    expect(authLogin).toHaveBeenCalledWith({ email, password, checkbox });
  });

  test("should display an error", () => {
    const error = { message: "Unauthorized" };
    renderComponent(error);

    const errorElement = screen.getByText(error.message);
    expect(errorElement).toBeInTheDocument();

    // fireEvent.click(errorElement);
    userEvent.click(errorElement);

    expect(userInterfaceResetError).toHaveBeenCalled();
  });
});
