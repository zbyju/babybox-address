import moment from "moment";
import { Address } from "../types/address";


export const timeFilterAddress = (addresses: Array<Address>, start: moment.Moment, end: moment.Moment): Array<Address> => {
  return addresses.filter(x => {
    if(!x.createdAt) return false;
    const createdAt = moment(x.createdAt)
    return (createdAt > start && createdAt < end)
  })
}

export const yesterdayAddresses = (addresses: Array<Address>): Array<Address> => {
  return timeFilterAddress(addresses, moment().startOf("day").subtract(1, "days"), moment().startOf("day").subtract(1, "days").endOf("day"))
}

export const todayAddresses = (addresses: Array<Address>): Array<Address> => {
  return timeFilterAddress(addresses, moment().startOf("day"), moment().endOf("day"))
}

export const thisWeek = (addresses: Array<Address>): Array<Address> => {
  return timeFilterAddress(addresses, moment().startOf("isoWeek"), moment().endOf("day"))
}

export const lastWeek = (addresses: Array<Address>): Array<Address> => {
  return timeFilterAddress(addresses, moment().startOf("isoWeek").subtract(7, "days"), moment().endOf("isoWeek").subtract(7, "days"))
}

export const thisMonth = (addresses: Array<Address>): Array<Address> => {
  return timeFilterAddress(addresses, moment().startOf("month"), moment().endOf("month"))
}

export const countDistinctHours = (addresses: Array<Address>): number => {
  // Contains all distinct hours
  // in format YYYYDDDHH as strings/numbers
  // where (YYYY - year, DD - day of year, HH - hour of day)
  let hours: Array<string> = []
  addresses.forEach(a => {
    const num = moment(a.createdAt).format("YYYYDDDHH")
    if(!hours.includes(num)) hours.push(num)
  })
  return hours.length
}
