import mongoose, {CallbackError} from "mongoose";
import { Address } from '../types/address.types'
import { AddressModel } from '../models/addressModel'
import { findById as babyboxFindById } from "./babyboxDto"

export const findById = async (id: mongoose.Types.ObjectId): Promise<Address> => {
    return findOne({ _id: id })
}

export const findByBabybox = async (babyboxId: mongoose.Types.ObjectId): Promise<Array<Address>> => {
    return new Promise((resolve, reject) => {
        AddressModel.find({ babyboxId: babyboxId }, (err: CallbackError, addresses: Array<Address>) => {
            if(err) reject(err)
            resolve(addresses)
        })
    })
}

export const find = async (query: Object = {}): Promise<Array<Address>> => {
    return new Promise((resolve, reject) => {
        AddressModel.find(query, (err: CallbackError, addresses: Array<Address>) => {
            if(err) reject(err)
            resolve(addresses)
        })
    })
}

export const count = async (query: Object = {}): Promise<number> => {
    return new Promise((resolve, reject) => {
        AddressModel.count(query, (err: CallbackError, count: number) => {
            if(err) reject(err)
            resolve(count)
        })
    })
}

export const findOne = async (query: Object): Promise<Address> => {
    return new Promise((resolve, reject) => {
        AddressModel.findOne(query, (err: CallbackError, name: Address) => {
            if(err) reject(err)
            resolve(name)
        })
    })
}

export const save = async (address: Address): Promise<Address> => {
    return new Promise(async (resolve, reject) => {
        if(!address.email || address.email === "") delete address.email
        try {
            const babybox = await babyboxFindById(address.babyboxId)
            if(!babybox) reject({ message:"This Babybox does not exist.", name: "MongoError"})
            else {
                AddressModel.create(address, (err: CallbackError, address: Address) => {
                    if(err) reject(err)
                    resolve(address)
                })
            }
        } catch(err) {
            reject({ message:"This Babybox does not exist.", name: "MongoError"})
        }
    })
}

export const updateById = async (id: mongoose.Types.ObjectId, address: Address): Promise<Address> => {
    return update({ _id: id }, address)
}

export const update = async (query: Object, address: Address): Promise<Address> => {
    return new Promise((resolve, reject) => {
        if(!address.email || address.email === "") {
            AddressModel.updateOne(query, address, {},(err: CallbackError, res) => {
                AddressModel.updateOne(query, {$unset: { email: ""}}, {}, (err, res) => {
                    if(err) reject(err)
                    resolve(res)
                })
            })
        } else {
            AddressModel.updateOne(query, address, {},(err: CallbackError, res) => {
                AddressModel.updateOne(query, )
                if(err) reject(err)
                resolve(res)
            })
        }
    })
}

export const removeById = async (id: mongoose.Types.ObjectId): Promise<any> => {
    return remove({ _id: id })
}

export const remove = async (query: Object): Promise<any> => {
    return new Promise((resolve, reject) => {
        AddressModel.deleteOne(query, {}, (err: CallbackError) => {
            if(err) reject(err)
            resolve({ success: true })
        })
    })
}

export const removeMany = async (query: Object): Promise<any> => {
    console.log(query)
    // return new Promise((resolve, reject) => {
    //     AddressModel.remove(query, (err: CallbackError) => {
    //         if(err) reject(err)
    //         resolve({ success: true })
    //     })
    // })
    return find(query)
}

export const findDuplicatesEmail = async (babyboxId: mongoose.Types.ObjectId, email: string): Promise<any> => {
    return find({babyboxId, email})
}

export const findDuplicatesCompany = async (babyboxId: mongoose.Types.ObjectId, company: string): Promise<any> => {
    return find({babyboxId, company})
}
