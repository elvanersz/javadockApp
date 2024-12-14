import { useState } from 'react';
import { Link } from "react-router-dom";
import {
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardText,
    MDBBtn
} from 'mdb-react-ui-kit';

export function PostListItem(props) {
    const { post } = props;
    const [isExpanded, setIsExpanded] = useState(false);

    const renderContentWithLineBreaks = (content) => {
        return content.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    return (
        <MDBCard style={{marginBottom: "20px"}}>
            <MDBCardHeader>{post.header}</MDBCardHeader>
            <Link 
                className="list-group-item list-group-item-action"
                to={`/posts/${post.id}`}
                style={{ textDecoration: "none", border: "none" }}
            >
                <MDBCardBody className="w-100 p-3">
                    <MDBCardText style={{ maxHeight: isExpanded ? 'none' : '190px', overflow: 'hidden' }}>
                        {renderContentWithLineBreaks(post.content)}
                    </MDBCardText>
                </MDBCardBody>
            </Link>
        </MDBCard>
    );
}