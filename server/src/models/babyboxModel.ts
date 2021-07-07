import {Schema, model } from 'mongoose';
import {Babybox} from "../types/babybox.types";

const schema = new Schema<Babybox>({
    name: { type: String, required: true, unique: true, index: true },
    handle: { type: String, required: true, unique: true, index: true },
    favorite: { type: Boolean, default: false},
    note: { type: String },
    addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }]
}, { timestamps: true });

export const BabyboxModel = model<Babybox>('Babybox', schema);