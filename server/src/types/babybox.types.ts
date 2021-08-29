import mongoose from "mongoose"

export interface Babybox {
    _id: mongoose.Types.ObjectId,
    name: string,
    handle: string,
    favorite: boolean
    createdAt: Date,
    updatedAt: Date,
    note: string
}
