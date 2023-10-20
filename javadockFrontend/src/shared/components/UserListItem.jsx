import defaultProfileImage from "@/assets/avatars/avatar1.png"
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

export function UserListItem(props) {
    const {user} = props;
    const {t} = useTranslation();

    return (
        <Link className="list-group-item list-group-item-action"
              to={`/user/${user.id}`}
              style={{textDecoration: "none"}}>
            <img src={defaultProfileImage} width="50" className="img-fluid rounded-circle"/>
            <span className="ms-2">{user.username}</span>
            <span className="float-end mt-3 text-secondary">{user.job.jobName}</span>
        </Link>
    );
}