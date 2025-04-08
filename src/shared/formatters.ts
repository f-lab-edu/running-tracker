import dayjs from './dayjs'

/**
 * 거리 포맷팅
 * @param length 킬로미터 단위의 거리
 * @returns 소수점 둘째 자리까지의 문자열
 */
export const formatLength = (length: number): string => {
  return length.toFixed(2)
}

/**
 * 페이스 포맷팅 (분/km)
 * @param pace 분/km 단위의 페이스
 * @returns mm:ss 형식의 문자열
 */
export const formatPace = (pace: number): string => {
  const minutes = Math.floor(pace)
  const seconds = Math.round((pace - minutes) * 60)

  return `${minutes}:${seconds.toString().padStart(2, '0')}/km`
}

/**
 * 러닝 시간 포맷팅
 * @param seconds 초 단위의 러닝 시간
 * @returns hh:mm:ss 또는 mm:ss 형식의 문자열
 */
export const formatRunningTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export const runningTimeInSeconds = (endDateTime: number, startDateTime: number): number => {
  return (endDateTime - startDateTime) / 1000
}

export const calculatePace = (length: number, startDateTime: number, endDateTime: number): number => {
  if (!length || !startDateTime || !endDateTime) return 0
  const runningTime = runningTimeInSeconds(endDateTime, startDateTime)
  return (runningTime / length) / 60
}

/**
 * 날짜 포맷팅
 * @param timestamp 유닉스 타임스탬프
 * @param format 포맷 문자열 (dayjs 형식)
 * @returns 포맷된 날짜 문자열
 */
export const formatDate = (timestamp: number, format = 'YYYY-MM-DD'): string => {
  return dayjs(timestamp).format(format)
}

/**
 * 시간 포맷팅
 * @param timestamp 유닉스 타임스탬프
 * @param format 포맷 문자열 (dayjs 형식)
 * @returns 포맷된 시간 문자열
 */
export const formatTime = (timestamp: number, format = 'HH:mm'): string => {
  return dayjs(timestamp).format(format)
}

/**
 * 날짜 및 시간 포맷팅
 * @param timestamp 유닉스 타임스탬프
 * @param format 포맷 문자열 (dayjs 형식)
 * @returns 포맷된 날짜 및 시간 문자열
 */
export const formatDateTime = (timestamp: number, format = 'YYYY-MM-DD HH:mm'): string => {
  return dayjs(timestamp).format(format)
} 