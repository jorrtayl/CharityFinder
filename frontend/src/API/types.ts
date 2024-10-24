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
    ein: Number,
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
    totrevenue: Number,
    totfuncexpns: Number,
    totassetsend: Number,
    totliabend: Number,
    pct_compnsatncurrofcr: Number,
    pdf_url: String,
}
