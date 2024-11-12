import axios from 'axios'
import { Organization, Filing, Tag} from './types';
const backend_uri: String = "http://localhost:3000"

export function searchByName(name: String): Promise<Organization[]> {
    return axios.get(`${backend_uri}/search/${name}`)
        .then(res => {
            console.log(JSON.parse(res.data))
            return JSON.parse(res.data)
    })
}

export function searchByNameAndGroup(name: String, tag: Tag): Promise<Organization[]> {
    return axios.get(`${backend_uri}/search/${name}/${tag}`)
        .then(res => JSON.parse(res.data))
}

export function financialData(ein: Number): Promise<Filing> {
    return axios.get(`${backend_uri}/organization/${ein}`)
        .then(res => JSON.parse(res.data))
}

export function groupSearch(tag: Tag): Promise<Organization[]> {
    return axios.get(`${backend_uri}/group/${tag}`)
        .then(res => JSON.parse(res.data))
}