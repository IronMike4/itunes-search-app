import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ResultsList from "../components/ResultsList";

// Test case for rendering search results and adding an item to favourites
test("renders results and adds to favourites", () => {
  // Sample data for results to be passed to the component
  const results = [
    {
      trackId: 1,
      trackName: "Song 1",
      artistName: "Artist 1",
      releaseDate: "2020-01-01",
      artworkUrl100: "test.jpg",
    },
  ];

  // Mock function to handle adding a result to favourites
  const onAddFavourite = jest.fn();

  // Render the ResultsList component with the sample data and mock function
  render(<ResultsList results={results} onAddFavourite={onAddFavourite} />);

  // Find the 'Add to Favourites' button in the rendered component
  const button = screen.getByText("Add to Favourites");

  // Simulate a click event on the 'Add to Favourites' button
  fireEvent.click(button);

  // Assert that the onAddFavourite function was called with the correct result object
  expect(onAddFavourite).toHaveBeenCalledWith(results[0]);
});
