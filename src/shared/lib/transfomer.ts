// transfomer (km/h, pace)

/**
 * Get km/h from distance and time
 * @param distance - distance in meters
 * @param time - time in seconds
 * @returns km/h
 */
export const getKmPerHour = (distance: number, time: number) => {
  return (distance / time) * 3.6;
};

/**
 * Get pace from distance and time
 * @param distance - distance in meters
 * @param time - time in seconds
 * @returns pace in second per kilometer
 */
export const getPace = (distance: number, time: number) => {
  return time / distance;
};

