export interface Path {
  api: {
    bcba: string
    billing: string
    management: string
    rbt: string
    root: string
  }
  client: {}
  server: {
    plugins: string
    routes: string
  }
}

export interface Constant {
  path: Path
}

const apiPath = '/api'

export const path: Path = {
  api: {
    root: `${apiPath}`,
    bcba: `${apiPath}/bcba`,
    billing: `${apiPath}/billing`,
    management: `${apiPath}/management`,
    rbt: `${apiPath}/rbt`
  },
  client: {},
  server: {
    plugins: 'packages/server/dist/plugins',
    routes: 'packages/server/dist/routes'
  }
}

export const constant: Constant = {
  path,
}
// TODO organize this
