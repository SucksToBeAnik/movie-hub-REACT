import { getCollections } from "../pb/get"
import { useLoaderData } from "react-router-dom"

function CollectionList() {
    const collections = useLoaderData()

    return (
        <div>
            {collections.map(c=><h1 key={c.id}>{c.title}</h1>)}
        </div>
    )
}

export default CollectionList

export async function loader(){
    const collections = await getCollections()

    if(!collections) return null

    return collections

}
