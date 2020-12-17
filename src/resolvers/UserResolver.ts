import { getModelForClass } from "@typegoose/typegoose";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AuthResult } from "../entities/AuthResult";
import { User } from "../entities/User";
import * as bcrypt from "bcrypt";
import { generateJwt } from "../helpers";

@Resolver(User)
export class UserResolver {
    @Query(() => User)
    @Authorized()
    public async authenticatedUser(@Ctx() ctx): Promise<User> {
        return ctx.user;
    }

    @Mutation(() => AuthResult, { nullable: true })
    public async authenticate(@Arg('email') email: string, @Arg('password') password: string, @Ctx() ctx): Promise<AuthResult> {
        const model = getModelForClass(User);
        const user = await model.findOne({ email });
        
        if (user && await bcrypt.compare(password, user.password) === true) {
            const token = generateJwt({ userId: user.id });
            ctx.res.cookie('appSession', token, { maxAge: 60, httpOnly: true });
            return { token, user };
        } else {
            return null;
        }
    }

    @Mutation(() => User)
    public async createUser(@Arg('data', () => User) data: User): Promise<User> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.password, salt);
        const model = getModelForClass(User);
        return await model.create({ ...data, password: hash });
    }
}