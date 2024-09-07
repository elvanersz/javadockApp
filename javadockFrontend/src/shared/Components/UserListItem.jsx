import {Link} from "react-router-dom";
import {ProfileImage} from "@/shared/Components/ProfileImage.jsx";

export function UserListItem(props) {
    const {user} = props;

    return (
        <Link className="list-group-item list-group-item-action"
              to={`/users/${user.id}`}
              style={{textDecoration: "none"}}>
            <ProfileImage width={55} image={user.image}/>
            <span className="ms-2">{user.username}</span>
            <span className="float-end mt-3 text-secondary">{user.job?.jobName}</span>
        </Link>
    );
}