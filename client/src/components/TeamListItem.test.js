import { render, screen } from "@testing-library/react";
import TeamListItem from "./TeamListItem";

test("renders team list item", () => {
  render(
    <TeamListItem
      name="Example team"
      venue="Example venue"
      address="Example address"
    />
  );
  const name = screen.getByText(/Example team/i);
  expect(name).toBeInTheDocument();
  const venue = screen.getByText(/Example venue/i);
  expect(venue).toBeInTheDocument();
  const address = screen.getByText(/Example address/i);
  expect(address).toBeInTheDocument();
});
