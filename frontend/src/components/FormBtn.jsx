const FormBtn = ({ text, onClick }) => {
  return (
    <div className="flex justify-center py-4">
      <button
        type="submit"
        onClick={onClick}
        className="bg-yellow py-2 px-24 rounded-full font-bold capitalize text-primary-color">
        {text}
      </button>
    </div>
  );
};

export default FormBtn;
