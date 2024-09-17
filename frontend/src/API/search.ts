import axios from 'axios'
import { Organization, Filing} from './types';
const backend_uri: String = "http://localhost:8123"

export function searchByName(name: String): Promise<Organization[]> {
    return axios.get(`${backend_uri}/search/${name}`)
        .then(res => res.data)
        .then(json => {
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

function orgJSON_to_orgOBJ(src: any, dest: Organization) {
    dest.ein = src.ein;
    dest.strein = src.strein;
    dest.name = src.name;
    dest.sub_name = src.sub_name;
    dest.ntee_code = src.ntee_code;
    dest.guidestar_url = src.guidestar_url;
    dest.nccs_url = src.nccs_url;
    dest.updated = src.updated;
}

function filingJSON_to_filingOBJ(src: any, dest: Filing) {
    dest.totrevenue = src.totrevenue;
    dest.totfuncexpns = src.totfuncexpns;
    dest.totassetsend = src.totassetsend;
    dest.totliabend = src.totliabend;
    dest.pct_compnsatncurrofcr = src.pct_compnsatncurrofcr;
    dest.pdf_url = src.pdf_url;
}