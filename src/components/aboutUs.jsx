import { useState, useEffect } from "react";
import sqljs from "/src/utils/sqljs-httpvfs";
import banner from "/public/ntu-sentinels-logo.jpeg";
import defaultImage from "../../public/images/tux.jpeg";
import "../css/aboutUs.css";
import "../css/sentinelLogo.css";
import IterativeLineAnimation from "../animations/iterativeLineAnimation";

function AboutUs() {
  const sentinelAsciiLogo = `                                                                                                    
                                                                                                              
                                                                                                              
                                                                                                              
                                                                                                              
                                                                                                              
                                                                                                              
                                                                                                              
                                                                                                              
                                                 555555666     666655566                                      
                                                6655555555655555555555656                                     
                                          4666  6655555555555555555555555  656                                
                                      6555665  46655555555555555555555566  4665566                            
                                  6666655554   555555555555555555555555564   655566656                        
                               555556556       565555555555555555555555566       565555566                    
                             65656666         4555555555555555555555555555          46555656                  
                            65565              656555555555555555555555565              5556                  
                            65555                   65566555555655564                   6555                  
                            65566       65656                               6656        6556                  
                            45556     65665656                             56556565     6656                  
                            65566    6655555555656556                666655555555566    6655                  
                            45566     665555555555555556566556656655555555555566666     6655                  
                            65556        666656555555555555555555555555555566654        5666                  
                            46556              66656565556555556556565556               6666                  
                            46566        5656                              65555        6565                  
                            46554       6565  65    456            56   466  6666       6566                  
                            46564       5566 4665  565465  655   6566 545656 6666       6555                  
                            45564      4665  6555 455  56 56565 566  6546566  555       6555                  
                            66556      4656  665654     655555555     665555  6566      6566                  
                             5565      4656   65556565556555555565556665556   465       5556                  
                             6565       665   46555555666664466465555555566   466       5655                  
                             6556       555    46555555665     65655555564    565       5665                  
                             5665        55   6  6565555565   5655555566  5   65       5655                   
                              6555        55 56    655555664 665555555    666 5        6565                   
                              6555         4665    5655564  6  665556     6566        5555                    
                               6566          66     566  6665565  655     65         45656                    
                                55554         5        65555555556        64        65666                     
                                 65556                 4655555555                  55664                      
                                  66556                  6555556                  5655                        
                                    6555                   566                  55556                         
                                     465                                        555                           
                                                                                                              
                                              6564  565 555556656556  656                                     
                                              55564 565 566655565554  556                                     
                                              656655666   6656  6554  556                                     
                                              655555656   5664  6554  656                                     
                                              555456555   6656  5555  555                                     
                                              5564 5556   5566  555566666                                     
                                               56   566   456     56665                                       
                                                                                                              
                                                                                                              
                                                                                                              
                                                                                                              
                                                                                                              
                                                                                                              `;

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
        return;
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
      {/* <div className="banner">
        <img src={banner} alt="About Us Banner" />
      </div> */}
      <div>
        <IterativeLineAnimation
          className="ascii-Logo"
          art={sentinelAsciiLogo}
          speed="50"
        />
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
      </div>
      <hr className="divider" />
      <div className="sentinels-team">
        <h1 id="active">ACTIVE</h1>
        {activeTop4.length > 0 && (
          <div className="Top4">
            {" "}
            {activeTop4.map((top) => (
              <div key={top.id} className="indiv-detail">
                {/* Image format to be discussed and standardised */}
                <img
                  src={`/images/${top.Name}.png`}
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
                  src={`/images/${director.Name}.png`}
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
      </div>
      <div className="sentinels-team">
        <h1 id="legacy">LEGACY</h1>
        {inactiveTop4.length > 0 && (
          <div className="Top4">
            {" "}
            {inactiveTop4.map((top) => (
              <div key={top.id} className="indiv-detail">
                {/* Image format to be discussed and standardised */}
                <img
                  src={`/images/${top.Name}.png`}
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
                  src={`/images/${top.Name}.png`}
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
      </div>
    </>
  );
}
export default AboutUs;
