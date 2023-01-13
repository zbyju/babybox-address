import { Address } from "../../types/address"
import { getDefaultAddressFlags } from "../../utils/defaultFactory"
import { apiRequest } from "../fetch"
import { triggerAddress } from "../triggers"

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

export const inverseDonor = (address: Address) => {
  const newIsDonor = address.flags?.isDonor === true ? false : true
  triggerAddress(address._id!)
  return setDonor(address, newIsDonor)
}

export const inverseEmail = (address: Address) => {
  const newIsEmailSent = address.flags?.isEmailSent === true ? false : true
  triggerAddress(address._id!)
  return setEmailSent(address, newIsEmailSent)
}

export const inverseMayor = (address: Address) => {
  const newIsMayor = address.flags?.isMayor === true ? false : true
  triggerAddress(address._id!)
  return setMayor(address, newIsMayor)
}

export const setDonor = (address: Address, isDonor: boolean) => {
  const flags = address.flags || getDefaultAddressFlags()
  flags.isDonor = isDonor
  address.flags = flags
  if(!isDonor && address.donated) delete address.donated
  return new Promise(async (resolve, reject) => {
    try {
      await apiRequest<Address>("address/" + address._id, "PUT", address)
      resolve(address)
    } catch(err) {
      reject(err)
    }
  })
}

export const setMayor = (address: Address, isMayor: boolean) => {
  const flags = address.flags || getDefaultAddressFlags()
  flags.isMayor = isMayor
  address.flags = flags
  return new Promise(async (resolve, reject) => {
    try {
      await apiRequest<Address>("address/" + address._id, "PUT", address)
      resolve(address)
    } catch(err) {
      reject(err)
    }
  })
}

export const setDonation = (address: Address, donation: number) => {
  const flags = address.flags || getDefaultAddressFlags()
  flags.isDonor = true
  address.flags = flags
  address.donated = donation
  return new Promise(async (resolve, reject) => {
    try {
      await apiRequest<Address>("address/" + address._id, "PUT", address)
      resolve(address)
    } catch(err) {
      reject(err)
    }
  })
}

export const setEmailSent = (address: Address, emailSent: boolean) => {
  const flags = address.flags || getDefaultAddressFlags()
  flags.isEmailSent = emailSent
  address.flags = flags
  return new Promise(async (resolve, reject) => {
    try {
      await apiRequest<Address>("address/" + address._id, "PUT", address)
      resolve(address)
    } catch(err) {
      reject(err)
    }
  })
}
