import {Schema, model } from 'mongoose';
import {Babybox} from "../types/babybox.types";
import {nameToHandle} from "../utils/modelUtils"
import {removeMany} from "../dto/addressDto"
import mongoose from "mongoose";

const schema = new Schema<Babybox>({
    name: { type: String, required: true, unique: true, index: true },
    handle: { type: String, unique: true, index: true },
    favorite: { type: Boolean, default: false},
    note: { type: String },
}, { timestamps: true });

schema.pre('save', function(next) {
    this.handle = nameToHandle(this.name)
    next();
});

schema.pre('deleteOne', async function(next) {
    const test = await removeMany({ babyboxId: mongoose.Types.ObjectId(this.getFilter()["_id"])})
    console.log(test)
    next();
});

export const BabyboxModel = model<Babybox>('Babybox', schema);