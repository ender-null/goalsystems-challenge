import { render, screen } from "@testing-library/react";
import App from "../../components/app";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/TODOS/i);
  expect(linkElement).toBeInTheDocument();
});
