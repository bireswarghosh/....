import "./Landing.css";
import SearchIcon from "@mui/icons-material/Search";

function Landing() {
  return (
    <>
      <div className="container">
        {/* JSX content in your React component */}
        <div className="border-box">
          <span className="homepage-label">Homepage</span>
          <div className="auth-links">
            <span className="login">Login</span>
            <span className="create-account">Create Account</span>
          </div>
        </div>

        <div className="text">
          Discover over 2,000,000
          <div>free Stock Images</div>
        </div>

        <div className="search">
          <span>
            <SearchIcon />
          </span>
          <input type="text" className="input" placeholder="Search..." />
        </div>

        <div className="Trending">
          <strong>Trending:</strong> flowers, love, forest, river
        </div>
      </div>
    </>
  );
}

export default Landing;
