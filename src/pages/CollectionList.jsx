import { getCollections } from "../pb/get"
import { useLoaderData } from "react-router-dom"

function CollectionList() {
    const collections = useLoaderData()

    return (
        <div>
            CollectionList
        </div>
    )
}

export default CollectionList

export async function loader(){
    const collections = await getCollections()

    if(!collections) return null

    return collections

}
