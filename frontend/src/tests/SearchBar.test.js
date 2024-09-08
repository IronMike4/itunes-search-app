import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

// Test case for rendering the SearchBar component and handling user input
test("renders SearchBar component", async () => {
  // Mock function to handle search actions
  const onSearch = jest.fn();

  // Render the SearchBar component with the mock function
  render(<SearchBar onSearch={onSearch} />);

  // Get the search input field and search button elements from the rendered component
  const input = screen.getByPlaceholderText("Search...");
  const button = screen.getByText("Search");

  // Simulate user input in the search field
  fireEvent.change(input, { target: { value: "rock" } });

  // Simulate a click event on the search button
  fireEvent.click(button);

  // Use waitFor to handle asynchronous state updates and assert the expected behavior
  await waitFor(() => {
    // Check that the onSearch function was called with the expected arguments
    expect(onSearch).toHaveBeenCalledWith("rock", "all");
  });
});
