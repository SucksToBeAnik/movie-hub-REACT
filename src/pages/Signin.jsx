import { signinWithUsername } from "../pb/auth";
import { BiLoaderCircle } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setIsSignedIn } from "../slices/authSlice";

function Signin() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting,isSubmitSuccessful },
  } = useForm();

  useEffect(function(){
    if(isSubmitSuccessful) {
      dispatch(setIsSignedIn(true))
      navigate('/')}
  },[isSubmitSuccessful,navigate,dispatch])

  const [error, setError] = useState("");

  return (
    <div className="flex items-center justify-center">
      <div className="w-2/4 p-4 shadow-md">
        <h1 className="px-2 py-4 text-center text-2xl font-semibold">Login</h1>
        <form
          className="flex flex-col items-center justify-center p-2"
          onSubmit={handleSubmit(async (data) => {
            try {
              setError('')
              await signinWithUsername(data);
            } catch (e) {
              setError(e.message);
            }
          })}
        >
          <div className="flex w-full flex-col gap-y-1 p-2">
            <label htmlFor="username">Username</label>
            <input
              className="w-full rounded border p-1 shadow focus:outline-none"
              {...register("username", { required: true })}
              type="text"
              id="username"
              placeholder="Your username"
            />
            {errors?.username?.type === "required" && (
              <p className="py-1 text-sm text-red-400">Username is required</p>
            )}
          </div>

          <div className="flex w-full flex-col p-2 gap-y-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="w-full rounded border p-1 shadow focus:outline-none"
              {...register("password", { required: true })}
              id="password"
              placeholder="Your password"
            />
            {errors?.password?.type === "required" && (
              <p className="py-1 text-sm text-red-400">Password is required</p>
            )}
          </div>

          <button
            type="submit"
            className="my-4 flex items-center justify-between gap-x-1 rounded bg-blue-400 px-3 py-1 text-white shadow"
          >
            <span>Login</span>
            <span>
              {isSubmitting && <BiLoaderCircle className="animate-spin" />}
            </span>
          </button>
          {error && <p className="py-1 text-sm text-red-400">{`${error} Please provide valid information.`}</p>}

          <div className="flex flex-col items-center justify-center gap-1 font-semibold md:flex-row">
            <h3>Do not have an account?</h3>
            <p className="flex items-center justify-center gap-x-2">
              <span>Create an account</span>
              <Link
                to="/signup"
                className="border-b-2 border-blue-400 text-blue-400"
              >
                Here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
