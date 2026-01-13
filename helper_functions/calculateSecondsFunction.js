
// Function for converting the text stating how long ago a link was posted into seconds
const calculateSeconds = (timestamps) => {

  // Array for timestamps after they've been converted to seconds
  const convertedTimes = [];

  for (let i = 0; i < timestamps.length; i++) {

    // Divides the timestamp into 3 strings and converts the first string into an actual number
    const timeStamp = timestamps[i].timeAgoPosted.split(" ");
    const timeValue = Number(timeStamp[0]);
    // Saves the second string to use as a unit of time for the conversion
    const timeUnit = timeStamp[1];

    let seconds;

    // Converts the numerical value from the timestamp string into seconds from it's original measurement of time
    if (timeUnit.startsWith("minute")) {
      seconds = timeValue * 60;
    } else if (timeUnit.startsWith("hour")) {
      seconds = timeValue * 3600;
    } else if (timeUnit.startsWith("day")) {
      seconds = timeValue * 86400;
    };

    convertedTimes.push(seconds);
  };

  return convertedTimes;
};

export default calculateSeconds;