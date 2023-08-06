import { pb } from "./database";

export async function deleteCollectionById(id){
    try{
        await pb.collection('collections').delete(id)
        // const collections = await pb.collection('collections').getFullList()
        // console.log(collections.length)
    }catch(e){
        throw new Error(e.message)
    }
}