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
    intro: (isProd: boolean) => boolean
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

const hoyeah = 'hhhhhhhhhhhhHHHHHHHHHHHHHHHHHHHHHHHHHHOOOOOOOOOOOOOOOOO0000000000ooo0000OOOOOOOYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEaaaaaaaaawwwWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWhhhhhhhhhhhhhhhhhHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH'

const intro = (isProd: boolean) => {
    isProd? 
    () => {
        console.log('uhhhh, Improvise!!')
        return false
    }: 
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
    return true
}

export const constants: Constants = {
    paths,
    intro
}