import  { useState,useEffect } from 'react'
import axios from 'axios'
import path from '../../utils/path'
import UseFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import FormInput from '../components/FormInput'
import Btn from '../components/Btn'

export const Admin = () => {
  const [name, setName] = useState('')
  const [shortName, setShortName] = useState('')
  const [desc, setDesc] = useState('')
  const [color, setColor] = useState('')
  const [error, setError] = useState('')
  const [previewSource, setPreviewSource] = useState('')
  const [edit, setEdit] = useState(false)
  const {data:categories,isPending,error:err} = UseFetch(`${path}/get-categories`)
  console.log(categories);

    useEffect(() => {
      if (categories) {
        setName(categories.name)
        setShortName(categories.shortName)
        setDesc(categories.desc)
        setColor(categories.color)
        setPreviewSource(categories.logo)
      }
    },[categories])

  const handleEdit = async (e) =>{
    e.preventDefault()
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(!name || !shortName || !color){
      setError('please fill all the fields')
      return
    }
    if(!previewSource){
      setError('please select a logo')
      return
    }
    try {
      const res = await axios.post(`${path}/create-category`,{name,shortName,color,desc,logo:previewSource})
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

const handleImgChange = (e) =>{
  const file = e.target.files[0]
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
      <div className='flex max-w-[80%] gap-16 mx-auto mt-4'>
      <div className='flex-1 '>
        <div className='grid grid-cols-2 gap-2   p-4'>
        {categories && categories.map(category =>(
          <div key={categories._id} className='bg-[#393939] p-2'>
            <div className='bg-white'>
            <img src={categories.logo} alt="blog image" />
            </div>
              <p className='capitalize text-white'><span className='font-bold'>name: </span>{category.name}</p>
              <p className='capitalize text-white'><span className='font-bold'>short name: </span>{category.shortName}</p>
              <p className='capitalize text-white'><span className='font-bold'>color: </span><div className={`bg-[${category.color}] p-2 `}>{}</div></p>
              <div className='flex my-3 gap-3'>
              <Link to={`/category-blogs/${category.slug}`} className='py-1 px-4 font-bold rounded-full capitalize bg-[#BABABA]'>blogs</Link>
              <Btn type={'button'} style={'bg-[#adbee3] text-white'} text={'edit'} />
              <Btn type={'button'} onclick={() => setEdit(!edit)} style={'bg-red-500 text-white'} text={'delete'} />
              </div>
          </div>
        ))}
        </div>
        </div>

      <form onSubmit={handleSubmit} className='bg-[#202020] p-2 rounded shadow-lg'>
        {error && <p>{error}</p> }
        <div>
          <FormInput
          type={'text'}
          name={'name'}
          id={'name'}
          onchange={e => setName(e.target.value)}
          labelFor={'name'}
          labelName={'name'}
          />
          <FormInput
          type={'text'}
          name={'shortName'}
          id={'shortName'}
          onchange={e => setShortName(e.target.value)}
          labelFor={'shortName'}
          labelName={'shortName'}
          />
          <FormInput
          type={'text'}
          name={'desc'}
          id={'desc'}
          onchange={e => setDesc(e.target.value)}
          labelFor={'desc'}
          labelName={'desc'}
          />
          <FormInput
          type={'file'}
          name={'logo'}
          id={'logo'}
          onchange={handleImgChange}
          labelFor={'logo'}
          labelName={'logo'}
          />
          <FormInput
          type={'color'}
          name={'color'}
          id={'color'}
          onchange={e => setColor(e.target.value)}
          labelFor={'color'}
          labelName={'color'}
          />
        </div>
        {previewSource && <img src={previewSource} alt="preview" className='h-20 w-20'/>}
        <button type='submit'>add</button>
      </form>

      {edit && (
        <div>
          <form onSubmit={handleEdit}>
            <FormInput
            type={'text'}
            name={'name'}
            id={'name'}
            onchange={e => setName(e.target.value)}
            labelFor={'name'}
            labelName={'name'}
            value={name}
            />
          </form>
        </div>
      )}
      </div>
    </div>
  )
}
