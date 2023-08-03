import { Link, useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className="flex items-center justify-center">
      <div className="p-2 text-left">
        <h1 className="text-2xl font-bold">Oops!Something went wrong...</h1>
        <p className="mb-4 p-1">{error.message || error.data}</p>
        <Link className="rounded border p-2" onClick={() => navigate(-1)}>
          Go back
        </Link>
      </div>
    </div>
  );
}

export default Error;
