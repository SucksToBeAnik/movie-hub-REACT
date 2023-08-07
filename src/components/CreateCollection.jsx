import { createCollection } from "../pb/post";
import { useForm } from "react-hook-form";
import { ImCancelCircle } from "react-icons/im";
import { BiLoaderCircle } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pb } from "../pb/database";
import { getCurrentProfile } from "../pb/get";

function CreateCollection({ setShowCreateCollection }) {
  const { register, handleSubmit, formState } = useForm();
  const navigate = useNavigate()
  const isSubmitSuccessful = formState.isSubmitSuccessful
  const [error, setError] = useState('')
  

  useEffect(function(){
    if(isSubmitSuccessful){
    setShowCreateCollection(false)
      navigate('/collections')
    }
  },[isSubmitSuccessful,navigate,setShowCreateCollection])



  async function handleCreateCollection(data) {
    try{
      setError('')
      const profile = await getCurrentProfile()


      await createCollection({
        title: data.title,
        body: data.body,
        profileId:profile.id
      });


    }catch(e){
      setError(e.message)
      
      console.log(e)
      throw new Error(e.message)
    }

    
  }
  return (
    <div className="absolute inset-0 m-2 flex items-center justify-center backdrop-blur-sm">
      <div
        className="relative flex flex-col items-center justify-center gap-2 rounded bg-gray-800/50 p-3
       shadow md:p-5"
      >
        <h1 className="px-1 py-2 text-center text-2xl font-bold text-white">
          Create a new collection?
        </h1>
        <form
          onSubmit={handleSubmit(handleCreateCollection)}
          className="flex flex-col items-start justify-center gap-y-3 "
        >
          <div className="flex w-full flex-1 flex-col items-start justify-center gap-y-1">
            <label className="font-semibold text-white" htmlFor="title">
              Add a title
            </label>
            <input
              id="title"
              {...register("title", { required: true })}
              type="text"
              placeholder="What is it called?"
              className="w-full rounded p-1 shadow focus:outline-none"
            />
            {formState.errors.title?.type === "required" && (
              <p className="rounded bg-red-400 p-1 text-xs text-white">
                Providing a title is mandatory!
              </p>
            )}
          </div>

          <div className="flex w-full flex-1 flex-col items-start justify-center gap-y-1">
            <label className="font-semibold text-white" htmlFor="body">
              Add a description
            </label>
            <input
              {...register("body")}
              id="body"
              type="text"
              placeholder="Does it have anything to say?"
              className="w-full rounded p-1 shadow placeholder:truncate focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="rounded bg-blue-400 px-2 py-1 text-white"
          >
            {(formState.isSubmitting && !error) ? (
              <BiLoaderCircle className="animate-spin" />
            ) : 'Create'}
          </button>
        </form>

        <button
          onClick={() => {
            setShowCreateCollection(false)
          }
            
          }
          className="absolute right-0 top-0 rounded-full p-1 text-white hover:scale-105"
        >
          <ImCancelCircle />
        </button>
        {error && <p className="p-1 my-2 text-left bg-white rounded text-red-400 text-xs">{error}</p>}
      </div>
    </div>
  );
}

export default CreateCollection;
