import {useParams} from 'react-router-dom'
import path from "../../utils/path"
import UseFetch from '../hooks/useFetch'
import { Header } from '../components/Header'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import { Comment } from '../components/Comment'
import { CommentList } from '../components/CommentList'


const BlogPage = () => {
  const {slug} = useParams()
  const {data:blog,isPending,error} = UseFetch(`${path}/blog/get-blog/${slug}`)
  console.log(blog);
  const date = () =>{
    const dateObject = new Date(blog.createdAt)

  // Step 2: Extract the components of the date
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1; // Month starts from 0 (January)
  const day = dateObject.getDate();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();

  // Step 3: Format the components into a readable date format
  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return formattedDate
  }
  return (
    <div className="min-w-full ">
      <Header />
      {blog && (
        <div className="px-4 md:px-36 py-5">
          <h1 className="text-white capitalize font-bold text-2xl md:text-5xl">
            {blog.title}
          </h1>
          <div className="flex justify-between my-5">
            <p className="capitalize font-light italic text-gray-300 md:text-xl">
              written by:{" "}
              <span className="text-white font-semibold">{blog.author}</span>
            </p>
            <p className="capitalize font-light italic text-gray-300 md:text-xl">
              publish on:{" "}
              <span className="text-white font-semibold">{date()}</span>
            </p>
          </div>
          <div className="h-[30vh]  ">
            <img
              src={blog.image}
              alt="blog image"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="prose text-white min-w-full ">
            <ReactMarkdown
              className="min-w-full leading-8"
              remarkPlugins={[remarkGfm, remarkMdx]}>
              {blog.blog}
            </ReactMarkdown>
          </div>
        </div>
      )}
      <div className='flex flex-col'>
        <Comment />
        <CommentList />
      </div>
    </div>
  );
}

export default BlogPage