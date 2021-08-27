import { Babybox } from '../../types/babybox'
import { config } from '../../config'
import { getRequest } from '../fetch'

export const getAllBabyboxes = async () => {
    try {
      const result = await getRequest<any>("babybox")
      return await result.babyboxes
    } catch(err) {
      return []
    }
}
