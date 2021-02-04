/** resolvers/MessageResolver.ts */
import { Message } from "../entities/Message";
import { Arg, Authorized, Int, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription } from "type-graphql";

@Resolver(Message)
export class MessageResolver {
    private messages: Message[] = [];

    @Query(() => [Message])
    public async getAll(): Promise<Message[]> {
        return this.messages;
    }

    @Mutation(() => Message)
    public async createMessage(@Arg('data', () => Message) data: Message): Promise<Message> {
        this.messages.push(data);
        return data;
    }
}