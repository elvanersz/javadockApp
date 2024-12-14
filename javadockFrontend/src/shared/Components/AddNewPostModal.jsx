import {MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBModalDialog, MDBModalContent, MDBModalTitle, MDBTextArea, MDBContainer} from 'mdb-react-ui-kit';
import {Input} from "@/shared/Components/Input.jsx";
import {Alert} from "@/shared/Components/Alert.jsx";
import {useState, useEffect} from "react";

export function AddNewPostModal({addNewPostMode, onClose, onSave, postContent, setPostContent, postHeader, setPostHeader, errors, addNewPostSuccessMessage, generalError}) {
    return (
        <MDBContainer>
            <MDBModal 
                show={addNewPostMode} 
                toggle={onClose} 
                side 
                position="bottom-right" 
                onClick={onClose}
            >
                <MDBModalDialog size="lg" onClick={(e) => e.stopPropagation()}>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Add New Post</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={onClose}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <Input 
                                id="header"
                                labelText="Header"
                                error={errors?.header}
                                onChange={(event) => setPostHeader(event.target.value)}
                            />
                            <label htmlFor="content" className="form-label">Content</label>
                            <MDBTextArea
                                id="content"
                                className={errors?.content ? "form-control is-invalid" : "form-control"}
                                onChange={(event) => setPostContent(event.target.value)}
                                rows={15}
                                style={{ overflow: 'hidden' }}
                                value={postContent}
                            />
                            {addNewPostSuccessMessage &&
                                <Alert marginTop="15px" styleType="success" center>{addNewPostSuccessMessage}</Alert>
                            }
                            {generalError &&
                                <Alert marginTop="15px" styleType="danger" center>{generalError}</Alert>
                            }
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' style={{width: "80px", height:"38px"}} onClick={onClose}>
                                Close
                            </MDBBtn>
                            {!addNewPostSuccessMessage &&
                                <MDBBtn 
                                    style={{width:"80px", height:"38px"}}
                                    onClick={onSave}
                                >
                                    Save
                                </MDBBtn>
                            }
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </MDBContainer>
    );
}
