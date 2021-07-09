import { ObjectId } from 'mongoose';
import { Name } from '../../types/names.types'

import { FirstnameModel } from '../../models/firstnameModel'
import { find as commonFind, findOne as commonFindOne, remove as commonRemove, save as commonSave, update as commonUpdate } from './commonDto'

export const find = async (query: Object = {}): Promise<Array<Name>> => {
    return commonFind(query, FirstnameModel)
}

export const findById = async (id: ObjectId): Promise<Name> => {
    return commonFindOne({ _id: id }, FirstnameModel)
}

export const findByName = async (name: string): Promise<Name> => {
    return commonFindOne({ case1: name }, FirstnameModel)
}

export const findByNameAll = async (name: string): Promise<Array<Name>> => {
    return commonFind({ case1: name }, FirstnameModel)
}

export const removeById = async (id: ObjectId): Promise<Name> => {
    return commonRemove({ _id: id }, FirstnameModel)
}

export const updateById = async (id: ObjectId, name: Name): Promise<Name> => {
    return commonUpdate({ _id: id }, name, FirstnameModel)
}

export const save = async (name: Name): Promise<Name> => {
    return commonSave(name, FirstnameModel)
}