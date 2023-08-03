import { pb } from "./database";
import { ClientResponseError } from "pocketbase";

export async function getCollections(){
    try{
        const data = await pb.collection('collections').getFullList()
        return data
    }catch(e){
        console.log(e)
        throw new Error(e.message)
    }
}