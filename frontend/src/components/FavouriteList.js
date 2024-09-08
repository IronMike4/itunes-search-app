import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import "./FavouriteList.css";

// Functional component to render the list of favourite items
const FavouriteList = ({ favourites, onRemoveFavourite }) => {
  return (
    <div id="favourites-list" className="mt-5">
      {/* Title for the favourites section */}
      <h2 className="heading-spacing">Your Favourites</h2>
      <Row>
        {/* Iterate over the list of favourites and render each item */}
        {favourites.map((item, index) => (
          <Col md={4} key={index} className="mb-4">
            {/* Card component to display each favourite item */}
            <Card className="hover-card card-spacing h-100">
              {/* Image of the favourite item */}
              <Card.Img
                variant="top"
                src={item.artworkUrl600 || item.artworkUrl100} // Use larger image if available
                alt={item.trackName} // Alt text for accessibility
                className="card-img"
              />
              <Card.Body className="d-flex flex-column">
                {/* Title of the favourite item */}
                <Card.Title>{item.trackName}</Card.Title>
                {/* Artist name of the favourite item */}
                <Card.Text>{item.artistName}</Card.Text>
                {/* Release date of the favourite item */}
                <Card.Text>
                  {new Date(item.releaseDate).toDateString()}
                </Card.Text>
                {/* Button to remove the item from favourites */}
                <Button
                  className="mt-auto"
                  onClick={() => onRemoveFavourite(index)} // Function to handle removal
                  variant="danger"
                >
                  Remove
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FavouriteList;
