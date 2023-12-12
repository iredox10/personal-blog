import React from 'react'

export const Comment = () => {
  return (
    <div>
      <div className="px-4 md:px-36 my-5">
        <div className="relative">
          <textarea
            name="comment"
            id="comment"
            cols="30"
            rows="5"
            className="bg-dark-color/80 text-secondary-color p-2"></textarea>
          <button className="absolute bottom-[-3rem] left-0 bg-yellow hover:bg-yellow/40 px-4 py-2">
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}
