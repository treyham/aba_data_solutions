import cookie, { FastifyCookieOpts } from 'fastify-cookie'
import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'

export interface FastifySessionOpts {
  secret: string
  saveUninitialized: boolean
  cookie: FastifyCookieOpts
}

// TODO AuthPluginOptions interface
export interface AuthPluginOpts {
  // Specify Support plugin options here
  session: FastifySessionOpts
  cookie: FastifyCookieOpts
}

console.log('auth')
// The use of fastify-plugin is required to be able to export the decorators to the outer scope
// fn: FastifyPluginAsync<DbPluginOpts, Server>, options?: PluginMetadata | undefined): FastifyPluginAsync<...>
export default fp<AuthPluginOpts>(
  async (fastify: FastifyInstance, opts: AuthPluginOpts) => {
    console.log('auth plugins')
    const cookieOpts = opts.cookie

    fastify.decorate('auth', async () => {
      await fastify.register(cookie, cookieOpts)
        
      })
   
  })
// })
  
  // (plugin: FastifyPluginAsync<Options, Server>, opts?: FastifyRegisterOptions<Options> | undefined): FastifyInstance<...> & PromiseLike<...>

