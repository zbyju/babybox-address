import { Schema, model, PopulatedDoc, Document } from "mongoose";
import { Address } from "../types/address.types";
import { Babybox } from "../types/babybox.types";

const schema = new Schema<Address>(
  {
    titleInFront: { type: String, trim: true },
    titleBehind: { type: String, trim: true },
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    sex: { type: String, required: true },
    firstname5: { type: String, required: true, trim: true },
    lastname5: { type: String, required: true, trim: true },
    email: { type: String, index: true, sparse: true, trim: true },
    company: { type: String, required: true, index: true, trim: true },
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    postcode: { type: String, required: true, trim: true },
    babyboxId: { type: Schema.Types.ObjectId, ref: "Babybox", index: true },
    flags: {
      isEmailSent: { type: Boolean, default: false },
      isDonor: { type: Boolean, default: false },
      isMayor: { type: Boolean, default: false },
    },
    donated: { type: Number },
  },
  { timestamps: true }
);

schema.index({ babyboxId: 1, email: 1 }, { unique: true, sparse: true });
schema.index({ babyboxId: 1, company: 1 }, { unique: true });

export const AddressModel = model<Address>("Address", schema);
