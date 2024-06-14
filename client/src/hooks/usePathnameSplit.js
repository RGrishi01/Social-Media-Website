import { useLocation } from "react-router-dom";

const usePathnameSplit = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Split the pathname at the third '/'
  const segments = currentPath.split("/");
  const newPathname = segments.slice(0, 3).join("/");

  return newPathname;
};

export default usePathnameSplit;
