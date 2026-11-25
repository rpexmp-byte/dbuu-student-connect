import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Landing from "../../pages/Landing/Landing";
import { store } from "../../redux";

beforeAll(() => {
  window.IntersectionObserver = class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("Landing page Snapshots", () => {
  it("Desktop", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Landing />
        </BrowserRouter>
      </Provider>
    );
    expect(container.textContent).toContain("DBUU");
    expect(container.textContent).toContain("Sign in");
    expect(container).toMatchSnapshot();
  });
});
