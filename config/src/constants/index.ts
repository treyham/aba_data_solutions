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

export interface Path {
    api: {

    }
    client: {

    }
    server: {
        plugins: string
        routes: string
    } 
}

export interface Funct {
    intro: (isProd: boolean) => boolean

}

export interface Constant {
    path: Path
    funct: Funct
}

export const path: Path = {
    api: {

    },
    client: {
        
    },
    server: {
        plugins: 'packages/server/dist/plugins',
        routes: 'packages/server/dist/routes'
    }
}

export const funct: Funct = {
    intro
}

export const constant: Constant = {
    path,
    funct
}
// TODO organize this