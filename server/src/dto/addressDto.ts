import mongoose, {CallbackError} from "mongoose";
import { Address } from '../types/address.types'
import { AddressModel } from '../models/addressModel'

export const findById = async (id: mongoose.Types.ObjectId): Promise<Address> => {
    return new Promise((resolve, reject) => {
        AddressModel.findOne({ _id: id }, (err: CallbackError, address: Address) => {
            if(err) reject(err)
            resolve(address)
        })
    })
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

export const findOne = async (query: Object): Promise<Address> => {
    return new Promise((resolve, reject) => {
        AddressModel.findOne(query, (err: CallbackError, name: Address) => {
            if(err) reject(err)
            resolve(name)
        })
    })
}

export const save = async (address: Address): Promise<Address> => {
    return new Promise((resolve, reject) => {
        AddressModel.create(address, (err: CallbackError, address: Address) => {
            if(err) reject(err)
            resolve(address)
        })
    })
}

export const updateById = async (id: mongoose.Types.ObjectId, address: Address): Promise<Address> => {
    return update({ _id: id }, address)
}

export const update = async (query: Object, address: Address): Promise<Address> => {
    return new Promise((resolve, reject) => {
        AddressModel.updateOne(query, address, {},(err: CallbackError, res) => {
            if(err) reject(err)
            resolve(res)
        })
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