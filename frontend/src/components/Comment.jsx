import React, { useState } from 'react'
import path from '../../utils/path'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
export const Comment = ({user,blog}) => {
  const [comment, setComment] = useState('')
  console.log(user)
  const navigate = useNavigate()
  const handleComment = async(e) =>{
    e.preventDefault()
    if(!user){
      navigate('/login')
    }
    if(comment == '') return
    try {
      const res = await axios.post(`${path}/comment/post-comment/${blog.slug}`, {comment,username:user.username})
      setComment('')
      console.log(res.data)
    } catch (err) {
      console.log(err)  
    }
  }

  return (
    <div>
      <div className="px-4 md:px-36 my-5">
        <div className="relative">
          <form onSubmit={handleComment}>
            <textarea
              name="comment"
              id="comment"
              cols="30"
              rows="5"
              className="bg-dark-color/80 text-secondary-color p-2"
              value={comment}
              onChange={e => setComment(e.target.value)}
              ></textarea>
            <button type='submit' className="absolute bottom-[-3rem] left-0 bg-yellow hover:bg-yellow/40 px-4 py-2">
              Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
