import { useLoaderData } from "react-router-dom";
import { getSpecificCollectionById } from "../pb/get";
import Loading from "../ui/Loading";
import { useEffect, useState } from "react";
import { BiLoaderCircle, BiUpvote } from "react-icons/bi";
import { getSpecificContentById } from "../pb/get";
import { AiOutlineStar } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

function CollectionOverview() {
  const collection = useLoaderData();

  if (!collection) return <Loading />;

  const contentIds = collection.contents;

  return (
    <div className="mx-auto w-full px-2 py-6 md:w-3/5">
      <h1 className="my-2 text-center text-3xl font-bold">
        {collection.title}
      </h1>
      <ul className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {contentIds.map((id) => (
          <CollectionContent id={id} key={id} />
        ))}
      </ul>
    </div>
  );
}

function CollectionContent({ id }) {
  const [content, setContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    async function getContentFromCollection(i) {
      try {
        const data = await getSpecificContentById(i);
        setContent(data);
        setIsLoading(false);
        return;
      } catch (e) {
        throw new Error(e.message);
      }
    }

    getContentFromCollection(id);
  }, []);

  return (
    <li className="flex flex-col items-start justify-start rounded p-2 shadow">
      {isLoading ? (
        <div className="animate-spin text-2xl">
          <BiLoaderCircle />
        </div>
      ) : (
        <>
          <div className="flex flex-col items-start justify-center gap-2">
            <img
              src={content.poster}
              alt={content.title}
              className="rounded shadow-md"
            />
            <h1 className="sm:basis-10 font-bold">{content.title}</h1>

            <p className="sm:basis-64 text-sm">{content.body}</p>
          </div>

          <div className="my-2 flex items-center justify-between gap-4">
            <p className="flex items-center justify-center rounded bg-blue-400 p-[3px] text-xs text-white">
              <AiOutlineStar />
              <span>{content.rating}</span>
            </p>

            <p className="flex items-center justify-center rounded bg-blue-400 p-[3px] text-xs text-white">
              <BiUpvote />
              <span>{content.votes}</span>
            </p>
          </div>

          <button className="width-full mx-auto rounded-full border-2 p-3 shadow transition-all hover:scale-105">
            <BsTrash />
          </button>
        </>
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
