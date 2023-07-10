import { Link } from "react-router-dom";

export default function MobileNav({ open, toggleMobileNav }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <div className="dropdown z-10">
      <label
        tabIndex={0}
        className="btn btn-ghost px-2 m-0 sm:hidden"
        onClick={toggleMobileNav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
      {open && (
        <div className="dropdown">
        <ul
          tabIndex={0}
          className=" dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <Link to="/" className="">
            <li className=" mb-1 font-bold">home</li>
          </Link>
          {user && (
            <>
              <Link to="/dashboard" className=" ">
                <li className=" mb-1 font-bold">Dashboard</li>
              </Link>
              <Link to="/messages" className=" ">
                <li className=" mb-1 font-bold">Messages</li>
              </Link>
              <Link to="/polls" className=" ">
                <li className=" mb-1 font-bold">Polls</li>
              </Link>
                <Link to="/ratings" className=" ">
                <li className=" mb-1 font-bold">Ratings</li>
              </Link>
              
            </>
          )}
        </ul>
        </div>
      )}
    </div>
  );
}
