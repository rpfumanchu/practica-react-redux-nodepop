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
    const credentials = {
      email: "rober",
      password: "123",
      rememberMe: true,
    };

    // // Simulate the functions
    // const authLoginSpy = jest.spyOn(authLogin, "mockImplementationOnce");
    // authLoginSpy.mockImplementationOnce(mockedCredentials => {
    //   console.log("authLogin called with credentials:", mockedCredentials);
    // });
    // userInterfaceResetError.mockImplementation(() => {});

    //NOTE renderizo el componente
    renderComponent();

    const emailInput = screen.getByLabelText(/Email/);
    const passwordInput = screen.getByLabelText(/Password/);
    const checkboxInput = screen.getByLabelText(/rememberMe/);
    const submitButton = screen.getByRole("button");
    //const submitButton = screen.getByTestId("button");

    //console.log(submitButton);

    expect(submitButton).toBeDisabled();

    //NOTE para lanzar eventos
    //fireEvent.change(emailInput, { target: { value: email } });

    // fireEvent.change(passwordInput, { target: { value: password } });

    //fireEvent.change(checkboxInput, { target: { checked: checkbox } });

    userEvent.type(emailInput, credentials.email);
    userEvent.type(passwordInput, credentials.password);
    userEvent.click(checkboxInput, credentials.rememberMe);

    // console.log(
    //   "averque",
    //   emailInput,
    //   passwordInput,
    //   checkboxInput,
    //   credentials,
    // );

    // expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    // expect(screen.getByLabelText(/Password/)).toBeInTheDocument();
    // expect(screen.getByLabelText(/rememberMe/)).toBeInTheDocument();
    // expect(screen.getByRole("button")).toBeInTheDocument();

    expect(submitButton).toBeEnabled();

    //fireEvent.click(submitButton);

    userEvent.click(submitButton);
    console.log(authLogin);
    expect(authLogin).toHaveBeenCalledWith(credentials);
  });

  //NOTE
  test("should display an error", () => {
    const error = { message: "Unauthorized" };
    renderComponent(error);

    const errorElement = screen.getByText(error.message);
    expect(errorElement).toBeInTheDocument();

    const modalButton = screen.getByTestId("modalButton");

    // fireEvent.click(errorElement);
    userEvent.click(modalButton);

    expect(userInterfaceResetError).toHaveBeenCalled();
  });
});
