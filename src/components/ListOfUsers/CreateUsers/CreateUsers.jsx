import "./CreateUsersStyle.scss";
import { Link } from "react-router-dom";

export function CreateUsers({ user }) {
  return (
    <tr key={user.id} className="row">
      <Link to={`${user.id}`} className="link-style">
        <td className="name ">{user.name}</td>
      </Link>
      <td className="date">{user.date.substring(0, 10)}</td>
      <td className="empty"></td>
      <td className="state">{!!user.isActive ? "Active" : "Disable"}</td>
    </tr>
  );
}
