import {Link} from "react-router-dom";
import {ProfıleImage} from "@/shared/components/ProfileImage.jsx";

export function UserListItem(props) {
    const {user} = props;

    return (
        <Link className="list-group-item list-group-item-action"
              to={`/user/${user.id}`}
              style={{textDecoration: "none"}}>
            <ProfıleImage width={50}/>
            <span className="ms-2">{user.username}</span>
            <span className="float-end mt-3 text-secondary">{user.job.jobName}</span>
        </Link>
    );
}