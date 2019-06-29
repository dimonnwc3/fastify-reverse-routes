const Fastify = require("fastify")
const fastifyReverseRoutes = require("./index")

let fastify

beforeEach(async () => {
  fastify = Fastify()
})

afterEach(async () => {
  await fastify.close()
})

describe("Reverse routes", () => {
  it("Add reverse method", async () => {
    await fastify.register(fastifyReverseRoutes).ready()

    expect(fastify.reverse).toBeDefined()
    expect(typeof fastify.reverse).toBe("function")
  })

  it("Reverse pattern to path", async () => {
    await fastify
      .register(fastifyReverseRoutes)
      .route({
        url: "/frameworks/:name",
        method: "GET",
        name: "frameworks",
        handler: () => {},
      })
      .ready()

    expect(fastify.reverse("frameworks", { name: "fastify" })).toBe(
      "/frameworks/fastify",
    )
  })

  it("Plugin throws for duplicated routes", async () => {
    try {
      await fastify
        .register(fastifyReverseRoutes)
        .route({
          url: "/frameworks/:name",
          method: "GET",
          name: "frameworks",
          handler: () => {},
        })
        .route({
          url: "/frameworks/:name",
          method: "GET",
          name: "frameworks",
          handler: () => {},
        })
        .ready()
    } catch (err) {
      expect(err).toBeDefined()
    }
  })

  it("Reverse throws for non registered route", async () => {
    await fastify
      .register(fastifyReverseRoutes)
      .route({
        url: "/frameworks/:name",
        method: "GET",
        handler: () => {},
      })
      .ready()

    expect(() => {
      expect(fastify.reverse("frameworks", { name: "fastify" })).toBe(
        "/frameworks/fastify",
      )
    }).toThrow()
  })
})
