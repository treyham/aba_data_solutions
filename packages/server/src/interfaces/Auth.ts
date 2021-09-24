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
  export interface AuthOpts {
    // Specify Support plugin options here
    session: FastifySessionOpts
  }