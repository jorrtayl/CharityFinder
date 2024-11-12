import axios from 'axios'
import { Organization, Filing, Tag} from './types';
const backend_uri: String = "http://localhost:3000"

export function searchByName(name: String): Promise<Organization[]> {
    return axios.get(`${backend_uri}/search/${name}`)
        .then(res => res.data)
        .then(json => {
            if(JSON.stringify(json) === '{}') {
                return new Array<Organization>();
            }
            var orgs: Array<Organization> = new Array<Organization>();
            const org_count = json["total_results"];
            if(org_count <= 0) {
                return orgs;
            }
            else if(json["total_results"] < 3) {
                let rawOrg = json["organizations"][0];
                let org = {} as Organization;
                orgJSON_to_orgOBJ(rawOrg, org);
                orgs.push(org);
            }
            else {
                for(let i = 0; i < 3; i++) {
                    let rawOrg = json["organizations"][i];
                    let org = {} as Organization;
                    orgJSON_to_orgOBJ(rawOrg, org);
                    orgs.push(org);
                }  
            }
            return orgs; 
        }).then(orgs => orgs);
    
}

export function financialData(ein: Number): Promise<Filing> {
    return axios.get(`${backend_uri}/organization/${ein}`)
        .then(res => res.data)
        .then(json => {
            if(JSON.stringify(json) === '{}') {
                return {} as Filing;
            }
            var ein_filing: Filing = {} as Filing;
            let org = json["organization"];
            if(org === null) {
                return ein_filing;
            }
            else{
                const latest_filing = json["filings_with_data"][0];
                filingJSON_to_filingOBJ(latest_filing, ein_filing);
            }
            return ein_filing
        }).then(filing => filing)
}

export function keywordSearch(tag: Tag, amount: number): Promise<Organization[]> {
    return axios.get(`${backend_uri}/keysearch/${tag}`)
        .then(res => res.data)
        .then(json => {
            if(JSON.stringify(json) === '{}') {
                return new Array<Organization>();
            }
            var orgs: Array<Organization> = new Array<Organization>();
            if(amount > 25) {
                amount = 25
            }
            if(amount < 0) {
                amount = 25
            }
            for(let i = 0; i < amount; i++) {
                let rawOrg = json["organizations"][i];
                let org = {} as Organization;
                orgJSON_to_orgOBJ(rawOrg, org);
                orgs.push(org);
            }
            return orgs
        }).then(orgs => orgs)
}

function orgJSON_to_orgOBJ(src: any, dest: Organization) {
    dest.ein = src.ein
    dest.strein = src.strein;
    dest.name = src.name;
    dest.sub_name = ((src.sub_name !== undefined) ? (src.sub_name) : undefined);
    dest.ntee_code = ((src.ntee_code !== 10) ? (src.ntee_code) : undefined);
    dest.guidestar_url = ((src.guidestar_url !== undefined) ? (src.guidestar_url) : undefined);
    dest.nccs_url = ((src.nccs_url !== undefined) ? (src.nccs_url) : undefined);
    dest.updated = ((src.updated !== undefined) ? (src.updated) : undefined);
}

function filingJSON_to_filingOBJ(src: any, dest: Filing) {
    dest.totrevenue = ((src.totrevenue !== undefined) ? (src.totrevenue) : (undefined));
    dest.totfuncexpns = ((src.totfuncexpns !== undefined) ? (src.totfuncexpns) : (undefined));
    dest.totassetsend = ((src.totassetsend !== undefined) ? (src.totassetsend) : (undefined));
    dest.totliabend = ((src.totliabend !== undefined) ? (src.totliabend) : (undefined));
    dest.pct_compnsatncurrofcr = ((src.pct_compnsatncurrofcr !== undefined) ? (src.pct_compnsatncurrofcr) : (undefined));
    dest.pdf_url = ((src.pdf_url !== undefined) ? (src.pdf_url) : (undefined));
}