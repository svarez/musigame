export const Api = async(url) => {
        
    const resp = await fetch(url)
    .catch( err => {
        err.text().then( errorMessage => {
        this.props.dispatch(console.log(errorMessage))
        //ToDo displayTheError
        })
    })
    const data = await resp.json()
    .catch( err => {
        err.text().then( errorMessage => {
        this.props.dispatch(console.log(errorMessage))
        //ToDo displayTheError
        })
    })
    if(!data.error)
    return data;

}