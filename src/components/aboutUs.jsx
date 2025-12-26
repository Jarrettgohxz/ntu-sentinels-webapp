import { useState, useEffect } from "react";
import sqljs from "/src/utils/sqljs-httpvfs";
import banner from "/public/ntu-sentinels-logo.jpeg";
import defaultImage from "../../public/images/tux.jpeg";
import "../css/aboutUs.css";
import IterativeLineAnimation from "../animations/iterativeLineAnimation";
import ConsoleTypingAnimation from "../animations/consoleTypingAnimation";
import FlickerAnimation from "../animations/flickerAnimation";

function AboutUs() {

  const [activeTop4, setActiveTop4] = useState([]);
  const [activeDirectors, setActiveDirectors] = useState([]);
  const [inactiveTop4, setInactiveTop4] = useState([]);
  const [inactiveDirectors, setInactiveDirectors] = useState([]);

  useEffect(() => {
    const element = document.getElementById("top-scroll-marker");

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, []);

  useEffect(() => {
    const retrieveData = async () => {
      {
        /* Fetching all Top4 and Directors from the database and organising them based on Status and Division
            Performed if new browser session or sessionStorage key not found */
      }

      let activeResults;
      let inactiveResults;

      if (window.sessionStorage.getItem("activeData") != null) {
        activeResults = JSON.parse(window.sessionStorage.getItem("activeData"));
      } else {
        activeResults = await sqljs(
          `SELECT * FROM IndividualDetail WHERE Status = 'Active'`
        );
        console.log(activeResults);
      }

      if (window.sessionStorage.getItem("inactiveData") != null) {
        inactiveResults = JSON.parse(
          window.sessionStorage.getItem("inactiveData")
        );
      } else {
        inactiveResults = await sqljs(
          `SELECT * FROM IndividualDetail WHERE Status = 'Inactive'`
        );
        console.log(inactiveResults);
      }

      // Return early if no table or data found
      if (
        !activeResults ||
        activeResults.length === 0 ||
        !activeResults[0] ||
        !activeResults[0].values ||
        activeResults[0].values.length === 0
      ) {
        setActiveTop4([]);
        setActiveDirectors([]);
        return;
      }

      if (
        !inactiveResults ||
        inactiveResults.length === 0 ||
        !inactiveResults[0] ||
        !inactiveResults[0].values ||
        inactiveResults[0].values.length === 0
      ) {
        setInactiveTop4([]);
        setInactiveDirectors([]);
        // return;
      }

      // Store data in sessionStorage for future use in the same session and if data has changed update the cache
      if (
        window.sessionStorage.getItem("activeData") == null ||
        JSON.parse(window.sessionStorage.getItem("activeData")) != activeResults
      ) {
        window.sessionStorage.setItem(
          "activeData",
          JSON.stringify(activeResults)
        );
        // console.log("Active data stored in sessionStorage");
      }
      if (
        window.sessionStorage.getItem("inactiveData") == null ||
        JSON.parse(window.sessionStorage.getItem("inactiveData")) !=
          inactiveResults
      ) {
        window.sessionStorage.setItem(
          "inactiveData",
          JSON.stringify(inactiveResults)
        );
        // console.log("Inactive data stored in sessionStorage");
      }

      // Map and filter data to display later
      const parsedData = activeResults[0];
      const formattedData = parsedData.values.map((item) =>
        Object.fromEntries(
          item.map((value, index) => [parsedData.columns[index], value])
        )
      );
      setActiveTop4(
        formattedData.filter((member) => member.Division === "Top4")
      );
      setActiveDirectors(
        formattedData.filter((member) => member.Division === "Director")
      );

      const parsedInactiveData = inactiveResults[0];
      const formattedInactiveData = parsedInactiveData.values.map((item) =>
        Object.fromEntries(
          item.map((value, index) => [parsedInactiveData.columns[index], value])
        )
      );
      setInactiveTop4(
        formattedInactiveData.filter((member) => member.Division === "Top4")
      );
      setInactiveDirectors(
        formattedInactiveData.filter((member) => member.Division === "Director")
      );
    };
    retrieveData();
  }, []);

  return (
    <>
      <div className="topPartition" id="top-scroll-marker" />
      <div className="banner">
        <img src={banner} alt="About Us Banner" />
      </div>

      <div className="about-text">
        <h1>Our Mission</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          <br />
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          <br />
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          <br />
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          <br />
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
          <br />
        </p>
        {/* <ConsoleTypingAnimation className = "test" text = "test" delay = "5"/> */}
      </div>
      <hr className="divider" />
      {(activeTop4.length > 0 || activeDirectors.length > 0) &&
      <div className="sentinels-team">
        <h1 id="active">ACTIVE</h1>
        {activeTop4.length > 0 && (
          <div className="Top4">
            {" "}
            {activeTop4.map((top) => (
              <div key={top.id} className="indiv-detail">
                {/* Image format to be discussed and standardised */}
                <img
                  src={`/images/members/${top.Name}.png`}
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src = defaultImage;
                    // e.target.src = "/images/tux.jpeg";
                  }}
                  alt={top.Position + " photo"}
                />

                <h1>{top.Name}</h1>
                <h3>{top.Position}</h3>
              </div>
            ))}
          </div>
        )}
        {activeDirectors.length > 0 && (
          <div className="Directors">
            {" "}
            {activeDirectors.map((director) => (
              <div key={director.id} className="indiv-detail">
                {/* Image format to be discussed and standardised */}
                <img
                  src={`/images/members/${director.Name}.png`}
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src = defaultImage;
                  }}
                  alt={director.Position + " photo"}
                />

                <h1>{director.Name}</h1>
                <h3>{director.Position}</h3>
              </div>
            ))}
          </div>
        )}
        <hr className="divider" />
      </div>}

      {(inactiveTop4.length > 0 || inactiveDirectors.length > 0) &&
      <div className="sentinels-team">
        <h1 id="legacy">LEGACY</h1>
        {inactiveTop4.length > 0 && (
          <div className="Top4">
            {" "}
            {inactiveTop4.map((top) => (
              <div key={top.id} className="indiv-detail">
                {/* Image format to be discussed and standardised */}
                <img
                  src={`/images/members/${top.Name}.png`}
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src = defaultImage;
                  }}
                  alt={top.Position + " photo"}
                />
                <h1>{top.Name}</h1>
                <h3>{top.Position}</h3>
              </div>
            ))}
          </div>
        )}
        {inactiveDirectors.length > 0 && (
          <div className="Directors">
            {" "}
            {inactiveDirectors.map((director) => (
              <div key={director.id} className="indiv-detail">
                {/* Image format to be discussed and standardised */}
                <img
                  src={`/images/members/${top.Name}.png`}
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src = defaultImage;
                  }}
                  alt={director.Position + " photo"}
                />
                <h1>{director.Name}</h1>
                <h3>{director.Position}</h3>
              </div>
            ))}
          </div>
        )}
      </div>}
    </>
  );
}
export default AboutUs;
