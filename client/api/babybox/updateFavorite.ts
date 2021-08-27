import { Babybox } from '../../types/babybox'
import { apiRequest } from '../fetch'

export const updateFavorite = (babybox: Babybox): Promise<Babybox> => {
  return new Promise(async (resolve, reject) => {
    const newBabybox = {
      ...babybox,
      favorite: !babybox.favorite
    }
    try {
      const result = await apiRequest<Babybox>(`babybox/${babybox._id}/favorite`, "PUT", newBabybox)
      resolve(newBabybox)
    } catch(err) {
      reject(err)
    }
  })
}
