import PocketBase from 'pocketbase'

const pocketbase_url = import.meta.env.VITE_POCKETBASE_URL

export const pb = new PocketBase(pocketbase_url)