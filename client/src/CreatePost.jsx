import React from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';

import { IKContext, IKImage, IKUpload } from 'imagekitio-react';
export default function CreatePost(props) {
  const publicKey = 'public_sf2BSHg1HDw4TCb9ZrQWCIsh0+g=';
  const urlEndpoint = 'https://ik.imagekit.io/uwei6az6zu/';
  const authenticator =  async () => {
    try {
        const response = await fetch('https://social-backend-dft5.onrender.com/auth');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};
const onError = err => {
  console.log("Error", err);
};

const onSuccess = res => {
  props.postimg(res.url)
};

    return (<>
        <Modal
        {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Post
        </Modal.Title>

      </Modal.Header>
      <Modal.Body>
       <div className='flex-around'>
        <h4><input className='title' placeholder='Post Title' onChange={({target})=>props.ftitle(target.value)}/></h4>
         <IKContext 
        publicKey={publicKey} 
        urlEndpoint={urlEndpoint} 
        authenticator={authenticator} 
      >
        <IKUpload
          fileName="post-img"
          onError={onError}
          onSuccess={onSuccess}
        />
      </IKContext>
       </div>
        <p>
          <
        textarea 
        className = "new-post"
        
        placeholder = "Post content" onChange={({target})=>props.fcontent(target.value)}>
        <
        /textarea> 
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={props.save}>Save</Button>
        <Button variant='danger' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
        </>)

}