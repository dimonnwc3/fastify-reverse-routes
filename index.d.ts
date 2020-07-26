import * as fastify from "fastify"
import { Server, IncomingMessage, ServerResponse } from "http"
import { PathFunction } from "path-to-regexp"

declare const routes: Map<string, PathFunction<object>>

declare function reverse<Args>(name: string, args?: Args): string

declare const plugin: fastify.Plugin<
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
export { plugin, routes }
