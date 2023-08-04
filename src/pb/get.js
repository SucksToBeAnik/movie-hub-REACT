import { pb } from "./database";

export async function getCollections(){
    try{
        const collections = await pb.collection('collections').getFullList()
        return collections
    }catch(e){
        throw new Error(e.message)
    }
}

export async function getSpecificCollectionById(id){
    try{
        const collection = await pb.collection('collections').getOne(id,{
            expand:'contents'
        })
        return collection
    }catch(e){
        throw new Error(e.message)
    }
}
export async function getSpecificContentById(id){
    try{
        const content = await pb.collection('contents').getOne(id)
        return content
    }catch(e){
        throw new Error(e.message)
    }
}

export async function getSpecificContent(contentTitle){
    try{
        const movie = await pb.collection('contents').getFirstListItem(`title="${contentTitle}"`)
        
        return movie
    }catch(e){
        if(e.status === 404)return false
        throw new Error(e.message)

    }
}

