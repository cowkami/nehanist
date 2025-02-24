import { AppService } from '../generated/proto/service_pb';
import { createClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from '@connectrpc/connect-web';

const transport = createGrpcWebTransport({
  baseUrl: import.meta.env.VITE_APP_URL,
});

export const appClient = createClient(
  AppService,
  transport,
);

