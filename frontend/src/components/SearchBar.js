import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

// Functional component for the search bar
const SearchBar = ({ onSearch }) => {
  // State to store the search term and selected media type
  const [term, setTerm] = useState("");
  const [media, setMedia] = useState("all");

  // Function to handle search action
  const handleSearch = async () => {
    await onSearch(term, media); // Call the onSearch prop with current term and media
    setTerm(""); // Clear the search term field
    setMedia("all"); // Reset media type to 'all'
  };

  return (
    <Row className="mb-4" id="search-bar">
      {/* Column for the search input field */}
      <Col xs={12} md={8} className="mb-3 mb-md-0">
        <Form.Control
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)} // Update term state on change
          placeholder="Search..."
          className="form-control-lg"
        />
      </Col>
      {/* Column for the media type dropdown */}
      <Col xs={12} md={2} className="mb-3 mb-md-0">
        <Form.Control
          as="select"
          value={media}
          onChange={(e) => setMedia(e.target.value)}
          className="form-control-lg"
        >
          <option value="all">All</option>
          <option value="music">Music</option>
          <option value="movie">Movies</option>
          <option value="podcast">Podcasts</option>
          <option value="audiobook">Audiobooks</option>
          <option value="shortFilm">Short Films</option>
          <option value="tvShow">TV Shows</option>
          <option value="software">Software</option>
          <option value="ebook">eBooks</option>
        </Form.Control>
      </Col>
      {/* Column for the search button */}
      <Col xs={12} md={2}>
        <Button onClick={handleSearch} className="btn-primary btn-lg w-100">
          Search
        </Button>
      </Col>
    </Row>
  );
};

export default SearchBar;
