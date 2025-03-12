import star from "../../assets/starIcon.png";
import archive from "../../assets/archiveIcon.png";
import deleteIcon from "../../assets/deleteIcon.png";
import { NavLink } from "react-router";
export const More = () => {
  return (
    <div className="flex flex-col pt-5">
      <h1 className="text-gray-500 font-semibold pb-1">More</h1>
      <NavLink
        to={`/:${true}`}
        className="flex gap-4 pt-3 pb-3 pl-5 pr-5"
      >
        <img src={star} alt="" />
        <p className="font-semibold text-gray-500">Favorites</p>
      </NavLink>
      <NavLink to={`/trash/${true}`} className="flex gap-4 pt-3 pb-3 pl-5 pr-5">
        <img src={deleteIcon} alt="" />
        <p className="font-semibold text-gray-500">Trash</p>
      </NavLink>
      <NavLink
        to={`/archive/:${true}`}
        className="flex gap-4 pt-3 pb-3 pl-5 pr-5 "
      >
        <img src={archive} alt="" />
        <p className="font-semibold text-gray-500">Archived Notes</p>
      </NavLink>
    </div>
  );
};
