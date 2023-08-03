import { ImCancelCircle } from "react-icons/im";
import { setCollectionIsOpen } from "../slices/collectionSlice";
import { useDispatch } from "react-redux";
import { useFetcher } from "react-router-dom";
import { useEffect } from "react";

function CollectionConfirmation({ content }) {
  const dispatch = useDispatch();
  const fetcher = useFetcher();

  

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/collections");
    },
    [fetcher],
  );

  console.log(fetcher)
  console.log(fetcher.data)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="relative mx-auto min-h-fit w-3/5 rounded bg-blue-400 p-2 text-white">
        <h1 className="text-xl font-semibold">
          Add{" "}
          <span className="rounded bg-white p-1 text-sm text-blue-400">
            {content?.name || content?.title}
          </span>{" "}
          to your collection?
        </h1>
        {data.map()}
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In reiciendis
          tenetur, distinctio nesciunt tempora qui odio natus cumque animi enim
          iusto eligendi voluptates? Sint sunt asperiores ipsum, quisquam
          voluptas voluptate at dolorum laboriosam deserunt ut! Porro at esse
          laudantium hic.
        </p>
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

export default CollectionConfirmation;
