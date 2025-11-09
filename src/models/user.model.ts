import { Schema, model, Document } from "mongoose"
import bcrypt from "bcrypt"

const SALT_ROUNDS = 12

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

    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    },
)

//Pre-save: hash quando cria ou quando senha é alterada
userSchema.pre("save", async function (next){
    const doc = this as IUser
    if(!doc.isModified("password")) return next()

    try {
        const hash = await bcrypt.hash(doc.password, SALT_ROUNDS)
        doc.password = hash

        next()
    } catch (error) {
        next(error as any)
    }
})

export const User = model<IUser>("User", userSchema)