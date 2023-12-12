import React from 'react'

export const CommentList = (comment) => {
  return (
    <div className="text-secondary-color my-10 p-3 md:w-2/4 md:mx-32">
      <h1 className=" font-bold text-xl">comments(3)</h1>
      <div className="bg-dark-color p-2 ">
        <div className="capitalize flex justify-between my-2">
          <h1 className="text-yellow font-bold">username</h1>
          <p>date</p>
        </div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab
          consectetur labore vitae. Eum laborum vero id nihil ratione aliquid
          assumenda.
        </p>
      </div>
    </div>
  );
}
