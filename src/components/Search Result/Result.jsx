// // import React from 'react'
// import "./Result.css"
// import SearchIcon from "@mui/icons-material/Search";

// function Result() {
//   return (

//     <>
//     <div className="prent_container">
//     <div className="container1">
//         {/* JSX content in your React component */}
//         <div className="border-box">
//           <span className="homepage-label">Homepage</span>
//           <div className="auth-links">
//             <span className="login">Login</span>
//             <span className="create-account">Create Account</span>
//           </div>
//         </div>

//         <div className="search">
//           <span>
//             <SearchIcon />
//           </span>
//           <input type="text" className="input" placeholder="Search..." />
//         </div>

//         <div className="Trending">
//           <strong>Results:</strong>
//           {/* //! >TODO : which i search input box  */}
//           <strong>TODO : which i search input box  </strong>
//         </div>
//       </div>

// <div className="container2">

// {/* //! TODO : hear add hestory */}

// <button type="none">abcd</button>
// <button type="none">abcd</button>
// <button type="none">abcd</button>
// <button type="none">abcd</button>
// <button type="none">abcd</button>
// <button type="none">abcd</button>

// <dir className = "img_container">

// <div className="img1">

// </div>

// </dir>

// </div>

//       </div>

//     </>
//   )
// }

// export default Result

// useEffect

import { useState } from "react";
import "./Result.css";
import SearchIcon from "@mui/icons-material/Search";
import { Modal } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress"; // Import the loading spinner from MUI

const apiKey = "41881327-4f297a7078b5f188f3e70ca09"; // Replace with your actual API key

function Result() {
  // State variables
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // New state variable for loading status

  // const [searchHistory, setSearchHistory] = useState([]);
  // const [showHistory, setShowHistory] = useState(false);

  // Load search history from localStorage when the component mounts
  // useEffect(() => {
  //   const history = localStorage.getItem('searchHistory');
  //   if (history) {
  //     setSearchHistory(JSON.parse(history));
  //   }
  // }, []);

  //! Save search term to localStorage and update state
  // const saveSearchTerm = (searchTerm) => {
  //   const updatedHistory = [searchTerm, ...searchHistory];
  //   localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  //   setSearchHistory(updatedHistory);
  // };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Perform search using Pixabay API
  const performSearch = async () => {
    setIsLoading(true); // Set loading to true when the API call starts
    try {
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
        searchQuery
      )}&image_type=photo`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setResults(data.hits);
        });
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false); // Set loading to false when the API call finishes
    }
  };

  // Handle image click and open modal
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      {isLoading ? (
        <div
          style={{ display: "flex", justifyContent: "center", margin: "20px" }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div className="prent_container">
          <div className="container1">
            {/* Header */}
            <div className="border-box">
              <span className="homepage-label">Homepage</span>
              <div className="auth-links">
                <span className="login">Login</span>
                <span className="create-account">Create Account</span>
              </div>
            </div>

            {/* Search input */}
            <div className="search">
              <span>
                <SearchIcon />
              </span>
              <input
                type="text"
                className="input"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    performSearch();
                  }
                }}
              />
            </div>

            {/* Search results */}
            <div className="Trending">
              <strong>Results:</strong>
              {searchQuery && <strong>{searchQuery}</strong>}
            </div>

            {/*//! Toggle button for search history */}
            {/* <button onClick={() => setShowHistory(!showHistory)}>
            Toggle Search History
          </button> */}

            {/* Search history panel */}
            {/* {showHistory && (
            <div className="search-history">
              <h3>Search History</h3>
              <ul>
                {searchHistory.map((term, index) => (
                  <li key={index}>{term}</li>
                ))}
              </ul> */}
            {/* </div> */}
            {/* )} */}

            {/* Image grid */}
            <div className="img_container">
              {results.map((image) => (
                <div
                  key={image.id}
                  className="img1"
                  onClick={() => handleImageClick(image)}
                >
                  <img src={image.webformatURL} alt={image.tags} />
                  <p>{image.tags.split(",").join(" ")}</p>
                </div>
              ))}
            </div>

            <Modal open={!!selectedImage} onClose={handleCloseModal}>
              <div className="popup">
                {selectedImage && (
                  <div className="popup-content">
                    <div className="image-id">
                      {`ID: ${selectedImage.id}`}
                      <div className="popup-left">
                        <img
                          src={selectedImage.largeImageURL}
                          alt={selectedImage.tags}
                        />
                      </div>
                      <div>
                        <div className="image-tags">{`TAGS : ${selectedImage.tags}`}</div>{" "}
                      </div>
                    </div>

                    <div className="popup-right">
                      <div className="popup-info">
                        <div className="download">Download</div>

                        {/* make a radio type button and every button indecate different size which come from api */}
                        <form className="size-form">
                          <div className="table">
                            <label className="size-option">
                              Small:
                              <span id="Big_gap" className="size-label">
                                {`${selectedImage.previewHeight}*${selectedImage.previewWidth}`}
                              </span>
                              <input
                                type="radio"
                                name="size"
                                value="small"
                                // checked={selectedSize === 'small'}
                                // onChange={handleSizeChange}
                              />
                            </label>

                            <label className="size-option">
                              Medium:
                              <span className="size-label">
                                {`${selectedImage.webformatHeight}*${selectedImage.webformatWidth}`}{" "}
                              </span>
                              <input
                                type="radio"
                                name="size"
                                value="medium"
                                // checked={selectedSize === 'medium'}
                                // onChange={handleSizeChange}
                              />
                            </label>

                            <label className="size-option">
                              Big:
                              <span id="Big_gap"  className="size-label">
                                {` ${selectedImage.imageHeight}*${selectedImage.imageWidth}`}{" "}
                              </span>
                              <input
                                type="radio"
                                name="size"
                                value="large"
                                // checked={selectedSize === 'large'}
                                // onChange={handleSizeChange}
                              />
                            </label>

                            <label className="size-option">
                              Original:
                              <span className="size-label">
                                {` ${selectedImage.previewHeight}*${selectedImage.previewWidth}`}{" "}
                              </span>
                              <input
                                type="radio"
                                name="size"
                                value="original"
                                // checked={selectedSize === 'original'}
                                // onChange={handleSizeChange}
                              />
                            </label>
                          </div>
                        </form>

                        <button
                          onClick={() => window.open(selectedImage.pageURL)}
                        >
                          Download For Free !
                        </button>
                        {/* ... Additional options ... */}
                        <div className="Information">
                          <strong id="one">Information </strong>
                          <div className="image-details">
                            <div className="detail-header">User</div>
                            <div className="detail-header">User Id</div>
                            <div id="ww" className="detail-header">Type</div>

                            <div className="detail">{selectedImage.user}</div>
                            <div className="detail">
                              {selectedImage.user_id}
                            </div>
                            <div id="ww" className="detail">{selectedImage.type}</div>

                            <div className="detail-header">Views</div>
                            <div className="detail-header">Downloads</div>
                            <div className="detail-header">Likes</div>

                            <div className="detail">{selectedImage.views}</div>
                            <div className="detail">
                              {selectedImage.downloads}
                            </div>
                            <div className="detail">{selectedImage.likes}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="close-modal" onClick={handleCloseModal}>
                      &times;
                    </button>
                  </div>
                )}
              </div>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
}

export default Result;
