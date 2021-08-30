import { Babybox } from "../../types/babybox";
import { apiRequest } from "../fetch";

export const createBabybox = (babybox: Babybox) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await apiRequest<Babybox>("babybox", "POST", babybox)
      resolve(result)
    } catch(err) {
      reject(err)
    }
  })
}
