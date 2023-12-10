import { useState, useEffect } from "react";
import axios from "axios";
import path from "../../utils/path";
import UseFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import FormInput from "../components/FormInput";
import Btn from "../components/Btn";
import Title from "../components/Title";
import FormBtn from "../components/FormBtn";

export const Admin = () => {
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [edit, setEdit] = useState(false);
  const [editCategoryName, setEditCategory] = useState(null);
  const [addCategory, SetAddCategory] = useState(false);
  const [model, setModel] = useState(false);
  const [categories, setCategories] = useState(null);
  // const {
  //   data: categories,
  //   isPending,
  //   error: err,
  // } = UseFetch(`${path}/get-categories`);

  useEffect(() => {
    if (editCategoryName) {
      setName(editCategoryName.name);
      setShortName(editCategoryName.shortName);
      setDesc(editCategoryName.desc);
      setColor(editCategoryName.color);
      console.log("edit again");
    }
  }, [editCategoryName]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios(`${path}/get-categories`);
      setCategories(res.data);
    };
    fetch();
  }, [categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !shortName || !color) {
      setError("please fill all the fields");
      return;
    }
    if (!previewSource) {
      setError("please select a logo");
      return;
    }
    try {
      const res = await axios.post(`${path}/create-category`, {
        name,
        shortName,
        color,
        desc,
        logo: previewSource,
      });
      if (res.statusText == "ok") {
        SetAddCategory(true);
      }
      console.log(res.data);
    } catch (err) {
      category;
      console.log(err);
    }
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    preview(file);
  };

  const preview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const showEditModel = async (slug) => {
    setEdit(true);
    const res = await axios(`${path}/get-category/${slug}`);
    console.log(res.data);
    setEditCategory(res.data);
  };

  const handleEdit = async (e, slug) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`${path}/edit-category/${slug}`, {
        name,
        desc,
        color,
        shortName,
      });
      const categories = await axios(`${path}/get-categories`);
      setCategories(categories.data)
      setEditCategory(res.data);
      setEdit(false);
      console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async (slug) => {
    try {
      const res = await axios(`${path}/get-category/${slug}`);
      if (res.status == 200) {
        await axios.delete(`${path}/delete-category/${slug}`);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex gap-16 mt-4 p-2">
        <div className="flex-1 ">
          <div className="grid grid-cols-4 gap-2   p-4">
            {categories &&
              categories.map((category) => (
                <div
                  key={categories._id}
                  className=" bg-dark-color/70 capitalize text-secondary-color p-2">
                  <div className="p-2">
                    <img src={categories.logo} alt="blog image" />
                  </div>
                  <p className="flex justify-between items-center capitalize my-2">
                    <span className="font-bold">{category.name}</span>
                    <span>{category.shortName}</span>
                  </p>
                  <p className="my-2 text-sm">{category.desc}</p>
                  <p className="capitalize text-white">
                    <div
                      style={{ backgroundColor: `${category.color}` }}
                      className="">
                      {category.color}
                    </div>
                  </p>
                  <div className="flex my-3 gap-3">
                    <Link
                      to={`/category-blogs/${category.slug}`}
                      className="py-1 px-2 capitalize">
                      blogs
                    </Link>
                    <button
                      className=" py-1 px-2 capitalize"
                      onClick={() => showEditModel(category.slug)}>
                      edit
                    </button>
                    <button
                      onClick={() => setModel(!model)}
                      className="bg-red-500 hover:bg-red-700 py-1 px-2 capitalize">
                      delete
                    </button>{" "}
                    {model && (
                      <div className="absolute w-screen h-screen top-0 left-0 bg-dark-color/50">
                        <div className="relative h-full w-full">
                          <div className="absolute top-1/4 left-2/4 translate-x-[-50%] capitalize text-center">
                            <h1 className="text-xl md:text-3xl font-bold">
                              do you really want to delete{" "}
                              <span className="text-yellow">
                                {" "}
                                {category.name}
                              </span>
                            </h1>
                            <p>
                              deleting{" "}
                              <span className="text-yellow">
                                {" "}
                                {category.name}
                              </span>{" "}
                              will delete all the blogs that are in{" "}
                              <span className="text-yellow">
                                {" "}
                                {category.name}
                              </span>
                            </p>
                            <div className="flex justify-around my-5">
                              <button
                                className="px-4 py-2 capitalize bg-red-600 hover:bg-red-600/70 text-primary-color"
                                onClick={() => handleDelete(category.slug)}>
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
                    {edit && (
                      <div className="absolute w-screen h-screen top-0 left-0 bg-dark-color/80">
                        <div className="relative w-full h-full">
                          <button
                            className="absolute right-10 top-10"
                            onClick={() => setEdit(!edit)}>
                            {" "}
                            close
                          </button>
                          <div className="absolute top-[2rem] left-2/4 translate-x-[-50%] ">
                            <form
                              onSubmit={(e) => handleEdit(e, category.slug)}
                              className="bg-[#202020] p-2 rounded shadow-lg">
                              <Title text={`edit ${category.name}`} />
                              {error && <p>{error}</p>}
                              <div>
                                <FormInput
                                  type={"text"}
                                  name={"name"}
                                  id={"name"}
                                  onchange={(e) => setName(e.target.value)}
                                  labelFor={"name"}
                                  labelName={"name"}
                                  value={editCategoryName && name}
                                />
                                <FormInput
                                  type={"text"}
                                  name={"shortName"}
                                  id={"shortName"}
                                  onchange={(e) => setShortName(e.target.value)}
                                  labelFor={"shortName"}
                                  labelName={"shortName"}
                                  value={editCategoryName && shortName}
                                />
                                <FormInput
                                  type={"text"}
                                  name={"desc"}
                                  id={"desc"}
                                  onchange={(e) => setDesc(e.target.value)}
                                  labelFor={"desc"}
                                  labelName={"desc"}
                                  value={editCategoryName && desc}
                                />
                                <FormInput
                                  type={"file"}
                                  name={"logo"}
                                  id={"logo"}
                                  onchange={handleImgChange}
                                  labelFor={"logo"}
                                  labelName={"logo"}
                                />
                                <FormInput
                                  type={"color"}
                                  name={"color"}
                                  id={"color"}
                                  onchange={(e) => setColor(e.target.value)}
                                  labelFor={"color"}
                                  labelName={"color"}
                                  value={editCategoryName && color}
                                />
                              </div>
                              {previewSource && (
                                <img
                                  src={previewSource}
                                  alt="preview"
                                  className="h-20 w-20"
                                />
                              )}
                              <FormBtn text={`edit ${category.name}`} />
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#202020] p-2 rounded shadow-lg">
          <Title text="Add Category" />
          {error && <p>{error}</p>}
          <div>
            <FormInput
              type={"text"}
              name={"name"}
              id={"name"}
              onchange={(e) => setName(e.target.value)}
              labelFor={"name"}
              labelName={"name"}
            />
            <FormInput
              type={"text"}
              name={"shortName"}
              id={"shortName"}
              onchange={(e) => setShortName(e.target.value)}
              labelFor={"shortName"}
              labelName={"shortName"}
            />
            <FormInput
              type={"text"}
              name={"desc"}
              id={"desc"}
              onchange={(e) => setDesc(e.target.value)}
              labelFor={"desc"}
              labelName={"desc"}
            />
            <FormInput
              type={"file"}
              name={"logo"}
              id={"logo"}
              onchange={handleImgChange}
              labelFor={"logo"}
              labelName={"logo"}
            />
            <FormInput
              type={"color"}
              name={"color"}
              id={"color"}
              onchange={(e) => setColor(e.target.value)}
              labelFor={"color"}
              labelName={"color"}
            />
          </div>
          {previewSource && (
            <img src={previewSource} alt="preview" className="h-20 w-20" />
          )}
          <FormBtn text={"add category"} />
        </form>
      </div>
    </div>
  );
};
