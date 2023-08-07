import { useLoaderData, isRouteErrorResponse } from "react-router-dom";
import { getSpecificCollectionById } from "../pb/get";
import Loading from "../ui/Loading";
import { useEffect, useState } from "react";
import { BiLoaderCircle, BiUpvote } from "react-icons/bi";
import { getSpecificContentById } from "../pb/get";
import { AiOutlineStar } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { deleteContentFromCollection } from "../pb/delete";
import DeleteConfirmation from "../components/DeleteConfirmation";

function CollectionOverview() {
  const collection = useLoaderData();

  if (!collection) return <Loading />;

  const contentIds = collection.contents;

  return (
    <div className="mx-auto w-full px-2 py-6 md:w-3/5">
      <h1 className="mt-2 mb-8 bg-gradient-to-r from-blue-600 to-blue-200 bg-clip-text text-center text-3xl font-bold uppercase tracking-widest text-transparent">
        {collection.title}
      </h1>
      {contentIds.length ? (
        <ul className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {contentIds.map((id) => (
            <CollectionContent id={id} key={id} collectionId={collection.id} />
          ))}
        </ul>
      ) : (
        <h1 className="text-md p-1 py-4 text-center">
          You have not added any content to this collection yet. Lazy you!
        </h1>
      )}
    </div>
  );
}

function CollectionContent({ collectionId, id }) {
  const [content, setContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(
    function () {
      async function getContentFromCollection(i) {
        try {
          const data = await getSpecificContentById(i);
          setContent(data);
          setIsLoading(false);
        } catch (e) {
          throw new Error(e.message);
        }
      }

      getContentFromCollection(id);
    },
    [id],
  );

  async function handleDeleteContent() {
    try {
      await deleteContentFromCollection(collectionId, id);
    } catch (e) {
      console.log(isRouteErrorResponse(e));
      console.log(e.message);
    }
  }

  return (
    <li className="flex flex-col items-start justify-start rounded p-2 shadow">
      {showDeleteConfirmation && (
        <DeleteConfirmation
          handleDelete={handleDeleteContent}
          navigateTo={`/collections/${collectionId}`}
          setShowDeleteConfirmation={setShowDeleteConfirmation}
        />
      )}

      {isLoading ? (
        <div className="animate-spin text-2xl">
          <BiLoaderCircle />
        </div>
      ) : (
        <div className="relative w-full">
          <div className="flex flex-col items-start justify-center gap-2">
            <img
              src={content.poster}
              alt={content.title}
              className="rounded shadow-md"
            />
            <h1 className="font-bold sm:basis-10">{content.title}</h1>

            <p className="text-sm sm:basis-64">{content.body}</p>
          </div>

          <div className="my-2 flex items-center justify-start gap-4">
            <p className="flex items-center justify-center rounded bg-blue-400 p-[3px] text-xs text-white">
              <AiOutlineStar />
              <span>{content.rating}</span>
            </p>

            <p className="flex items-center justify-center rounded bg-purple-400 p-[3px] text-xs text-white">
              <BiUpvote />
              <span>{content.votes}</span>
            </p>
          </div>
          <p className="absolute right-0 top-0 flex items-center justify-center gap-x-1 rounded bg-blue-400 p-[3px] text-xs text-white">
            <span>Released on</span>
            <span className="shadow">{content.release_date.slice(0, 4)}</span>
          </p>

          <button
            onClick={() => setShowDeleteConfirmation(true)}
            className="mx-auto flex w-16 items-center justify-center rounded-full p-3 mt-4 mb-2 text-xl font-semibold shadow-md transition-all hover:scale-105 hover:bg-red-400 hover:text-white"
          >
            <BsTrash />
          </button>
        </div>
      )}
    </li>
  );
}

export async function loader({ params }) {
  const collectionId = params.id;


  try {
    const collection = await getSpecificCollectionById(collectionId);
    return collection;
  } catch (e) {
    throw new Error(e.message);
  }
}

export default CollectionOverview;
