import { useState, useEffect } from "react";
import sqljs from "/src/utils/sqljs-httpvfs";
import banner from "/public/ntu-sentinels-logo.jpeg";
import defaultImage from "../../public/images/tux.jpeg";
import "../css/aboutUs.css";

function AboutUs() {
    const [activeTop4, setActiveTop4] = useState([]);
    const [activeDirectors, setActiveDirectors] = useState([]);
    const [legacyTop4, setLegacyTop4] = useState([]);
    const [legacyDirectors, setLegacyDirectors] = useState([]);

    {/* Fetching all Top4 and Directors from the database and organising them based on Status and Division */}
    useEffect(() => {
    const retrieveData = async () => {
        const activeResults = await sqljs(`SELECT * FROM IndividualDetail WHERE Status = 'Active'`);
        const legacyResults = await sqljs(`SELECT * FROM IndividualDetail WHERE Status = 'Inactive'`);
        
        // Return early if no table or data found
        if (!activeResults || activeResults.length === 0 || 
            !activeResults[0] || !activeResults[0].values || 
            activeResults[0].values.length === 0) {
            setActiveTop4([]);
            setActiveDirectors([]);
            return;
        }

        if (!legacyResults || legacyResults.length === 0 || 
            !legacyResults[0] || !legacyResults[0].values || 
            legacyResults[0].values.length === 0) {
            setLegacyTop4([]);
            setLegacyDirectors([]);
            return;
        }

        // Else, map and filter data to display later
        const parsedData = activeResults[0];
        const formattedData = parsedData.values.map( item => 
            Object.fromEntries(
                item.map( (value, index) => [parsedData.columns[index], value] )
            )
        )
        setActiveTop4(formattedData.filter( member => member.Division === "Top4" ));
        setActiveDirectors(formattedData.filter( member => member.Division === "Director"));
        
        const parsedLegacyData = legacyResults[0];
        const formattedLegacyData = parsedLegacyData.values.map( item => 
            Object.fromEntries(
                item.map( (value, index) => [parsedLegacyData.columns[index], value] )
            )
        )
        setLegacyTop4(formattedLegacyData.filter( member => member.Division === "Top4" ));
        setLegacyDirectors(formattedLegacyData.filter( member => member.Division === "Director"));
        };
        retrieveData();
    },[]);


    return(
    <>
    <div className="topPartition"></div>
    <div className="banner">
        <img src={banner} alt="About Us Banner"/>
    </div>
    
    <div className="about-text">
        <h1>Our Mission</h1>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br/> 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris<br/>
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in<br/>
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/>
        </p>
    </div>
    <hr className = 'divider'/>
    <div className="sentinels-team">
    <h1 id = 'active'>ACTIVE</h1>
        {activeTop4.length > 0 && (
            <div className = "Top4"> {
                activeTop4.map((top) => (
                    <div key={top.id} className = "indiv-detail"> 
                        {/* Image format to be discussed and standardised */}
                        <img src = {`/images/${top.Name}.png`} 
                         onError={(e) => {
                            e.target.onError = null;
                            e.target.src = defaultImage;
                            // e.target.src = "/images/tux.jpeg";
                         }}
                         alt={top.Position + " photo"}/>
                        
                        <h1>{top.Name}</h1>
                        <h3>{top.Position}</h3>
                    </div>
                ))}
            </div>
        )}
        {activeDirectors.length > 0 && (
            <div className = "Directors"> {
                activeDirectors.map((director) => (
                    <div key = {director.id} className = "indiv-detail">
                        {/* Image format to be discussed and standardised */}
                        <img src = {`/images/${top.Name}.png`} 
                         onError={(e) => {
                            e.target.onError = null;
                            e.target.src = defaultImage;
                         }}
                         alt={director.Position + " photo"}/>
                        
                        <h1>{director.Name}</h1>
                        <h3>{director.Position}</h3>
                    </div>
                ))}
            </div>
        )}
    <hr className = 'divider'/>
    </div>
    <div className="sentinels-team">
    <h1 id = 'legacy'>LEGACY</h1>
        {legacyTop4.length > 0 && (
            <div className = "Top4"> {
                legacyTop4.map((top) => (
                    <div key={top.id} className = "indiv-detail">
                        {/* Image format to be discussed and standardised */}
                        <img src = {`/images/${top.Name}.png`} 
                         onError={(e) => {
                            e.target.onError = null;
                            e.target.src = defaultImage;
                         }}
                         alt={top.Position + " photo"}/>
                        <h1>{top.Name}</h1>
                        <h3>{top.Position}</h3>
                    </div>
                ))}
            </div>
        )}
        {legacyDirectors.length > 0 && (
            <div className = "Directors"> {
                legacyDirectors.map((director) => (
                    <div key = {director.id} className = "indiv-detail">
                        {/* Image format to be discussed and standardised */}
                        <img src = {`/images/${top.Name}.png`} 
                         onError={(e) => {
                            e.target.onError = null;
                            e.target.src = defaultImage;
                            }}  
                            alt={director.Position + " photo"}/>
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
