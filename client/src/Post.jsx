import React, { useState, useContext,useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaRegHeart,FaTrash } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { DataContext } from './App'

function Post({ title, img, authorid, content, lno, cno, id, remove, updateLikes, comments, updateComments }) {
    const [showComment, setShowComment] = useState(false)
    const [comment, setComment] = useState('')
    const [likes, setLikes] = useState(lno)
    const [Op,setOp] = useState('')
    const { account } = useContext(DataContext);
    
    async function getinfo(userid) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userid})
        }
        try {
            const info = await fetch('https://social-backend-dft5.onrender.com/user',options)
            const response = await info.json();
            if(response) {
                const postername = response.username
                setOp(postername);
            } 
        } catch(e) {
                console.log(e)
            }
    }
    useEffect(()=>{

        getinfo(authorid);
   },[id])



    async function likePost(id) {
        const likeURL = 'https://social-backend-dft5.onrender.com/posts/like';
        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ id:id, userid:account.id })

        }
        try {
            const response = await fetch(likeURL, options)
            if(response.status !== 500) {
                setLikes(likes + 1)
            }

        } catch (err) {
            console.log(err.message)

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
            author: account.name,
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
        <Card style={{marginBottom:'1rem'}}>
        <Card.Img variant="top" src={img} className='post-img'/>
      <Card.Body>
      <div className='flex-around'>
        <Card.Title>{title}</Card.Title>
        {(authorid === account.id) && <FaTrash size='1.3rem' style={{color:'red',cursor:'pointer'}} onClick={()=>deletePost(id)}/>} 
        

      </div>
        <Card.Text className='text-secondary'>
          {content}
        </Card.Text>
        <div className='lower'>
         <Card.Subtitle><CgProfile size='2em'/> {Op}</Card.Subtitle>
         <Card.Subtitle><IoChatbubbleEllipsesOutline size='1.5em' style={{color:'#c7c102ba',cursor:'pointer'}} onClick={()=>setShowComment(prev=>!prev)}/> {cno}</Card.Subtitle>
         <Card.Subtitle><FaRegHeart size='1.3em' style={{color:'pink',cursor:'pointer'}} onClick={()=>likePost(id)}/> {likes}</Card.Subtitle>
        </div>
        {showComment && (<><div className='comment-box'>
         <input className='comment-in' placeholder='Comment...' onChange={({target})=>setComment(target.value)}/> 
         <Button className='comment-button' size='md' variant="secondary" onClick={()=>addComment(id)}>Add Comment</Button>
         </div>
         <ul className='comment-list'>
         {comments && comments.map((comment,index)=><li className='comment' key={index+1}><span className='comment-author'>{`${comment.author} : `}</span><span className='comment-author'>{comment.text}</span></li>)}
         </ul></>)}
      </Card.Body>
    </Card>
        
    );
}

export default Post;
