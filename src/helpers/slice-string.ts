
export const sliceStringBase64 = (path:string) => {
    return path.slice(path.indexOf(':') + 1, path.indexOf(';'))
}