import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import "./ResultsList.css";

// Functional component to render a list of search results
const ResultsList = ({ results, onAddFavourite }) => {
  return (
    <Row>
      {/* Iterate over the list of search results and render each item */}
      {results.map((result, index) => (
        <Col md={4} key={index} className="mb-4">
          {/* Card component to display each search result */}
          <Card className="hover-card card-spacing h-100">
            {/* Image of the search result */}
            <Card.Img
              variant="top"
              src={result.artworkUrl100 || result.artworkUrl600} // Use the smaller image first, fall back to larger if available
              alt={result.trackName} // Alt text for accessibility
              className="card-img"
            />
            <Card.Body className="d-flex flex-column">
              {/* Title of the search result */}
              <Card.Title>{result.trackName}</Card.Title>
              {/* Artist name of the search result */}
              <Card.Text>{result.artistName}</Card.Text>
              {/* Release date of the search result */}
              <Card.Text>
                {new Date(result.releaseDate).toDateString()}
              </Card.Text>
              {/* Button to add the result to favourites */}
              <Button
                className="mt-auto"
                onClick={() => onAddFavourite(result)} // Function to handle adding to favourites
                variant="primary"
              >
                Add to Favourites
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ResultsList;
