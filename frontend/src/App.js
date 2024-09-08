import React, { useState, useRef, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ResultsList from "./components/ResultsList";
import FavouriteList from "./components/FavouriteList";
import { searchContent } from "./services/apiService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navbar, Nav, Container, Button, Spinner } from "react-bootstrap";

const App = () => {
  // State hooks for managing search results, favourites, loading status, dark mode, and navbar state
  const [results, setResults] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [navExpanded, setNavExpanded] = useState(false);

  // Ref for the search bar to facilitate scrolling
  const searchBarRef = useRef(null);

  // useEffect hook to fetch random results on initial render
  useEffect(() => {
    const fetchRandomResults = async () => {
      setLoading(true);
      try {
        // Randomly select search terms and media types
        const terms = ["pop", "rock", "jazz", "classical"];
        const media = ["music", "movie"];
        const randomTerm = terms[Math.floor(Math.random() * terms.length)];
        const randomMedia = media[Math.floor(Math.random() * media.length)];

        // Fetch search results from the API
        const data = await searchContent(randomTerm, randomMedia);
        setResults(data.results || []);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomResults();
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Function to fetch search results based on search term and media type
  const fetchResults = async (term, media) => {
    setLoading(true);
    try {
      const data = await searchContent(term, media);
      setResults(data.results || []);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handler function for search action
  const handleSearch = (term, media) => {
    fetchResults(term, media);
  };

  // Handler function to add item to favourites if not already present
  const handleAddFavourite = (item) => {
    if (!favourites.some((fav) => fav.trackId === item.trackId)) {
      setFavourites([...favourites, item]);
    }
  };

  // Handler function to remove item from favourites by index
  const handleRemoveFavourite = (index) => {
    setFavourites(favourites.filter((_, i) => i !== index));
  };

  // Handler function for navigation link clicks
  const handleNavLinkClick = (event) => {
    event.preventDefault();

    // Determine the target section based on the href attribute
    const targetId = event.target.getAttribute("href").substring(1);
    if (targetId === "search-bar") {
      scrollToSearchBar();
    } else if (targetId === "favourites-list") {
      scrollToFavourites();
    }

    // Close the navbar when a menu item is selected
    setNavExpanded(false);
  };

  // Function to scroll to the search bar
  const scrollToSearchBar = () => {
    if (searchBarRef.current) {
      const { top } = searchBarRef.current.getBoundingClientRect();
      window.scrollTo({
        top: top + window.scrollY - 70,
        behavior: "smooth",
      });
    }
  };

  // Function to scroll to the favourites list
  const scrollToFavourites = () => {
    const favouritesList = document.getElementById("favourites-list");
    if (favouritesList) {
      const { top } = favouritesList.getBoundingClientRect();
      window.scrollTo({
        top: top + window.scrollY - 70,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* Navbar component with brand, toggle button, and links */}
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        fixed="top"
        expanded={navExpanded}
      >
        <Container>
          <Navbar.Brand href="#home">iTunes Search</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setNavExpanded(!navExpanded)} // Toggle navbar on button click
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#search-bar" onClick={handleNavLinkClick}>
                Search
              </Nav.Link>
              <Nav.Link href="#favourites-list" onClick={handleNavLinkClick}>
                Favourites
              </Nav.Link>
            </Nav>
            <Button onClick={() => setDarkMode(!darkMode)} className="ms-2">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main content area */}
      <div className="main-content">
        <Container className="mt-5 pt-5">
          <div id="search-bar" ref={searchBarRef}>
            <SearchBar onSearch={handleSearch} />
          </div>
          {loading ? (
            <div className="d-flex justify-content-center mt-4">
              <Spinner animation="border" />
            </div>
          ) : (
            <>
              <div className="my-4">
                <h3>Results</h3>
                <ResultsList
                  results={results}
                  onAddFavourite={handleAddFavourite}
                />
              </div>
              <div className="my-4" id="favourites-list">
                <FavouriteList
                  favourites={favourites}
                  onRemoveFavourite={handleRemoveFavourite}
                />
              </div>
            </>
          )}
          {/* Floating buttons for quick navigation */}
          <Button className="floating-btn" onClick={scrollToSearchBar}>
            <i className="bi bi-search"></i>
          </Button>
          <Button
            className="floating-btn floating-btn-secondary"
            onClick={scrollToFavourites}
          >
            <i className="bi bi-heart-fill"></i>
          </Button>
        </Container>
      </div>

      {/* Footer component */}
      <footer className="bg-dark text-light text-center py-3">
        <Container>
          <p className="mb-0">iTunes Search App &copy; 2024</p>
          <p>
            Created by{" "}
            <a href="https://github.com/IronMike4" className="text-light">
              Michael Mahachi
            </a>
          </p>
        </Container>
      </footer>
    </div>
  );
};

export default App;
