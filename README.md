This template is in huge parts inspired or directly copied from LinusBorg's "vue-lib-monorepo-template <https://github.com/LinusBorg/vue-lib-monorepo-template>"


All commands can be run directly from the project root like:

yarn start:web
starts the vite dev server


yarn preview
starts the vite preview build server


yarn start:server
starts the backkend dev server



build
Build everything: library packages, docs and playground app

play
starts the Vite dev server for the playground app for testing playing around with your libraries manually.

During play, no bundling has to be done as all of the library package's code is compiled JIT by Vite.

