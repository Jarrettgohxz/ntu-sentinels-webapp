import { useEffect, useState } from "react";

import sqljs from "../utils/sqljs-httpvfs";
import dateUtils from "../utils/date";

import "../css/events.css";

function Events() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    const retrieveData = async () => {
      const results = await sqljs(`SELECT * FROM Events`, "");

      const cols = results[0].columns;

      const parsedEvents = results[0].values.map((v) => {
        let r = {};

        for (let x = 0; x < cols.length; x++) {
          r[cols[x]] = v[x];
        }

        return r;
      });

      const past = [];
      const upcoming = [];

      const referenceTimeMs = new Date().getTime();

      parsedEvents.forEach((event) => {
        const eventEndTimeMs = dateUtils.convertToStartTimeMilliseconds(
          event.Date
        );

        if (eventEndTimeMs < referenceTimeMs) {
          past.push(event);
        } else {
          upcoming.push(event);
        }
      });

      setPastEvents(past);
      setUpcomingEvents(upcoming);
    };
    retrieveData();
  }, []);

  const cardToggle = (id) => {
    const el = document.getElementById(`flipper-${id}`);

    if (el.classList.contains("is-flipped")) {
      el.classList.remove("is-flipped");
    } else {
      el.classList.add("is-flipped");
    }
  };

  return (
    <div className="event-page-container">
      {/* UPCOMING EVENTS HEADER SECTION */}
      {upcomingEvents.length > 0 ? (
        <div>
          <div className="event-page-header-container">
            <p className="event-page-header">Upcoming Events</p>
          </div>

          {/* UPCOMING EVENTS CONTAINER SECTION */}
          <div class="event-card-container">
            {upcomingEvents.map(({ id, Name, Date, PosterURL }) => (
              // <div key={id} className="event-card">
              //   <div class="event-card-header">{Name}</div>
              //   <div class="event-card-poster-wrapper">
              //     <img
              //       class="event-poster-image"
              //       src={PosterURL}
              //       alt="Event Poster 3"
              //     />
              //   </div>
              //   <div class="event-card-footer">On: {Date}</div>
              // </div>

              <div
                key={id}
                className="event-card-3d-wrapper"
                onClick={() => cardToggle(id)}
              >
                <div className="event-card-flipper" id={`flipper-${id}`}>
                  <div className="event-card event-card-front">
                    <div class="event-card-header">{Name}</div>
                    <div class="event-card-poster-wrapper">
                      <img
                        class="event-poster-image"
                        src={PosterURL}
                        alt="Event Poster 3"
                      />
                    </div>
                    <div class="event-card-footer">On: {Date}</div>
                  </div>

                  <div className="event-card event-card-back">
                    <p>[More information here]</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* PAST EVENTS HEADER SECTION */}
      {pastEvents.length > 0 ? (
        <div>
          <div className="event-page-header-container">
            <p className="event-page-header">Past Events</p>
          </div>

          {/* PAST EVENTS CONTAINER SECTION */}
          <div class="event-card-container">
            {pastEvents.map(({ id, Name, Date, PosterURL }) => (
              <div
                key={id}
                className="event-card-3d-wrapper"
                onClick={() => cardToggle(id)}
              >
                <div className="event-card-flipper" id={`flipper-${id}`}>
                  <div className="event-card event-card-front">
                    <div class="event-card-header">{Name}</div>
                    <div class="event-card-poster-wrapper">
                      <img
                        class="event-poster-image"
                        src={PosterURL}
                        alt="Event Poster 3"
                      />
                    </div>
                    <div class="event-card-footer">On: {Date}</div>
                  </div>

                  <div className="event-card event-card-back">
                    <p>[More information here]</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Events;
