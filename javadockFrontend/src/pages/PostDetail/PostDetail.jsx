import http from "@/lib/http.js";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';

export function PostDetail(props) {
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [errorMessage, setErrorMessage] = useState();
    const [apiProgress, setApiProgress] = useState(false);

    function getPost(id) {
        return http.get(`/api/v1/posts/${id}`)
    }

    useEffect(() => {
        async function post() {
            setApiProgress(true)
            try {
                const response = await getPost(id);
                setPost(response.data)
            } catch (error) {
                setErrorMessage(error.response.data.message)
            } finally {
                setApiProgress(false);
            }
        }

        post()
    }, [id])
    
    return <>
        {post && (<MDBCard>
            <MDBCardBody>
                <MDBCardTitle>{post.header}</MDBCardTitle>
                <MDBCardText>{post.content}</MDBCardText>
            </MDBCardBody>
            <MDBListGroup flush>
                {(post.commentList).map(comment => {
                    return <MDBListGroupItem key={comment.id}>{comment.content}</MDBListGroupItem>
                })}
            </MDBListGroup>
        </MDBCard>)}
    </>
}