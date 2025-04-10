import dayjs from "./dayjs";

/**
 * Format date time to YYYY-MM-DD HH:mm:ss
 * @param time - time in seconds
 * @returns formatted date time
 */
export const formatDateTime = (time: number, format: string = "YYYY-MM-DD HH:mm:ss") => {
  return dayjs(time).format(format);
}

export const formatTime = (time: number) => {
  return dayjs.duration(time, "seconds").format("HH:mm:ss");
}

/**
 * Format distance to km
 * @param distance - distance in meters
 * @returns formatted distance
 */
export const formatDistance = (distance: number) => {
  return (distance / 1000).toFixed(2);
}

/**
 * Format pace to mm:ss
 * @param pace - pace in seconds per kilometer
 * @returns formatted pace
 */
export const formatPace = (pace: number) => {
  return dayjs.duration(pace, "seconds").format("mm:ss");
}