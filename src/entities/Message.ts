/** entities/Message.ts */
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType('Message')
@InputType('MessageInput')
export class Message {
    @Field()
    message: string;

    @Field()
    userName: string;
}