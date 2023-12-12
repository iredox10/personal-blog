import React, { useEffect, useState } from 'react'
import axios from 'axios'
import path from '../../utils/path'


export const CommentList = ({user,blog}) => {
  const [comments, setComments] = useState(null)
  // console.log(blog)
  // console.log(comments.length)
  useEffect(()=>{
    const fetch = async () =>{
      try {
        const res = await axios(`${path}/comment/get-comments/${blog.slug}`)
        setComments(res.data.comments)
      } catch (err) {
      console.log(err)        
      }
    }
    fetch()
  },[comments])
  return (
    <div className="text-secondary-color my-10 p-3 md:w-2/4 md:mx-32">
      <h1 className=" font-bold text-xl">
        comments({comments && comments.length})
      </h1>
      {comments &&
        comments.map((comment) => (
          <div key={comment._id}>
            <div className="bg-dark-color p-2 ">
              <div className="capitalize flex justify-between my-2">
                <h1 className="text-yellow font-bold">{comment.user}</h1>
                <p></p>
              </div>
              <p>
                {comment.comment}
              </p>
            </div>
          </div>
        ))}
      <div></div>
    </div>
  );
}
