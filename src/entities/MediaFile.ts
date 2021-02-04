/** entities/Message.ts */
import { Field, InputType, ObjectType } from "type-graphql";
import { GraphQLUpload } from 'apollo-server-express';
import { prop } from "@typegoose/typegoose";

@ObjectType()
export class MediaFile {
    @Field()
    @prop()
    filename: string;

    @Field()
    @prop()
    publicUrl: string;

    @prop()
    path: string;
}

@InputType()
export class MediaFileInput {
    @Field(() => GraphQLUpload)
    file;
}