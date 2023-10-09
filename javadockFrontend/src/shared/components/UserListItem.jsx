import defaultProfileImage from "@/assets/avatars/avatar1.png"

export function UserLıstItem(props){
    const { user } = props;

    return (
        <li className="list-group-item list-group-item-action">
            <img src={defaultProfileImage} width="30" className="img-fluid rounded-circle"/>
            <span className="ms-2">{user.username}</span>
        </li>
    );
}