import React from "react";
import "./landingPage.css";

class LandingPage extends React.Component {
  render() {
    return (
      <main className="landingPageMain">
        <div className="landingPageContainer">
          <div className="landingPageDiv">
            <div className="content">
              <h1>Feel organized without the effort</h1>
              <div className="description">
                Notetorious helps you capture and prioritize ideas, projects, and
                to-do lists, so nothing falls through the cracks.
              </div>
              <button className="button-primary white">SIGN UP FOR FREE</button>
            </div>
            <div className="image ">
              <img
                className="desktopOnlyImage"
                src="https://evernote.com/c/assets/homepage/homepage-hero-desktop.png?d52827160d0f6350"
                alt=""
              />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default LandingPage;
