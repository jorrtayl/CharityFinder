import React, { useState } from 'react'
import { Filing, Organization } from "../API/types"
import RatingReview from './Rating'
import acs from '../images/logos/american_cancer_society.png'
import fa from '../images/logos/feeding_america.png'

type FocusedOrgCardProps = {org: Organization, filing: Filing, selectOrgCallback: Function, imageUrl?: string;
    websiteUrl?: string;}



const FocusedOrgCard: React.FC<FocusedOrgCardProps> = (props: FocusedOrgCardProps) => {
    const [rating] = useState<number>(scoreToStars(0))
    // console.log(rating) // way to test rating

    let imageUrl: string | undefined;
    let websiteUrl: string | undefined;

    if (props.org.name === "American Cancer Society") {
        imageUrl = acs;
        websiteUrl = "https://www.cancer.org/";
    } else if(props.org.name === "Feeding America"){
        imageUrl = fa;
        websiteUrl = "https://www.feedingamerica.org/";
    } else {
        imageUrl = props.imageUrl;
        websiteUrl = props.websiteUrl;
    }
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="relative bg-white rounded-xl w-full sm:w-3/4 md:w-1/2 lg:w-1/3 max-h-screen overflow-y-auto p-8 shadow-lg">
            <button
                onClick={() => props.selectOrgCallback(undefined)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
                Close
            </button>

            {imageUrl && (
                <img src={imageUrl} alt={`${props.org.name} Logo`} className="mx-auto mb-4" />
            )}

            <h3 className="text-2xl font-bold mb-4 text-center">{props.org.name}</h3>
            {/* <p className="text-lg">{props.filing.totassetsend}</p> */}

            <div className="flex justify-center">
                <RatingReview rating={rating} />
            </div>

            {websiteUrl && (
                <div className="mt-4 flex justify-center">
                <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Donate
                </a>
                </div>
            )}  
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

// takes the score from Propublica and updates the star rating
function scoreToStars(score: number): number {
    const clampedScore = Math.max(0, Math.min(100, score));
    return (clampedScore / 100) * 5;
}

export default FocusedOrgCard;