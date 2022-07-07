import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
},
);

export interface User extends mongoose.Document{
    id: String;
    email: String;
    password: String;
    isAdmin: Boolean;
}