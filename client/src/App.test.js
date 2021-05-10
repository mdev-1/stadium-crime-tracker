import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders team list screen", () => {
  render(<App />);
  const linkElement = screen.getByText(/Stadium Crime Tracker/i);
  expect(linkElement).toBeInTheDocument();
});
