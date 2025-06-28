import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className=" bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap ">
            <span className="text-blue-700 ">Zoha</span>
            <span>Estate</span>
          </h1>
        </Link>
        <form className="flex items-center bg-slate-100 rounded-md p-3 ">
          <input
            type="search"
            name="search"
            id="search"
            className="bg-transparent outline-0 w-22 sm:w-60"
            placeholder="Search..."
          />
          <FaSearch className="text-slate-700" />
        </form>
        <ul className="flex gap-4 ">
          <Link to="/">
            <li className="hidden sm:inline text-slate-800 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-800 hover:underline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile"
                className="rounded-full max-h-7 max-w-7 object-cover"
              />
            ) : (
              <li className="text-slate-800 hover:underline">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
