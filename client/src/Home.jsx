import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { DataContext } from './App'
import Post from './Post';
import CreatePost from './CreatePost';
import Container from 'react-bootstrap/Container'


export default function Home() {
    const { account, setAccount } = useContext(DataContext);
    const navigate = useNavigate()
    const [posts, setPost] = useState(null);
    const url = 'https://social-backend-dft5.onrender.com/posts/create';
    async function getPost() {
        try {
            const response = await fetch('https://social-backend-dft5.onrender.com/posts')
            const data = await response.json();
            if (data) {
                setPost(data);
            }

        } catch (err) {
            console.log(err)
        }
    }

    function updateLikes(id, newLikes) {
        setPost(posts.map(post => post.id === id ? { ...post, likes: newLikes } : post));
    }

    function updateComments(id, newComment) {
        setPost(posts.map(post => {
            if (post.id === id) {
                return {
                    ...post,
                    comments: [...post.comments, newComment]
                };
            }
            return post;
        }));
    }

    function removePost(id) {
        setPost(posts.filter((post) => post.id !== id))
    }
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    useEffect(() => {
        setAccount(sessionStorage.getItem('username'))
        getPost();

    }, [])
    useEffect(() => {
        const user = sessionStorage.getItem('username');
        (user) ? setAccount(user): navigate('/Login')
    })


    async function savepost() {
        const key = uuidv4();
        const obj = {
            id: key,
            title: title,
            content: content,
            author: `${account}`,
            likes: 0,
            comments: []
        }
        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(obj)

        }
        try {
            const response = await fetch(url, options)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }


            const responseData = await response.json();
            setPost([...posts, obj])
            console.log('Posted successfully');

        } catch (err) {
            console.log(err)
        }
    }

    return (<section className='home-page'>
        <Container>
         <CreatePost ftitle={setTitle} fcontent={setContent} save={savepost}/> 
           
{ posts &&
    posts.map((post)=> <Post id={post.id} key={post.id} title={post.title} author={post.author} content={post.content} lno={post.likes} cno={post.comments.length} remove={removePost} updateLikes={updateLikes} comments={post.comments} updateComments={updateComments}/ >)
}

        </Container>
        
    </section>)
}