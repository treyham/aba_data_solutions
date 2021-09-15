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
        plugins: 'packages/server/dist/plugins',
        routes: 'packages/server/dist/routes'
    }
    
}

export const constants: Constants = {
    paths
}