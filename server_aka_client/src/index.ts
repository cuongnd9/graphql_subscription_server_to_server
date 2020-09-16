import ws from 'ws';
import { logger } from 'juno-js';
import {SubscriptionClient } from 'subscriptions-transport-ws';

const SUBSCRIPTION = `
subscription {
  messageSent {
    id
    content
    from
    createdAt
  }
}
`;

const wsClient = new SubscriptionClient(`ws://localhost:7000/graphql`, {
    reconnect: true,
    connectionParams: {
      // 'access-token': '',
    },
}, ws);

wsClient.request({ query: SUBSCRIPTION }).subscribe({
  next: (value) => {
    logger.info('----value----', value);
  },
  error: (err) => {
    logger.error('----error-----', err);
  },
  complete: () => {
    logger.info('----complete-----');
  },
});
