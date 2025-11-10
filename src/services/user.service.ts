import { IUser, User } from "../models/user.model";

export class UserService{

    async createUser(data: Pick<IUser, "username" | "name" | "email" | "password">) {

        const usernameExists = await User.findOne({username: data.username})
        const emailExists = await User.findOne({email: data.email})

        if(usernameExists || emailExists){
            const error = new Error("Usuário com e-mail ou username cadastrado");
            (error as any).statusCode = 400
            throw error
        }

        const user = new User(data)
        await user.save()

        return user
    }
}