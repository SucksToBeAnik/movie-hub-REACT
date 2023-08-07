import { pb } from "./database";

export async function deleteCollectionById(id){
    try{
        await pb.collection('collections').delete(id)
        
    }catch(e){
        throw new Error(e.message)
    }
}

export async function deleteContentFromCollection(collectionId,contentId){
    try{
        const collection = await pb.collection('collections').getOne(collectionId)
        const contents = collection.contents
        const updatedContents = contents.filter(content=>content !== contentId)

        await pb.collection('collections').update(collectionId,{
            contents:updatedContents
        })
    }catch(e){
        throw new Error(e.message)
    }

}