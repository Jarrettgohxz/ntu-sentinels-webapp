import { useEffect } from "react";
import sqljs from "../utils/sqljs-httpvfs";

function Events() {
  useEffect(() => {
    const retrieveData = async () => {
      const results = await sqljs(`SELECT * FROM Events WHERE id = ?`, [1]);
      console.log(results);
    };
    retrieveData();
  }, []);

  return null;
}

export default Events;
