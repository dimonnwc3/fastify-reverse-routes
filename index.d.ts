import * as fastify from "fastify"
import { Server, IncomingMessage, ServerResponse } from "http"
import * as https from "https"
import {
  Http2SecureServer,
  Http2Server,
  Http2ServerRequest,
  Http2ServerResponse,
} from "http2"

declare const reverse: fastify.Plugin<
  Server,
  IncomingMessage,
  ServerResponse,
  {}
>

declare module "fastify" {
  interface FastifyInstance {
    reverse<Args>(name: string, args?: Args): string
  }

  interface RouteOptions {
    name: string
  }
}

export default reverse
