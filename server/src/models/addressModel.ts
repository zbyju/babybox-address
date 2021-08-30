import {Schema, model, PopulatedDoc, Document} from 'mongoose';
import { Address } from '../types/address.types'
import {Babybox} from "../types/babybox.types";

const schema = new Schema<Address>({
    titleInFront: String,
    titleBehind: String,
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    sex: { type: String, required: true},
    firstname5: { type: String, required: true},
    lastname5: { type: String, required: true},
    email: { type: String, required: true, unique: true, index: true },
    company: { type: String, required: true, unique: true, index: true },
    street: { type: String, required: true},
    city: { type: String, required: true},
    postcode: { type: String, required: true},
    babyboxId: { type: Schema.Types.ObjectId, ref: 'Babybox', index: true }
}, { timestamps: true });

export const AddressModel = model<Address>('Address', schema);
