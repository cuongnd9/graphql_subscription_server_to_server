import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
const CHAT_CHANNEL = 'ABC_XYZ';
let chats: any[] = [];

const resolver = {
  Query: {
    chats: () => chats,
  },

  Mutation: {
    createChat: (_: any, { content, from }: any) => {
      const id = `_${
        Math.random()
          .toString(36)
          .substr(2, 9)}`;
      const chat = {
        id,
        from,
        content,
        createdAt: new Date().toISOString(),
      };

      chats = [chat, ...chats];
      chats = chats.splice(0, 8);
      pubsub.publish(CHAT_CHANNEL, { messageSent: chat });

      return chat;
    },
  },

  Subscription: {
    messageSent: {
      subscribe: () => pubsub.asyncIterator(CHAT_CHANNEL),
    },
  },
};

export default resolver;
