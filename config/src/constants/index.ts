export interface Paths {
    api: {

    }
    client: {

    }
    server: {
        plugins: string
        routes: string
    }
    
}

export interface Constants {
    paths: Paths
}

export const paths: Paths = {
    api: {

    },
    client: {
        
    },
    server: {
        plugins: 'packages/server/src/plugins',
        routes: 'packages/server/src/routes'
    }
    
}

export const constants: Constants = {
    paths
}