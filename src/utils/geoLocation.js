function getLocation() {
    let promise = new Promise((resolve, reject) => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
            })
        } else {
            reject({ lat: null, lng: null })
        }
    })
    return promise
}

export default getLocation