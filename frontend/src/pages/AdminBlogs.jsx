import axios from 'axios'
import UseFetch from '../hooks/useFetch'
import path from '../../utils/path'
import { useParams } from 'react-router-dom'
import { useState } from 'react'


export const AdminBlogs = () => {
    const {slug} = useParams()
    const {data:blogs,isPending,error} = UseFetch(`${path}/get-category/${slug}`)
    console.log(blogs);


    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [summary, setSummary] = useState('')
    const [image, setImage] = useState('')
    const [blog, setBlog] = useState('')
    const [author, setAuthor] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [previewSource, setPreviewSource] = useState('')
    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        // console.log(previewSource);
        if (!previewSource) {
          setErrMsg('please select an image')
          return
        }
        if(!title || !blog || !author){
          setErrMsg('please fill all the fields')
          return
        }
        console.log(previewSource);
        try {
          const res = await axios.post(`${path}/blog/create-blog/${slug}`,{title,subtitle,summary,blog,image:previewSource,author,category:slug})
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    
      const handleImgChange = (e) =>{
        const file = e.target.files[0]
        console.log(file);
        preview(file)
      }

      const preview = (file) =>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () =>{
          setPreviewSource(reader.result)
        }
      }
  return (
    <div>
        <div>
          
            {blogs &&
            <div>
            <p>list of {blogs.name} blogs</p>
            {blogs.blogs.map(blog =>(
                <div key={blog.slug}> 
                  {/* <p>{blog.}</p> */}
                </div>
            ))}
            </div>
        }
        </div>

        
      <form onSubmit={handleSubmit}>
        {errMsg && <p>{errMsg}</p>}
        {author}
        <div>
        <input type="text" placeholder='title' onChange={e => setTitle(e.target.value)} />
        <input type="text" placeholder='author' onChange={e => setAuthor(e.target.value)} />
        <textarea name="blog" id="blog" cols="30" rows="10" onChange={e => setBlog(e.target.value)}></textarea>
        <input type="file" name="image" id="image" onChange={handleImgChange} />
        </div>
        <button type='submit'>add</button>
      </form>
      {previewSource && (<img src={previewSource} alt="preview" width={300}/>)}    </div>
  )
}
