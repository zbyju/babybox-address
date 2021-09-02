import { Address } from "../../types/address"
import { apiRequest } from "../fetch"

export const putAddress = (address: Address) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await apiRequest<Address>("address/" + address._id, "PUT", address)
      resolve(result)
    } catch(err) {
      reject(err)
    }
  })
}
