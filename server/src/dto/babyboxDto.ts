import {CallbackError, ObjectId} from "mongoose";
import { Babybox } from '../types/babybox.types'
import { BabyboxModel } from '../models/babyboxModel'

export const findById = async (id: ObjectId): Promise<Babybox> => {
    return new Promise((resolve, reject) => {
        BabyboxModel.findOne({ _id: id }, (err: CallbackError, babybox: Babybox) => {
            if(err) reject(err)
            resolve(babybox)
        })
    })
}

export const find = async (query: Object = {}): Promise<Array<Babybox>> => {
    return new Promise((resolve, reject) => {
        BabyboxModel.find(query, (err: CallbackError, babyboxes: Array<Babybox>) => {
            if(err) reject(err)
            resolve(babyboxes)
        })
    })
}

export const findOne = async (query: Object): Promise<Babybox> => {
    return new Promise((resolve, reject) => {
        BabyboxModel.findOne(query, (err: CallbackError, babybox: Babybox) => {
            if(err) reject(err)
            resolve(babybox)
        })
    })
}

export const save = async (babybox: Babybox): Promise<Babybox> => {
    return new Promise((resolve, reject) => {
        BabyboxModel.create(babybox,(err: CallbackError, babybox: Babybox) => {
            if(err) reject(err)
            resolve(babybox)
        })
    })
}

export const update = async (query: Object, babybox: Babybox): Promise<Babybox> => {
    return new Promise((resolve, reject) => {
        BabyboxModel.updateOne(query, babybox, {},(err: CallbackError, res) => {
            if(err) reject(err)
            resolve(res)
        })
    })
}

export const removeById = async (id: ObjectId): Promise<any> => {
    return remove({_id: id})
}

export const remove = async (query: Object): Promise<any> => {
    return new Promise((resolve, reject) => {
        BabyboxModel.deleteOne(query, {}, (err: CallbackError) => {
            if(err) reject(err)
            resolve({})
        })
    })
}