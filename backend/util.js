export function orgs_to_OrgArray(json) {
    if(JSON.stringify(json) === '{}') {
        return '{}'
    }
    const orgs = [];
    const org_count = json['total_results'];
    if(org_count <= 0) {
        return orgs;
    } else if(org_count < 9) {
        for(let i = 0; i < org_count; i++) {
            let rawOrg = json["organizations"][i];
            let org = {};
            orgJSON_to_orgOBJ(rawOrg, org);
            orgs.push(org);
        }
    }
    else {
        for(let i = 0; i < 9; i++) {
            let rawOrg = json["organizations"][i];
            let org = {};
            orgJSON_to_orgOBJ(rawOrg, org);
            orgs.push(org);
        } 
    }
    return orgs
}

export function filing_to_FilingObj(json) {
    if(JSON.stringify(json) === '{}') {
        return {};
    }
    var ein_filing = {};
    let org = json["organization"];
    if(org === null) {
        return ein_filing;
    }
    else {
        const latest_filing = json["filings_with_data"][0];
        filingJSON_to_filingOBJ(latest_filing, ein_filing);
    }
    return ein_filing
}

export function pick_random_orgs(json) {
    if(JSON.stringify(json) === '{}') {
        return '{}'
    }
    const org_count = json["total_results"];
    let orgs = [];
    const rawOrgArr = json["organizations"];
    while(orgs.length < 9) {
        let randomNum = Math.floor(Math.random() * (org_count - 1))
        if(!check_already_add(orgs, rawOrgArr[randomNum])) {
            orgs.push(rawOrgArr[randomNum])
        }
    }

    orgs = orgs.reverse()
    orgs.pop()
    orgs = orgs.reverse()

    return orgs
}

function check_already_add(orgArr, org) {
    for(let i = 0; i < orgArr.length; i++) {
        if(org === orgArr[i]) {
            return true;
        }
    }
    return false;
}

function orgJSON_to_orgOBJ(src, dest) {
    dest.ein = src.ein
    dest.strein = src.strein;
    dest.name = src.name;
    dest.sub_name = ((src.sub_name !== undefined) ? (src.sub_name) : undefined);
    dest.ntee_code = ((src.ntee_code !== 10) ? (src.ntee_code) : undefined);
    dest.guidestar_url = ((src.guidestar_url !== undefined) ? (src.guidestar_url) : undefined);
    dest.nccs_url = ((src.nccs_url !== undefined) ? (src.nccs_url) : undefined);
    dest.updated = ((src.updated !== undefined) ? (src.updated) : undefined);
    dest.score = ((src.score !== undefined) ? (src.score) : (-1))
}

function filingJSON_to_filingOBJ(src, dest) {
    dest.totrevenue = ((src.totrevenue !== undefined) ? (src.totrevenue) : (undefined));
    dest.totfuncexpns = ((src.totfuncexpns !== undefined) ? (src.totfuncexpns) : (undefined));
    dest.totassetsend = ((src.totassetsend !== undefined) ? (src.totassetsend) : (undefined));
    dest.totliabend = ((src.totliabend !== undefined) ? (src.totliabend) : (undefined));
    dest.pct_compnsatncurrofcr = ((src.pct_compnsatncurrofcr !== undefined) ? (src.pct_compnsatncurrofcr) : (undefined));
    dest.pdf_url = ((src.pdf_url !== undefined) ? (src.pdf_url) : (undefined));
}