import { Babybox } from '../../types/babybox'
import { config } from '../../config'
import { getRequest } from '../fetch'
import { getDefaultBabybox } from '../../utils/defaultFactory'

export const getAllBabyboxes = async () => {
    const result = await getRequest<any>("babybox")
    return result.babyboxes
}

export const getBabyboxByHandle = async (handle: string) => {
  const result = await getRequest<any>("babybox/handle/" + handle)
  return result.babybox
}
