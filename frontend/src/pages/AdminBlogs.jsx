import axios from "axios";
import UseFetch from "../hooks/useFetch";
import path from "../../utils/path";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import FormInput from "../components/FormInput";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Heading from "../components/Heading";
import FormBtn from "../components/FormBtn";
import Title from "../components/Title";
import Btn from "../components/Btn";

export const AdminBlogs = () => {
  const { slug } = useParams();
  // const {
  //   data: blogs,
  //   isPending,
  //   error,
  // } = UseFetch(`${path}/get-category/${slug}`);
  // console.log(blogs ? blogs.blogs : "no blog fetch");

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [summary, setSummary] = useState("");
  const [blog, setBlog] = useState("");
  const [author, setAuthor] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [edit, setEdit] = useState(false);
  const [wideComment, setWideComment] = useState(false);
  const [blogs, setBlogs] = useState(null);
  const [editBlog, setEditBlog] = useState(null);
  const [model, setModel] = useState(false);

  useEffect(() => {
    if (editBlog) {
      setTitle(editBlog.title);
      setSubtitle(editBlog.subtitle);
      setSummary(editBlog.summary);
      setAuthor(editBlog.author);
      console.log("edit again");
    }
  }, [editBlog]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios(`${path}/get-category/${slug}`);
      setBlogs(res.data);
      console.log(res.data);
    };
    fetch();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!previewSource) {
      setErrMsg("please select an image");
      return;
    }
    if (!title || !blog || !author) {
      setErrMsg("please fill all the fields");
      return;
    }
    console.log(previewSource);
    try {
      const res = await axios.post(`${path}/blog/create-blog/${slug}`, {
        title,
        subtitle,
        summary,
        blog,
        image: previewSource,
        author,
        category: slug,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (slug) => {
    try {
      const res = await axios(`${path}/blog/get-blog/${slug}`);
      if (res.status == 200) {
        await axios.delete(`${path}/blog/delete-blog/${slug}`);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const showEditModel = async (slug) => {
    setEdit(true);
    const res = await axios(`${path}/blog/get-blog/${slug}`);
    console.log(res.data);
    setEditBlog(res.data);
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    preview(file);
  };

  const preview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  return (
    <div>
      <Header />
      <div className="flex gap-4 p-2">
        <div className="flex-1 grid grid-cols-4 grid-rows-4">
          {blogs ? (
            blogs.blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-dark-color/70 p-2 rounded capitalize text-secondary-color">
                <h1 className="font-bold text-xl">{blog.title}</h1>
                <p className="mb-10 mt-5">{blog.summary}</p>
                <div className="flex gap-2 justify-around ">
                  <button className="relative capitalize before:absolute before:left-0 hover:before:w-full transition-all  before:w-5 before:h-1 before:bottom-0 before:bg-secondary-color">
                    View
                  </button>
                  <button
                    onClick={() => showEditModel(blog.slug)}
                    className="relative capitalize before:absolute before:left-0 hover:before:w-full transition-all  before:w-5 before:h-1 before:bottom-0 before:bg-yellow text-yellow">
                    Edit
                  </button>
                  <button
                    onClick={() => setModel(!model)}
                    className="relative capitalize before:absolute before:left-0 hover:before:w-full transition-all  before:w-5 before:h-1 before:bottom-0 before:bg-red-500 text-red-500">
                    Delelte
                  </button>
                </div>

                {model && (
                  <div className="absolute w-screen h-screen top-0 left-0 bg-dark-color/50">
                    <div className="relative h-full w-full">
                      <div className="absolute top-1/4 left-2/4 translate-x-[-50%] capitalize text-center">
                        <h1 className="text-xl md:text-3xl font-bold">
                          do you really want to delete
                          <span className="text-yellow"> {blog.title}</span>
                        </h1>
                        <p>
                          deleting{" "}
                          <span className="text-yellow"> {blog.title}</span>
                          will delete all the blogs that are in
                          <span className="text-yellow"> {blog.title}</span>
                        </p>
                        <div className="flex justify-around my-5">
                          <button
                            className="px-4 py-2 capitalize bg-red-600 hover:bg-red-600/70 text-primary-color"
                            onClick={() => handleDelete(blog.slugx)}>
                            delete
                          </button>
                          <button
                            className="px-4 py-2 capitalize bg-yellow hover:bg-yellow/70  text-primary-color"
                            onClick={() => setModel(!model)}>
                            cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>no blog posted yet</p>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-dark-color p-2 rounded shadow-lg">
          <Title text={"add blog"} />
          {errMsg && <p>{errMsg}</p>}
          {author}
          <div>
            <div className="flex gap-3">
              <FormInput
                type={"text"}
                value={title}
                name={"title"}
                id={"title"}
                onchange={(e) => setTitle(e.target.value)}
                labelFor={"title"}
                labelName={"title"}
              />
              <FormInput
                type={"text"}
                value={subtitle}
                name={"subtitle"}
                id={"subtitle"}
                onchange={(e) => setSubtitle(e.target.value)}
                labelFor={"subtitle"}
                labelName={"subtitle"}
              />
            </div>
            <FormInput
              type={"text"}
              value={author}
              name={"author"}
              id={"author"}
              onchange={(e) => setAuthor(e.target.value)}
              labelFor={"author"}
              labelName={"author"}
            />
            <div className="relative flex flex-col mb-3">
              <label htmlFor="blog" className="text-white capitalize mb-1">
                blog
              </label>
              <textarea
                name="blog"
                id="blog"
                cols="30"
                rows="10"
                onChange={(e) => setBlog(e.target.value)}
                className="p-2  bg-secondary-color"
                defaultValue={blog}></textarea>
              <button
                className="absolute bottom-0 right-0"
                onClick={() => setWideComment(!wideComment)}>
                wide it
              </button>
            </div>
            <FormInput
              type={"text"}
              value={summary}
              name={"summary"}
              id={"summary"}
              onchange={(e) => setSummary(e.target.value)}
              labelFor={"summary"}
              labelName={"summary"}
            />
            <FormInput
              type={"file"}
              name={"image"}
              id={"image"}
              onchange={handleImgChange}
              labelFor={"image"}
              labelName={"image"}
            />
          </div>
          <FormBtn text={"add"} />
          {previewSource && (
            <img src={previewSource} alt="preview" className="h-20 w-20" />
          )}
        </form>

        {wideComment && (
          <div className="absolute w-screen h-screen top-0 left-0 bg-black/40">
            <div className="relative w-[50%] left-1/4 top-1/4 flex flex-col mb-3">
              <label htmlFor="blog" className="text-white capitalize mb-1">
                blog
              </label>
              <textarea
                name="blog"
                id="blog"
                cols="30"
                rows="10"
                onChange={(e) => setBlog(e.target.value)}
                className="p-2  bg-[#BABABA]"
                defaultValue={blog}></textarea>
              <button
                className="absolute top-0 right-0 text-secondary-color"
                onClick={() => setWideComment(!wideComment)}>
                close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
