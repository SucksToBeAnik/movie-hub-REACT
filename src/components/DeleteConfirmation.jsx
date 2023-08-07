import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { BiLoaderCircle } from "react-icons/bi";

function DeleteConfirmation({
  handleDelete,
  setShowDeleteConfirmation,
  navigateTo,
}) {
  const navigate = useNavigate();

  const { formState, handleSubmit } = useForm();
  const isSubmitSuccessful = formState.isSubmitSuccessful;

  useEffect(
    function () {
      if (isSubmitSuccessful) {
        setShowDeleteConfirmation(false);
        navigate(navigateTo);
      }
    },
    [isSubmitSuccessful, setShowDeleteConfirmation, navigate, navigateTo],
  );

  return (
    <div className="fixed inset-0 z-50 m-2 flex items-center justify-center backdrop-blur-sm">
      <div className="relative space-y-6 rounded bg-gray-800/50 p-8 text-white">
        <h1 className="text-2xl font-bold">
          Are you sure you want to delete this?
        </h1>

        <form onSubmit={handleSubmit(handleDelete)}>
          <button
            type="submit"
            className="rounded bg-red-400 px-2 py-1 font-semibold text-white"
          >
            {formState.isSubmitting ? (
              <BiLoaderCircle className="animate-spin" />
            ) : (
              "Delete"
            )}
          </button>
        </form>

        <button
          onClick={() => setShowDeleteConfirmation(false)}
          className="absolute right-0 -top-4 p-2 hover:scale-105"
        >
          <ImCancelCircle />
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
