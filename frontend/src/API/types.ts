export enum Tag {
    Culture = 1,
    Education,
    Environment,
    Health,
    Human_Services,
    International,
    Society,
    Religion,
};

export interface Organization {
    ein: number,
    strein: String,
    name: String,
    sub_name: String,
    // address: String,
    // city: String,
    // state: String,
    // zipcode: String,
    // subseccd: Number,
    ntee_code: String,
    guidestar_url: String,
    nccs_url: String,
    updated: String
}

export interface Filing {
    totrevenue: number,
    totfuncexpns: number,
    totassetsend: number,
    totliabend: number,
    pct_compnsatncurrofcr: number,
    pdf_url: String,
}
