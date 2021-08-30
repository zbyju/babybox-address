import { Address } from "../types/address";
import moment from "moment"


export const timeFilterAddress = (addresses: Array<Address>, start: moment.Moment, end: moment.Moment): Array<Address> => {
  return addresses.filter(x => {
    if(!x.createdAt) return false;
    const createdAt = moment(x.createdAt)
    return (createdAt > start && createdAt < end)
  })
}

export const yesterdayAddresses = (addresses: Array<Address>): Array<Address> => {
  return timeFilterAddress(addresses, moment().subtract(1, "days"), moment().subtract(1, "days").endOf("day"))
}

export const todayAddresses = (addresses: Array<Address>): Array<Address> => {
  return timeFilterAddress(addresses, moment().startOf("day"), moment().endOf("day"))
}

export const thisWeek = (addresses: Array<Address>): Array<Address> => {
  return timeFilterAddress(addresses, moment().startOf("week").isoWeek(1), moment().endOf("day"))
}

export const lastWeek = (addresses: Array<Address>): Array<Address> => {
  return timeFilterAddress(addresses, moment().startOf("week").isoWeek(1).subtract(7, "days"), moment().endOf("week").subtract(7, "days"))
}

export const thisMonth = (addresses: Array<Address>): Array<Address> => {
  return timeFilterAddress(addresses, moment().startOf("month"), moment().endOf("month"))
}
