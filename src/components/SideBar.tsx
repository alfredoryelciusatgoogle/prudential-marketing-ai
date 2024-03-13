import { Link, useLocation } from "react-router-dom";
import prudentialLogo from "../assets/prudential.jpeg";

const routes = [
  {
    route: "/campaign-generator",
    displayText: "Campaign Generator",
  },
  {
    route: "/content-generator",
    displayText: "Content Generator",
  },
  {
    route: "/email-generator",
    displayText: "Email Generator",
  },
  {
    route: "/campaign-collection",
    displayText: "Campaign Collection",
  },
  {
    route: "/audience-collection",
    displayText: "Audience Collection",
  },
];

const SideBar = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col gap-16 h-full">
      <div className="w-64">
        <img src={prudentialLogo} alt="" />
      </div>
      <div className="flex flex-col gap-2 w-fit">
        {routes.map((route, i) => {
          return (
            <Link to={route.route} key={i}>
              <div
                className={`py-2 px-4 rounded-md ${
                  pathname === route.route ? "bg-gray-200" : ""
                }`}
              >
                {route.displayText}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
