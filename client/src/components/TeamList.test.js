import { render, screen } from "@testing-library/react";
import TeamList from "./TeamList";

test("renders team list", () => {
  render(<TeamList />);
  const titleText = screen.getByText(/Stadium Crime Tracker/i);
  expect(titleText).toBeInTheDocument();
});
