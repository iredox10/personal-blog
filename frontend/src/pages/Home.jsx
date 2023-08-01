import path from "../../utils/path"
import { Blogs } from "../components/Blogs"
import { Header } from "../components/Header"
import { Search } from "../components/Search"
import { SideBar } from "../components/SideBar"
import UseFetch from "../hooks/useFetch"

export const Home = () => {
  const {data:blogs,isPending,error} = UseFetch(`${path}/blog/get-blogs`)
  console.log(blogs);
  return (
    <>
      <Header />
      <Search />
      <div className="md:py-5 md:px-10 md:flex gap-5">
        <SideBar />
        {blogs &&
      <Blogs blogs={blogs} />
        }
      </div>
    </>
  )
}
