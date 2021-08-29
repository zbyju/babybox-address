import { Babybox } from '../../types/babybox'
import { config } from '../../config'
import { getRequest } from '../fetch'
import { getDefaultBabybox } from '../../utils/defaultFactory'

export const getAllBabyboxes = async () => {
    try {
      const result = await getRequest<any>("babybox")
      return result.babyboxes
    } catch(err) {
      return []
    }
}

export const getBabyboxByHandle = async (handle: string) => {
  try {
    const result = await getRequest<any>("babybox/handle/" + handle)
    return result.babybox
  } catch(err) {
    return getDefaultBabybox()
  }
}
