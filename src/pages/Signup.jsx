import { useForm } from "react-hook-form";
import { BiLoaderCircle } from "react-icons/bi";
import { createUserWithUsername } from "../pb/auth";
import { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";

function Signup() {
  const [signupError, setSignupError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const navigate = useNavigate();

  useEffect(
    function () {
      if (isSubmitSuccessful) navigate("/signin");
    },
    [isSubmitSuccessful, navigate],
  );

  return (
    <div className="flex items-center justify-center">
      <div className="py-12 px-4 w-2/4 shadow mx-auto">
        <h1 className="px-2 py-4 text-center text-2xl font-semibold">
          Create an account
        </h1>

        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              setSignupError("");
              await createUserWithUsername(data);
            } catch (e) {
              setSignupError(e.message);
            }
          })}
          className="flex flex-col items-center justify-center p-2"
        >
          <div className="flex flex-col items-start justify-center w-3/4 p-2 gap-y-1">
            <label htmlFor="username">Username</label>
            <input
              className="rounded border p-1 shadow focus:outline-none w-full"
              {...register("username", { required: true })}
              type="text"
              placeholder="What should we call you?"
            />

            {errors?.username?.type === "required" && (
              <p className="py-1 text-sm text-red-400">Username is required</p>
            )}
          </div>

          <div className="flex flex-col w-3/4 p-2 gap-y-1">
            <label htmlFor="password">Password</label>
            <input
              className="rounded border p-1 shadow focus:outline-none"
              {...register("password", {
                required: true,
                minLength: 8,
                maxLength: 72,
              })}
              type="password"
              placeholder="Provide a strong password unlike you"
            />
            {errors?.password?.type === "required" && (
              <p className="py-1 text-sm text-red-400">Password is required</p>
            )}
            {errors?.password?.type === ("minLength" || "maxLength") && (
              <p className="py-1 text-sm text-red-400">
                Password length must be between 8 and 72 letters.
              </p>
            )}
          </div>

          <div className="flex flex-col w-3/4 p-2 gap-y-1">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="rounded border p-1 shadow focus:outline-none"
              type="password"
              placeholder="Enter the password again to confirm"
              id="confirmPassword"
              {...register("confirmPassword", {
                validate: (value, formValues) => value === formValues.password,
              })}
            />

            {errors?.confirmPassword?.type === "validate" && (
              <p className="py-1 text-sm text-red-400">
                Password did not match!
              </p>
            )}
          </div>

          
            <button className="rounded bg-blue-400 px-3 py-1 my-4 text-white shadow flex items-center justify-between gap-x-1">
              <span>Signup</span>
              <span>{isSubmitting && <BiLoaderCircle className="animate-spin" />}</span>
            </button>
        

          {signupError && (
            <p className="py-1 text-sm text-red-400">{signupError}</p>
          )}
        </form>

        <div className="flex flex-col items-center justify-center gap-1 font-semibold md:flex-row">
            <h3>Already have an account?</h3>
            <p className="flex items-center justify-center gap-x-2">
              <span>Signin</span>
              <Link
                to="/signin"
                className="border-b-2 border-blue-400 text-blue-400"
              >
                Here
              </Link>
            </p>
          </div>
      </div>
    </div>
  );
}

export default Signup;
