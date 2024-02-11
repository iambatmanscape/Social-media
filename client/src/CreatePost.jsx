import React from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
export default function CreatePost(props) {

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
        <h4><input className='title' placeholder='Post Title' onChange={({target})=>props.ftitle(target.value)}/></h4>
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

        {/*<form className='cpost-div'>
        <input className='title' placeholder='title' onChange={({target})=>ftitle(target.value)}/> <
        textarea cols = "10"
        className = "new-post"
        rows = "5"
        placeholder = "Type...." onChange={({target})=>fcontent(target.value)}>
        <
        /textarea> 
        <div className='create-post-btn'>
            <Button variant='primary' onClick={save}>Save Post</Button>
        </div>
        </form>*/}
        </>)

}