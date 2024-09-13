import axios from 'axios'
const backend_uri: String = "http://localhost:8123"

export function searchByName(name: String): Promise<JSON> {
    return axios.get(`${backend_uri}/search/${name}`)
        .then(res => res.data)
        .then(json => json)
}

// export function financialData(ein: Number): Promise<JSON> {
    
// }