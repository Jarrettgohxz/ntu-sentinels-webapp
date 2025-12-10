function convertDateTimeFormat(inputString) {
  // 1. Split the input into Date and Time Range parts
  const parts = inputString.split(" ");
  const datePart = parts[0]; // e.g., "2025-10-16"
  const timeRangePart = parts[1]; // e.g., "1200-1400"

  // --- Process Date (YYYY-MM-DD to DD MON YYYY) ---
  const dateElements = datePart.split("-");
  const year = dateElements[0];
  const monthIndex = parseInt(dateElements[1]) - 1; // 0-indexed month
  const day = dateElements[2];

  // Array of abbreviated month names
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const formattedDate = `${day} ${months[monthIndex]} ${year}`; // e.g., "16 OCT 2025"

  // --- Process Time Range (HHMM-HHMM to HPM-HPM) ---

  // Helper function to convert military time (HHMM) to HPM format
  function convertToAmPm(militaryTime) {
    // Get hours (first two digits)
    let hours = parseInt(militaryTime.substring(0, 2));

    // Convert to 12-hour format
    const period = hours >= 12 ? "PM" : "AM";

    // Handle 12 AM (00 hours) and 12 PM
    if (hours === 0) {
      hours = 12; // 00:xx -> 12 AM
    } else if (hours > 12) {
      hours -= 12; // 13:xx -> 1 PM, etc.
    }

    // Note: Minutes are ignored as per the target format (12PM, not 12:00PM)
    return `${hours}${period}`;
  }

  const timeParts = timeRangePart.split("-");
  const startTime = timeParts[0]; // e.g., "1200"
  const endTime = timeParts[1]; // e.g., "1400"

  const formattedStartTime = convertToAmPm(startTime); // e.g., "12PM"
  const formattedEndTime = convertToAmPm(endTime); // e.g., "2PM"

  // --- Combine and Return ---
  return `${formattedDate} ${formattedStartTime}-${formattedEndTime}`;
}

function convertToStartTimeMilliseconds(inputString) {
  // 1. Extract the Date and Start Time
  const parts = inputString.split(" ");
  const datePart = parts[0]; // "2025-10-16"

  // Extract the start time (e.g., "1200") from the range "1200-1400"
  const timeRangePart = parts[1];
  const endTimePart = timeRangePart.substring(5, 9); // "1400"

  // Extract hours and minutes from the start time
  const hours = endTimePart.substring(0, 2);
  const minutes = endTimePart.substring(2, 4);

  // 2. Construct an ISO 8601 compatible string
  // The Date constructor prefers YYYY-MM-DDTHH:mm:ss format.
  // We append 'T' and ':00:00' to create a local time string,
  // ensuring the date object is created in the local timezone.
  const isoString = `${datePart}T${hours}:${minutes}:00`;

  // 3. Create a Date object from the string
  // Note: The Date object created this way assumes the time is in the local timezone
  // of the machine running the code.
  const eventDate = new Date(isoString);

  // 4. Return the milliseconds value
  // .getTime() returns the number of milliseconds since the epoch.
  return eventDate.getTime();
}

export default { convertDateTimeFormat, convertToStartTimeMilliseconds };
