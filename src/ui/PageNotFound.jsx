import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex items-center justify-center p-2">
      <div >
        <p className="text-3xl font-bold md:text-4xl">404! Page Not Found!</p>

        <h1 className="mt-1 text-md font-semibold md:text-2xl">
          The page you are trying to visit does not exist!
        </h1>

        <Link
          to="/"
          className="mt-8 inline-block rounded bg-blue-400 px-3 py-1 text-white shadow"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
