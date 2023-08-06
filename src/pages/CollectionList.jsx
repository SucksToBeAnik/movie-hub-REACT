import { getCollections } from "../pb/get";
import { Link, useLoaderData } from "react-router-dom";
import { AiOutlinePlusCircle, AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useState } from "react";
import CreateCollection from "../components/CreateCollection";
import DeleteConfirmation from "../components/DeleteConfirmation";
import { deleteCollectionById } from "../pb/delete";

function CollectionList() {
  const [showCreateCollection, setShowCreateCollection] = useState(false);

  const collections = useLoaderData();

  return (
    <div className="relative px-2 py-4">
      {showCreateCollection && (
        <CreateCollection setShowCreateCollection={setShowCreateCollection} />
      )}

      <div className="mb-8 mt-4 flex items-center justify-center ">
        <button
          onClick={() => setShowCreateCollection(true)}
          className="text-md flex items-center justify-between gap-2 rounded bg-blue-400 p-2 text-white shadow"
        >
          <span>New Collection</span>
          <AiOutlinePlusCircle />
        </button>
      </div>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {collections.map((collection) => {
          return (
            <Collection
              key={collection.id}
              collection={collection}
            />
          );
        })}
      </ul>
    </div>
  );
}

function Collection({ collection }) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);


  return (
    <li className="flex flex-col items-start justify-center gap-y-4 rounded p-2 shadow">

      {showDeleteConfirmation && (
        <DeleteConfirmation
          setShowDeleteConfirmation={setShowDeleteConfirmation}
          handleDelete={async ()=>{
            try{
              await deleteCollectionById(collection.id)
            }catch(e){
              throw new Error(e.message)
            }
            
          }}
          navigateTo='/collections/'
        />
      )}

      <div className="flex items-center justify-center gap-2">
        <h1 className="font-bold">{collection.title}</h1>
        <span className="rounded bg-blue-400 px-[3px] py-[1px] text-sm text-white">
          {collection.contents.length}
        </span>
      </div>

      {collection?.body ? (
        <p>{collection.body}</p>
      ) : (
        <p>This collection has nothing to say. Rude!</p>
      )}

      <div className="flex items-center justify-between gap-4">
        <Link
          className="rounded border border-black px-2 py-1 text-sm text-black"
          to={`/collections/${collection.id}`}
        >
          <AiOutlineEye />
        </Link>
        <button
          onClick={() => {
            setShowDeleteConfirmation(true);
          }}
          className="rounded border border-black px-2 py-1 text-sm text-black"
        >
          <BsTrash />
        </button>
      </div>
    </li>
  );
}

export default CollectionList;

export async function loader() {
  const collections = await getCollections();

  if (!collections) return null;

  return collections;
}
