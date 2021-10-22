

// get time difference of all necassary fields
export const timeDiff = (now: Date, later: Date) =>  {
  return {
    date: {
      year: (now.getFullYear() - later.getFullYear()),
      month: (now.getMonth() - later.getMonth()),
      day: (now.getDay() - later.getDay()),
    },
      time: {
      hours: (now.getHours() - later.getHours()),
      mins: (now.getMinutes() - later.getMinutes()),
      secs: (now.getSeconds() - later.getSeconds()),
      ms: (now.getMilliseconds() - later.getMilliseconds())
    } 
  }
}
