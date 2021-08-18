# ABA Data Solutions MonoRepo or:
###### *how I learned to stop worrying and love webdev*

## Packages
* common
* server
* vueApp

*All commands can be run directly from the project root like:*

### **Getting Started**

```
// clone the repo 
```
### Development
```
yarn dev                // start vite dev server and backend dev server 
```
### Deploy
```
yarn build              // build vueApp and prodServer
```

# SQL GraphQL Server w/ fastify-graphql (SDL-first) & SQL
[I made it up](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-fastify-sdl-first)

*During server dev, changes update on save, as typescript is watched and compiled to dist folder, where nodemon runs entry point*
### Development
```
yarn web:dev            // start vite dev server 
```
```
yarn web:preview        // start vite preview server
```
## Recommended IDE Setup

* [VSCode](https://code.visualstudio.com/) 
    * [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) Make sure to enable `vetur.experimental.templateInterpolationService` in settings!
    * [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) Make sure to enable `js/ts.implicitProjectConfig.experimentalDecorators` in settings!


# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite.

*During web dev, no bundling has to be done as all of the library package's code is compiled JIT by Vite.*
### Development
```
yarn web:dev            // start vite dev server 
```
```
yarn web:preview        // start vite preview server
```

### Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can use the following:

### If Using Volar

Run `Volar: Switch TS Plugin on/off` from VSCode command palette.

### If Using Vetur

1. Install and add `@vuedx/typescript-plugin-vue` to the [plugins section](https://www.typescriptlang.org/tsconfig#plugins) in `tsconfig.json`
2. Delete `src/shims-vue.d.ts` as it is no longer needed to provide module info to Typescript
3. Open `src/main.ts` in VSCode
4. Open the VSCode command palette
5. Search and run "Select TypeScript version" -> "Use workspace version"

##### This template is in huge parts inspired or directly copied from:
* LinusBorg's [vue-lib-monorepo-template](https://github.com/LinusBorg/vue-lib-monorepo-template)
* Prisma's [example](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-fastify-sdl-first)
* Ben Awad's 
    * [Fullstack Tut](https://www.youtube.com/watch?v=I6ypD7qv3Z8&t=0s)
    * And much much [more...](https://www.youtube.com/channel/UC-8QAzbLcRglXeN_MY9blyw)
* bytefish's 
    * [Writeup](https://javascript.plainenglish.io/set-up-vue3-enterprise-level-development-environments-with-vite-step-by-step-guide-32964d1df60e)
    * [github](https://github.com/BytefishMedium/vite-vue3-starter)
* Tomasz Waraksa's
    * [Writeup](https://letsdebug.it/post/12-monorepo-with-vue-vite-lerna/)


