import { prop } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType('User')
@InputType('UserInput')
export class User {
    @Field()
    @prop()
    email: string;

    @Field()
    @prop()
    password: string;
}