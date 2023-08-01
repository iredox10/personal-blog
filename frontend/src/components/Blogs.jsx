import React from 'react'
import { Blog } from './Blog'

export const Blogs = ({blogs}) => {
  return (
    <div className='md:grid grid-cols-3  flex flex-col gap-5'>
    {blogs && blogs.map(blog =>(
      <Blog blog={blog} key={blog._id} />
    ))}
    </div>
  )
}
