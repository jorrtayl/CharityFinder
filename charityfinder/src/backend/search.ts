import { get } from "http";
import { SearchParameters } from "./types";
const ProPublicaURL = 'https://projects.propublica.org/nonprofits/api/v2';

export class PublicaSearch { 
    parameters !: SearchParameters;
    response ?: Response;

    constructor(parameters ?: SearchParameters) {
        if(parameters !== undefined) {
            this.parameters = parameters;
        }
        this.parameters = (parameters !== undefined) ? parameters : (new SearchParameters("Red Cross")); 
    }

    createParameterString() {
        let parameterString = "?";
        parameterString = parameterString + "q=" + this.parameters?.q;
        return parameterString;
    }

    async searchByName() {
        let queryString = this.createParameterString();
        
        // Need to deal with CORS policy here to receive data.
        

        console.log(this.response);
    }
}