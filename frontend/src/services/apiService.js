import axios from "axios";

// Function to search for content from the API
export const searchContent = async (term, media) => {
  try {
    // Make a GET request to the search endpoint with query parameters and authorization header
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/search`,
      {
        params: { term, media },
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_JWT_TOKEN}`, // Include JWT token for authentication
        },
      }
    );

    // Extract the results from the response data
    const results = response.data.results || [];

    // Update the results to replace small artwork URLs with larger ones
    const updatedResults = results.map((item) => {
      if (item.artworkUrl100) {
        item.artworkUrl100 = item.artworkUrl100.replace(
          "100x100bb.jpg",
          "600x600bb.jpg"
        );
      }
      return item;
    });

    // Return the response data with updated results
    return {
      ...response.data,
      results: updatedResults,
    };
  } catch (error) {
    // Log the error and rethrow it
    console.error("API request failed:", error);
    throw error;
  }
};
