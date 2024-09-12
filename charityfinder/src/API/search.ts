const backend_uri: String = "http://localhost:8123"

export function searchByName(name: String): Promise<JSON> {
    return fetch(`${backend_uri}/search/${name}`)
        .then(res => res.json())
        .then(json => json)
}

// export function financialData(ein: Number): Promise<JSON> {
    
// }