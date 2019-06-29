const fp = require("fastify-plugin")
const pathToRegexp = require("path-to-regexp")

function plugin(fastify, _, next) {
  const routes = new Map()

  function reverse(name, args, opts) {
    const toPath = routes.get(name)

    if (!toPath) {
      throw new Error(`Route with name ${name} is not registered`)
    }

    return toPath(args, opts)
  }

  fastify.decorate("reverse", reverse)

  fastify.addHook("onRoute", routeOptions => {
    if (routeOptions.name) {
      if (routes.has(routeOptions.name)) {
        throw new Error(
          `Route with name ${routeOptions.name} already registered`,
        )
      }

      routes.set(routeOptions.name, pathToRegexp.compile(routeOptions.url))
    }
  })

  next()
}

module.exports = fp(plugin, {
  fastify: ">= 1.6.0",
  name: "reverse",
})
