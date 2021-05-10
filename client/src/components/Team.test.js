import { render, screen } from "@testing-library/react";
import Team from "./Team";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";

// Helper function
export function renderWithRouterMatch(
  ui,
  {
    path = "/",
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  return {
    ...render(
      <Router history={history}>
        <Route path={path} component={ui} />
      </Router>
    ),
  };
}

test("renders single team view", () => {
  const { getByText } = renderWithRouterMatch(Team, {
    route: "/team/example-team/crime-year/2021",
    path: "/team/:teamSlug/crime-year/:crimeYear",
  });
  expect(getByText("Stadium crime for")).toBeInTheDocument();
});
