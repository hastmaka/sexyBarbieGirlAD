export const HandeError = (e) => {
    if(typeof e === 'string') {
        return console.log(e)
    }
    console.log(`Status ${e.response.request.status}, ${e.response.data.error}`)
}