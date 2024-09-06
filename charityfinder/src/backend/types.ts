export enum Tag {
    Culture = 1,
    Education,
    Environment,
    Health,
    HumanServices,
    International,
    Society,
    Religion,
};

export interface Organization {
    ein?: Number,
    strein?: String,
    name: String,
    sub_name: String,
    address: String,
    city: String,
    state: String,
    zipcode: String
    subseccd: Number, 
    ntee_code: String,
    guidestar_url: String,
    nccs_url: String,
    updated: String,
};

export interface Filing {
    ein?: Number,
    tax_prd: Number,
    tax_prd_yr: Number,
    formtype: Number,
    pdf_url?: String,
    updated?: String,
    organization?: Organization,
    totrevenue?: Number,
    totfuncexpns?: Number,
    totassetsend?: Number,
    totliabend?: Number,
    pct_compnsatncurrofcr?: Number,
};


export interface SearchByNameResponse {
    total_results: Number,
    num_page?: Number,
    cur_page?: Number,
    per_page?: Number,
    page_offset?: Number,
    search_query?: String,
    selected_state?: String,
    selected_ntee?: Number,
    selected_code?: Number,
    data_source?: String,
    api_version?: Number,
    organizations?: [Organization],
};

export interface SearchByEINResponse {
    organization: Organization,
    data_source: String,
    api_version: Number,
    filings_with_data: [Filing],
    filings_without_data: [Filing],
};

export class SearchParameters {
    q!: String;
    ntee_id?: Tag;
    constructor(q : String) {
        if(q !== undefined) {
            this.q = q;
        }

        this.ntee_id = undefined;
    }

    setQuery(q: String) {
        this.q = q;
    }

    setTag(tag: Tag) {
        this.ntee_id = tag;
    }
};

export default SearchParameters;