import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Link } from 'react-router-dom'

export const Blog = ({blog}) => {
  console.log(blog.image);
  const date = () => {
    const dateObject = new Date(blog.createdAt);

    // Step 2: Extract the components of the date
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Month starts from 0 (January)
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    // Step 3: Format the components into a readable date format
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    return formattedDate;
  };
  return (
    <div className="bg-dark-color rounded-t-lg text-secondary-color capitalize mx-4">
      <div className="img">
        <img src={blog.image} className="w-full rounded-t-lg" alt="blog_img" />
      </div>
      <div className="p-2">
        <div className="flex justify-between">
          <p>{blog.author}</p>
          <p className='text-xs'>{date()}</p>
        </div>
        <p>{blog.category}</p>
        <div>
          <h1 className="text-4xl font-bold">{blog.title}</h1>
          <p>{blog.summary}</p>
          <button className='flex '>
            <Link
              to={`/blog/${blog.slug}`}
              className="bg-yellow my-5 justify-self-end  text-dark-color px-4 py-2 rounded-full ">
              Read More
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
