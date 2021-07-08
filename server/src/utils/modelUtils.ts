export const nameToHandle = (name: string) => {
    return name.toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
}