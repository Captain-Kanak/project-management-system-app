import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className="flex items-center">
        <span className="text-xl font-bold text-blue-600 cursor-pointer">
          Project MS
        </span>
      </div>
    </Link>
  );
};

export default Logo;
