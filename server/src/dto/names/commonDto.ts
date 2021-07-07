import {CallbackError, EnforceDocument, Model} from "mongoose";
import { Name } from '../../types/names.types'

export const find = async (query: Object = {}, model: Model<Name>): Promise<Array<Name>> => {
    return new Promise((resolve, reject) => {
        model.find(query, (err: CallbackError, names: Array<Name>) => {
            if(err) reject(err)
            resolve(names)
        })
    })
}

export const findOne = async (query: Object, model: Model<Name>): Promise<Name> => {
    return new Promise((resolve, reject) => {
        model.findOne(query, (err: CallbackError, name: Name) => {
            if(err) reject(err)
            resolve(name)
        })
    })
}

export const save = async (name: Name, model: Model<Name>): Promise<Name> => {
    return new Promise((resolve, reject) => {
        model.create(name, (err: CallbackError, name: Name) => {
            if(err) reject(err)
            resolve(name)
        })
    })
}

export const update = async (query: Object, name: Name, model: Model<Name>): Promise<Name> => {
    return new Promise((resolve, reject) => {
        model.updateOne(query, name, {},(err: CallbackError, res) => {
            if(err) reject(err)
            resolve(res)
        })
    })
}

export const remove = async (query: Object, model: Model<Name>): Promise<any> => {
    return new Promise((resolve, reject) => {
        model.deleteOne(query,{}, (err: CallbackError) => {
            if(err) reject(err)
            resolve({})
        })
    })
}