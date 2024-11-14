import React from 'react'
import { Filing, Organization } from "../API/types"

type FocusedOrgCardProps = {org: Organization, filing: Filing, selectOrgCallback: Function}

const FocusedOrgCard: React.FC<FocusedOrgCardProps> = (props: FocusedOrgCardProps) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white rounded-xl w-full sm:w-3/4 md:w-1/2 lg:w-1/3 max-h-screen overflow-y-auto p-8 shadow-lg">
                <button
                onClick={() => props.selectOrgCallback(undefined)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                >
                Close
                </button>
                <h3 className="text-2xl font-bold mb-4">{props.org.name}</h3>
                <p className="text-lg">{props.filing.totassetsend}</p>
                
            </div>
        </div>

        // Below is the previous focused organization card in case we need to revert.
        // <div className="rounded-xl w-auto h-auto mx-4 my-8 shadow-lg hover:shadow-2xl">
        //     <button onClick={() => props.selectOrgCallback(undefined)}>Close</button>
        //     <h3>{props.org.name}</h3>
        //     <p>{props.filing.totassetsend}</p>
        // </div>
    )
}

export default FocusedOrgCard;