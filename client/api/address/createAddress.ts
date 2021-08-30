import { Address } from "../../types/address"
import { apiRequest } from "../fetch"

export const createAddress = (address: Address, handle: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await apiRequest<Address>("address/handle/" + handle, "POST", address)
      resolve(result)
    } catch(err) {
      reject(err)
    }
  })
}
