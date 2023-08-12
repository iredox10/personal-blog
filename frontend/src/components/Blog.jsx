import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Link } from 'react-router-dom'

export const Blog = ({blog}) => {
  console.log(blog);
  return (
    <div className='bg-cardColor'>
        <div className='bg-white p-2'>
        <img src={blog.image} alt="blog image" />
        </div>
        <div className="p-3">
            <button>{blog.category}</button>
            <div className="">
                <h1 className='font-bold md:text-3xl my-3 text-white capitalize'>{blog.title}</h1>
                <ReactMarkdown className='text-white prose'>{`${blog.blog.slice(0,120)}...`}</ReactMarkdown>
                <Link to={`/blog/${blog.slug}`} className='bg-gradient-to-b from-[#E9F555] to-[#e8f55573] shadow-md shadow-[#e8f5559b] hover:shadow-[#e8f555ee] hover:shadow-lg text-white px-4 my-4 block w-32 py-2 rounded-full'>Read More</Link>
            </div>
        </div>
    </div>
  )
}
