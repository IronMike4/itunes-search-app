import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FavouriteList from "../components/FavouriteList";

// Test case for rendering favourite items and removing a favourite
test("renders favourite items and removes favourite", () => {
  // Sample data for favourites to be passed to the component
  const favourites = [
    {
      trackId: 1,
      trackName: "Song 1",
      artistName: "Artist 1",
      releaseDate: "2020-01-01",
      artworkUrl100: "test.jpg",
    },
  ];

  // Mock function to handle removing a favourite
  const onRemoveFavourite = jest.fn();

  // Render the FavouriteList component with the sample data and mock function
  render(
    <FavouriteList
      favourites={favourites}
      onRemoveFavourite={onRemoveFavourite}
    />
  );

  // Find the 'Remove' button in the rendered component
  const button = screen.getByText("Remove");

  // Simulate a click event on the 'Remove' button
  fireEvent.click(button);

  // Assert that the onRemoveFavourite function was called with the correct index (0 in this case)
  expect(onRemoveFavourite).toHaveBeenCalledWith(0);
});
