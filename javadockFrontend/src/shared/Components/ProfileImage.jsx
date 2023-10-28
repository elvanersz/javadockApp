import defaultProfileImage from "@/assets/avatars/avatar1.png";

export function ProfileImage({ width, tempImage }){

    return (
        <>
            <img src={tempImage || defaultProfileImage} width={width} className="img-fluid rounded-circle"/>
        </>
    )
}