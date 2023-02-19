import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addPost, deletePost, updatePost } from './redux/postsSlice';

export default function Posts() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(null);

  const posts = useSelector((state) => state.posts.items);

  const dispatch = useDispatch();

  const handleAddPost = () => {
    dispatch(addPost({id: posts.length + 1, title, description}))
    setTitle("");
    setDescription("");
  }
  
  return (
    <div>
        <div className='form'>
            <input 
              onChange={(e) => setTitle(e.target.value)} 
              typr='text' 
              placeholder='Enter Post Title' 
              value={title}
            />
            <input 
              onChange={(e) => setDescription(e.target.value)} 
              type='text' 
              placeholder='Enter Post Desc'
              value={description}
            />
            <button onClick={handleAddPost}>Add Post</button>
        </div>

        <div className='posts'>
            {posts.length > 0 ? posts.map(post => <div key={post.id} className='post'>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <button onClick={() => {
                  setIsEdit(true) 
                  setId(post.id)
                  }}>Edit</button>
                <button onClick={() => dispatch(deletePost(post.id))}>Delete</button>
                <br />
                {isEdit && id == post.id && (
                  <>
                    <input 
                      onChange={(e) => setUpdateTitle(e.target.value)} 
                      type='text' 
                      placeholder='Enter Post Title' 
                    />
                    <input 
                      onChange={(e) => setUpdateDescription(e.target.value)} 
                      type='text' 
                      placeholder='Enter Post Desc' 
                    />
                    <button onClick={() => {
                      dispatch(updatePost({id: post.id, title: updateTitle, description: updateDescription}))
                      setIsEdit(false)
                    }}>Update Post</button>
                  </>
                )} 

            </div>): 'There is no Posts'}
        </div>
    </div>
  )
}
