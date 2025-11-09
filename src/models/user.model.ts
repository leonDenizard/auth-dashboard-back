import { timeStamp } from "console"
import { Schema, model, Document } from "mongoose"

//Criando Interface
export interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
}
//Schema mongoose define o formato no BD
const userSchema = new Schema<IUser>(

    {username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
},
    {
        timestamps: true,
    },
)

export const User = model<IUser>("User", userSchema)