# ABA Data Solutions MonoRepo or
*how I learned to stop worrying and love webdev*

## Packages
* common
* server
* vueApp

## Commands
*All commands can be run directly from the project root like:*

### **dev**

```
yarn start      // start vite dev server and backend dev server 
```

#### Web
*During web dev, no bundling has to be done as all of the library package's code is compiled JIT by Vite.*
```
yarn start:web      // start vite dev server 
```
```
yarn preview        // start vite preview server
```

#### Server
```
yarn start:server     // starts backend dev server
```

### **Build**
```
yarn build:vueApp      // build vueApp with vite
```

##### This template is in huge parts inspired or directly copied from:
* LinusBorg's [vue-lib-monorepo-template](https://github.com/LinusBorg/vue-lib-monorepo-template)
* Ben Awad's 
    * [Fullstack Tut](https://www.youtube.com/watch?v=I6ypD7qv3Z8&t=0s)
    * And much much [more...](https://www.youtube.com/channel/UC-8QAzbLcRglXeN_MY9blyw)
* bytefish's 
    * [Writeup](https://javascript.plainenglish.io/set-up-vue3-enterprise-level-development-environments-with-vite-step-by-step-guide-32964d1df60e)
    * [github](https://github.com/BytefishMedium/vite-vue3-starter)
* Tomasz Waraksa's
    * [Writeup](https://letsdebug.it/post/12-monorepo-with-vue-vite-lerna/)


