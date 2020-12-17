import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class AuthResult {
    @Field()
    token: string;

    @Field(() => User)
    user: User;
}