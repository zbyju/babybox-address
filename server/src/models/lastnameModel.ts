import { Schema, model } from 'mongoose';
import { Name } from '../types/names.types'

const schema = new Schema<Name>({
    case1: { type: String, required: true, index: true },
    case5: { type: String, required: true },
    sex: { type: String, required: true },
    count: Number,
});

export const LastnameModel = model<Name>('Lastname', schema);