import { ImCancelCircle } from "react-icons/im";
import { setCollectionIsOpen } from "../slices/collectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { postContent, addContentToCollection } from "../pb/post";
import { getSpecificContent } from "../pb/get";
import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { SlCheck} from 'react-icons/sl'

function CollectionConfirmation({ content }) {
  const dispatch = useDispatch();

  const { collectionList: collections } = useSelector(
    (state) => state.collection,
  );

  return (
    <div className="fixed inset-0 z-50  flex  justify-center p-2 backdrop-blur-sm items-center">
      <div className="relative mx-auto flex w-full  flex-col items-center justify-between gap-y-4 rounded bg-gray-800/50 px-1 py-4 text-white md:w-3/5 md:px-2">
        <h1 className="text-md px-2 py-4 text-center">
          Add
          <span className="px-2 font-bold">
            {content?.name || content?.title}
          </span>
          to your collection?
        </h1>

        <ul className="grid grid-cols-2 gap-2 p-1 md:grid-cols-3 lg:grid-cols-4">
          {!collections.length ? (
            <div className="col-span-full flex flex-col items-center gap-y-1 justify-self-center p-2">
              <h1 className="text-center">You have no collections</h1>
              <Link
                to="/collections"
                className="rounded bg-white px-2 py-1 text-sm text-blue-400"
              >
                Go to collection
              </Link>
            </div>
          ) : (
            collections.map((collection) => {
              return <Collection item={collection} key={collection.id} />;
            })
          )}
        </ul>
        <button
          className="absolute right-2 top-2 text-xl"
          onClick={() => dispatch(setCollectionIsOpen())}
        >
          <ImCancelCircle />
        </button>

        <button></button>
      </div>
    </div>
  );
}

function Collection({ item }) {

  const selectedContent = useSelector(
    (state) => state.collection.selectedContent,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false)
  const [error, setError] = useState("");

  async function handleAddMovieToCollection() {
    setIsLoading(true);
    setIsCompleted(false)
    setError("");

    try {
      let content = await getSpecificContent(
        selectedContent?.title || selectedContent?.name,
      );

      if (!content) {
        content = await postContent(selectedContent);
      }

      const collection = await addContentToCollection(item.id, content.id);

      setIsCompleted(true)

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
  }

  return (
    <li className="relative flex items-center justify-between rounded bg-white p-1 text-xs text-blue-400 shadow sm:text-sm md:px-2">
      <h1>{item.title}</h1>

      {isLoading ? (
        <BiLoaderCircle className="text-md animate-spin" />
      ) :  (
        <button
          onClick={handleAddMovieToCollection}
          className="text-lg md:text-xl"
          disabled={isCompleted}
        >
          {isCompleted ? <SlCheck className="cursor-not-allowed text-md md:text-lg" /> : <AiOutlinePlusCircle />}
          
        </button>
      )}

      {error && (
        <div className="absolute bottom-0 left-0 mx-auto flex items-start gap-2 justify-between rounded bg-red-400 p-1 text-xs text-white z-[60]">
          <p>{error}</p>
          <button onClick={() => setError("")}>
            <ImCancelCircle />
          </button>
        </div>
      )}
    </li>
  );
}

export default CollectionConfirmation;
