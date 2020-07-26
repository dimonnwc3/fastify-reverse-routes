# fastify-reverse-routes

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/) [![Build Status](https://travis-ci.org/dimonnwc3/fastify-reverse-routes.svg?branch=master)](https://travis-ci.org/dimonnwc3/fastify-reverse-routes)

Fastify reverse routes plugin, with this you can generate path using your route name and arguments.

## Install

### NPM

```
npm i fastify-reverse-routes
```

### Yarn

```
yarn add fastify-reverse-routes
```

## Usage

Add it to your project with `register` and you are done!

```js
const fastify = require("fastify")()

fastify.register(require("fastify-reverse-routes").plugin)

fastify.route({
  url: "/frameworks/:name",
  method: "GET",
  name: "frameworks",
  handler: async () => {
    reply.send(fastify.reverse("frameworks", { name: "fastify" })) // /frameworks/fastify
  },
})

fastify.listen(3000)
```

## Reference

This plugin decorates the `fastify` instance with a `reverse` function. That function accepts
following arguments:

- `name` name of your route
- `arguments` values to fill placeholders
- `options` additional options [path-to-regexp](https://github.com/pillarjs/path-to-regexp#compile-reverse-path-to-regexp)

## License

Licensed under [MIT](./LICENSE).
