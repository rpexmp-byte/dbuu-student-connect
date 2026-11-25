import { UserInformationMain } from "./components/UserInformationMain";
import { UserInformationMainAdditional } from "./components/UserInformationAdditional";

/** @typedef {import("../../../../models/User").User} User */

/**
 *
 * @param {Object} props
 * @param {User} props.objLoggedUser
 * @returns {JSX.Element}
 */
export default function UserInformation({ objLoggedUser }) {
  return (
    <div className=" flex flex-col gap-2">
      <UserInformationMain objLoggedUser={objLoggedUser} />
      <UserInformationMainAdditional objLoggedUser={objLoggedUser} />
    </div>
  );
}
