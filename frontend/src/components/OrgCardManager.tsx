import React, {useEffect, useState} from 'react'
import { Filing, Organization } from "../API/types"
import OrgCard from './OrgCard'
import FocusedOrgCard from './FocusedOrgCard';
import { financialData } from '../API/search';

type OrgCardManagerProps = {orgs: Array<Organization>}

const OrgCardManager: React.FC<OrgCardManagerProps> = (props: OrgCardManagerProps) => {
    let searchedOrgs = props.orgs;
    const [selectedOrg, setSelectedOrg] = useState<Organization | undefined>(undefined);
    const [selectedFiling, setSelectedFiling] = useState<Filing>({} as Filing);
    useEffect(() => {
        if(selectedOrg !== undefined) {
            financialData(selectedOrg.ein).then((data) => {
                setSelectedFiling(data)
            }).catch(error => console.error(error))
        }
    }, [selectedOrg])

    return (
        (selectedOrg === undefined ? (<div className='w-3/4 text-center'>
            {
                (searchedOrgs.length === 0) ? (
                    null
                ) : (
                    <div className='grid grid-cols-3 gap-2 w-fit'>
                    {
                        searchedOrgs.map((org) => {
                            return (<OrgCard org={org} selectOrgCallback={setSelectedOrg}/>)
                        })
                    }
                    </div>
                )
            }
    </div>) : (
        <FocusedOrgCard org={selectedOrg} filing={selectedFiling} selectOrgCallback={setSelectedOrg}/>
    )))
}

export default OrgCardManager;
