import { Link } from "react-router-dom";

export default function Header({
  heading,
  paragraph,
  linkName,
  linkUrl = "#",
}) {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <img
          className="h-20 w-20"
          alt="logo"
          src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
        />
      </div>
      <h2 className="mt-1 text-center text-3xl font-extrabold ">{heading}</h2>
      <p className=" text-center text-sm mt-5">
        {paragraph}{" "}
        <Link
          to={linkUrl}
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
}
