import React, { useState, useContext } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { DataContext } from './App'

function Post({ title, author, content, lno, cno, id, remove, updateLikes, comments, updateComments }) {
    const [showComment, setShowComment] = useState(false)
    const [comment, setComment] = useState('')
    const [likes, setLikes] = useState(lno)
    const { account } = useContext(DataContext);
    async function likePost(id) {
        const likeURL = 'https://social-backend-dft5.onrender.com/posts/like';
        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ id })

        }
        try {
            await fetch(likeURL, options)
            setLikes(likes + 1)
            updateLikes(id, likes + 1)

        } catch (err) {
            alert(err.message)

        }


    }
    async function deletePost(id) {
        const deleteURL = 'https://social-backend-dft5.onrender.com/posts/delete';
        const options = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ id })

        }
        try {
            await fetch(deleteURL, options)
            remove(id)
            alert("Deleted successfully!")

        } catch (err) {
            alert(err.message)

        }

    }
    async function addComment(id) {
        const commObj = {
            id: id,
            author: account,
            text: comment,
        }
        const commentURL = 'https://social-backend-dft5.onrender.com/posts/comments';
        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(commObj)

        }
        try {
            const response = await fetch(commentURL, options)
            const data = await response.json();
            updateComments(id, commObj)
            console.log('Comment added')

        } catch (err) {
            alert(err.message)

        }
    }
    return (
        <Card style={{marginBottom : '1rem'}}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
        <Card.Text>
          {content}
        </Card.Text>
        <ul>
          <li><Button variant="danger" onClick={()=>likePost(id)}>{`Like(${lno})`}</Button></li>
          <li><Button variant="warning" onClick={()=>setShowComment(prev=>!prev)}>{`Comment(${cno})`}</Button></li>
          <li><Button variant="success" onClick={()=>deletePost(id)}>Delete</Button></li>
        </ul>
        {showComment && (<><div className='comment-box'>
         <input className='comment-in' placeholder='Comment...' onChange={({target})=>setComment(target.value)}/> 
         <Button variant="secondary" onClick={()=>addComment(id)}>Add Comment</Button>
         </div>
         <ul className='comment-list'>
         {comments && comments.map((comment,index)=><li className='comment' key={index+1}><span className='comment-author'>{`${comment.author} : `}</span><span className='comment-author'>{comment.text}</span></li>)}
         </ul></>)}
      </Card.Body>
    </Card>
    );
}

export default Post;