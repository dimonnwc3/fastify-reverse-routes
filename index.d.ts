import * as fastify from "fastify"
import { Server, IncomingMessage, ServerResponse } from "http"

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
