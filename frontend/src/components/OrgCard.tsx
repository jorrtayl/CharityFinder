import { Organization } from "../API/types"

type OrgCardProps = {org: Organization}

const OrgCard: React.FC<OrgCardProps> = (props: OrgCardProps) => {
    return (
        <div className="rounded-xl w-auto h-auto mx-4 my-8 shadow-lg hover:shadow-2xl">
            <h3 className="text-center mt-2 px-6 drop-shadow">
                {props.org.name}
            </h3>
            <p className="text-center py-4 m-0">
                Mission Statement
            </p>
            <div className="flex justify-center ">
                <button className="mt-0 mb-4 mx-4 bg-cyan-200 rounded-3xl px-8 py-2 hover:ring-4 ring-offset-0 ring-cyan-300">
                    Show More
                </button>
            </div>
        </div>
    )
}

export default OrgCard;