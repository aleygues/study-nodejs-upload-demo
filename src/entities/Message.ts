/** entities/Message.ts */
import { prop } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType('Message')
@InputType('MessageInput')
export class Message {
    @Field()
    @prop()
    message: string;

    @Field()
    @prop()
    userName: string;
}