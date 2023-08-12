import axios from 'axios'
import UseFetch from '../hooks/useFetch'
import path from '../../utils/path'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Header } from '../components/Header'
import FormInput from '../components/FormInput'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import Btn from '../components/Btn'
import Heading from '../components/Heading'


export const AdminBlogs = () => {
    const {slug} = useParams()
    const {data:blogs,isPending,error} = UseFetch(`${path}/get-category/${slug}`)
    // console.log(blogs);


    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [summary, setSummary] = useState('')
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
      <Header />
      <div className='flex p-5 items-center gap-16 mx-auto mt-4'>
        <div className='flex-1 grid grid-cols-3 gap-3'>
          {blogs.blogs && blogs.blogs.map(blog =>(
            <div key={blog._id} className='bg-cardColor'>
              <div className='bg-white'>
                <img src={blog.image} alt={`${blog.title} image`} />
              </div>
              <div className="p-3">
                <p>{blog.category}</p>
              </div>
              <div>
              <h1 className='font-bold md:text-3xl my-3 text-white capitalize'>{blog.title}</h1>
              <ReactMarkdown className='text-white prose'>{`${blog.blog.slice(0,120)}...`}</ReactMarkdown>
                <div className='flex items-center gap-4'>
                <Link to={`/blog/${blog.slug}`} className='bg-gradient-to-b from-[#E9F555] to-[#e8f55573] shadow-md shadow-[#e8f5559b] hover:shadow-[#e8f555ee] hover:shadow-lg text-white px-4 my-4 block w-32 py-2 rounded-full'>Read More</Link>
                <Link to={`/edit-blog/${blog.slug}`} className='text-white px-4 my-4 block w-32 py-2 rounded-full'>edit blog</Link>
                <Btn type={'button'} style={'bg-[#adbee3] text-white'} text={'edit'} />
                <Btn type={'button'}  style={'bg-red-500 text-white'} text={'delete'} />
                </div>
              </div>
            </div>
          ))}
        </div>

      <form onSubmit={handleSubmit} className='bg-[#202020] self-start p-2'>
        <Heading text={'add blog'} />
        {errMsg && <p>{errMsg}</p>}
        {author}
        <div>
        <div className='flex gap-3'>
          <FormInput
          type={'text'}
          value={title}
          name={'title'}
          id={'title'}
          onchange={e => setTitle(e.target.value)}
          labelFor={'title'}
          labelName={'title'}
          />
          <FormInput
          type={'text'}
          value={subtitle}
          name={'subtitle'}
          id={'subtitle'}
          onchange={e => setSubtitle(e.target.value)}
          labelFor={'subtitle'}
          labelName={'subtitle'}
          />
          </div>
        <FormInput
          type={'text'}
          value={author}
          name={'author'}
          id={'author'}
          onchange={e => setAuthor(e.target.value)}
          labelFor={'author'}
          labelName={'author'}
        />
          <div className='flex flex-col mb-3'>
            <label htmlFor="blog" className="text-white capitalize mb-1">blog</label>
        <textarea name="blog" id="blog" cols="30" rows="10" onChange={e => setBlog(e.target.value)} className="p-2  bg-[#BABABA]"></textarea>
        </div>
        <FormInput
          type={'text'}
          value={summary}
          name={'summary'}
          id={'summary'}
          onchange={e => setSummary(e.target.value)}
          labelFor={'summary'}
          labelName={'summary'} 
        />
        <FormInput
          type={'file'}
          name={'image'}
          id={'image'}
          onchange={handleImgChange}
          labelFor={'image'}
          labelName={'image'}
        />
        
        </div>
        <button type='submit'>add</button>
      {previewSource && (<img src={previewSource} alt="preview" className='h-20 w-20'/>)}    
      </form>
      </div>
      </div>
  )
}
