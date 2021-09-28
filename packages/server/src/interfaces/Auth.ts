interface FastifySessionOpts {
    cookieName: string
    secret: string
    cookie: {
      httpOnly: boolean
      secure: boolean,
      expires: Date
    }
    saveUninitialized: boolean
}
  
  // TODO AuthPluginOptions interface
  export interface AuthPlugOpts {
    // Specify Support plugin options here
    session: FastifySessionOpts
  }

  export interface AuthPropOpts {
    
  }