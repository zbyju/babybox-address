import { Address } from "../../types/address"
import { apiRequest } from "../fetch"

export const deleteAddress = (id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await apiRequest<Address>("address/" + id, "DELETE")
      resolve(result)
    } catch(err) {
      reject(err)
    }
  })
}
