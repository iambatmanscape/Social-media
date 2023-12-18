import React from 'react';
import Button from 'react-bootstrap/Button'
export default function CreatePost({ ftitle, fcontent, save }) {

    return (<form className='cpost-div'>
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
        </form>)

}