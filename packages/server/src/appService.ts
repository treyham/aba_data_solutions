import AutoLoad, {AutoloadPluginOptions} from 'fastify-autoload';
import { FastifyPluginAsync } from 'fastify';
import { config } from '@app/config'

console.log('appService')

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const appService: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
  // Place here your custom code!
  var hoyeah = 'hhhhhhhhhhhhHHHHHHHHHHHHHHHHHHHHHHHHHHOOOOOOOOOOOOOOOOO0000000000ooo0000OOOOOOOYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEaaaaaaaaawwwWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWhhhhhhhhhhhhhhhhhHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH'

  config.isProd? 
    console.log('uhhhh, Improvise!!'): 
    async () => {
      console.log('ok, develop time')
      await new Promise(r => setTimeout(r, 1400))
      console.log('uhhm')
      await new Promise(r => setTimeout(r, 666))
      console.log('uuuuhhhurrrhhhh')
      await new Promise(r => setTimeout(r, 2000))
      console.log('can i get a \'ho yeah\'')
      await new Promise(r => setTimeout(r, 300))
      console.log('yeah')
      await new Promise(r => setTimeout(r, 50))
      console.log('go')
      async () => {
        [...hoyeah].forEach(async char => {
          await new Promise(r => setTimeout(r, Math.random() * (50 - 10) + 10))
          console.log(char)
        })
      }
    }
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: config.paths.server.plugins,
    options: opts
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: config.paths.server.routes,
    options: opts
  })

};

export default appService;
export { appService }
