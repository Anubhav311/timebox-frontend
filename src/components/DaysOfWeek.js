
export const currentDate = new Date()
export const currentDay = currentDate.getDay() || 7
export const day1 = new Date(); day1.setDate(day1.getDate() - currentDay + 1)
export const day2 = new Date(); day2.setDate(day2.getDate() - currentDay + 2)
export const day3 = new Date(); day3.setDate(day3.getDate() - currentDay + 3)
export const day4 = new Date(); day4.setDate(day4.getDate() - currentDay + 4)
export const day5 = new Date(); day5.setDate(day5.getDate() - currentDay + 5)
export const day6 = new Date(); day6.setDate(day6.getDate() - currentDay + 6)
export const day7 = new Date(); day7.setDate(day7.getDate() - currentDay + 7)
export const day8 = new Date(); day8.setDate(day8.getDate() - currentDay + 8)
export const day9 = new Date(); day9.setDate(day9.getDate() - currentDay + 9)
export const day10 = new Date(); day10.setDate(day10.getDate() - currentDay + 10)
export const day11 = new Date(); day11.setDate(day11.getDate() - currentDay + 11)
export const day12 = new Date(); day12.setDate(day12.getDate() - currentDay + 12)
export const day13 = new Date(); day13.setDate(day13.getDate() - currentDay + 13)
export const day14 = new Date(); day14.setDate(day14.getDate() - currentDay + 14)
export const day15 = new Date(); day15.setDate(day15.getDate() - currentDay + 15)
export const thisWeek = [day1, day2, day3, day4, day5, day6, day7]
export const nextWeek = [day8, day9, day10, day11, day12, day13, day14]
export const fortNight = [day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14]

export function GetLocalISOTimeString(dateObject) {
    const timezoneOffset = dateObject.getTimezoneOffset() * 60000 //offset in milliseconds
    const localISOTime = new Date(Date.now() - timezoneOffset)
    const localISOTimeString = localISOTime.toISOString().slice(0, -1)
    return localISOTimeString;
}