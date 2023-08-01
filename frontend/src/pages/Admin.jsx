import  { useState } from 'react'
import axios from 'axios'
import path from '../../utils/path'
import UseFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom'

export const Admin = () => {
  const [name, setName] = useState('')
  const [shortName, setShortName] = useState('')
  const [color, setColor] = useState('')
  const [logo, setLogo] = useState(null)
  const [error, setError] = useState(null)
  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      const res = await axios.post(`${path}/create-category`,{name,shortName,color,})
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const {data:categories,isPending,error:err} = UseFetch(`${path}/get-categories`)
  console.log(categories);

  return (
    <div>
      <div>
        {categories && categories.map(category =>(
          <div key={categories._id}>
              <p>{category.name}</p>
              <Link to={`/admin-blogs/${category.slug}`}>view blogs</Link>
          </div>
        ))}
        </div>

      <form onSubmit={handleSubmit}>
        <div>
        <input type="text" placeholder='name' onChange={e => setName(e.target.value)}/>
        <input type="text" placeholder='shortName' onChange={e => setShortName(e.target.value)} />
        <input type="color" placeholder='color' onChange={e => setColor(e.target.value)} />
        </div>
        <button type='submit'>add</button>
      </form>
      
    </div>
  )
}
