/** entities/Message.ts */
import { Field, InputType, ObjectType } from "type-graphql";
import { GraphQLUpload } from 'apollo-server-express';

@ObjectType()
export class MediaFile {
    @Field()
    filename: string;

    @Field()
    publicUrl: string;

    path: string;
}

@InputType()
export class MediaFileInput {
    @Field(() => GraphQLUpload)
    file;
}