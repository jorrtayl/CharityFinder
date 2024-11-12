import React from 'react'
import { Filing, Organization } from "../API/types"

type FocusedOrgCardProps = {org: Organization, filing: Filing, selectOrgCallback: Function}

const FocusedOrgCard: React.FC<FocusedOrgCardProps> = (props: FocusedOrgCardProps) => {
    return (
        <div className="rounded-xl w-auto h-auto mx-4 my-8 shadow-lg hover:shadow-2xl">
            <button onClick={() => props.selectOrgCallback(undefined)}>Close</button>
            <h3>{props.org.name}</h3>
            <p>{props.filing.totassetsend}</p>
        </div>
    )
}

export default FocusedOrgCard;