import React from "react";
import "./landingPage.css";
import { Link } from "react-router-dom";

class LandingPage extends React.Component {
  render() {
    return (
      <>
        <div className="whiteSpaceDiv" />
        <main className="landingPageMain">
          <div className="landingPageContainer">
            <div className="landingPageDiv">
              <div className="content">
                <h1>Feel organized without the effort</h1>
                <div className="description">
                  Notetorious helps you capture and prioritize ideas, projects,
                  and to-do lists, so nothing falls through the cracks.
                </div>
                <Link to="/signup">
                  <button className="buttonPrimaryWhite">
                    SIGN UP FOR FREE
                  </button>
                </Link>
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
        <section className="landingPageSection">
          <div className="sectionHeaderDiv">
            <img
              src="https://evernote.com/c/assets/homepage/homepage-focus.png?f7ba411f33fad3d4"
              alt=""
            />
            <h2 class="sectionHeading">Focus on what matters most</h2>
          </div>
          <div className="sectionContentMainDiv">
            <div class="sectionContentInnerDiv">
              Manage everything from big projects to personal moments.
            </div>
            <div class="sectionContentInnerDiv">
              Capture ideas and inspiration in notes, voice, and pictures.
            </div>
            <div class="sectionContentInnerDiv">
              Never lose track of your tasks and deadlines.
            </div>
          </div>
        </section>
        <footer className="landingPageFooter">
          <div className="footerDiv">
            <div className="footerLogoDiv">
              <Link to={"/"} className="brand-logo">
                <span className="logoNameSpan">
                  <i className="fas fa-book-dead">
                    <span className="logoTitleSpan">Notetorious</span>
                  </i>
                </span>
              </Link>
            </div>
            <ul className="socialLinksUl">
              <li>
                <a
                  href="https://www.linkedin.com/in/deyvio/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://evernote.com/c/assets/social/linkedin.svg?4fe0f4cee76776aa"
                    className="linkedIn"
                    alt=""
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/Surgam7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://evernote.com/c/assets/social/twitter.svg?e80c9c12a09e310a"
                    className="twitter"
                    alt=""
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/SurgamSurgam"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://github.com/favicon.ico"
                    className="github"
                    alt=""
                  />
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </>
    );
  }
}

export default LandingPage;
