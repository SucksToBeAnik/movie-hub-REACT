import { pb } from "./database";

export async function getCollections(username){
    try{
        const collections = await pb.collection('collections').getFullList({
            filter:`profile.username ="${username}"`
        })
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

export async function getCurrentUsername(){
    try{
        const username = await pb.authStore.model?.username
        if(username){
            return username
        }else{
            return false
        }
    }catch(e){
        throw new Error(e.message)
    }
}


export async function getCurrentProfile(){
    try{
        const currentUsername = await getCurrentUsername()
        if(currentUsername){
            const profile = await pb.collection('profiles').getFirstListItem(`username="${currentUsername}"`)
            return profile
        }else{
            throw new Error("Your profile does not exist")
        }
    }catch(e){
        throw new Error(e.message)
    }
}

