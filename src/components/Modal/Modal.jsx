const Modal = ({ children }) => {
  return (
    <>
      <div className="fixed left-0 top-0 bg-slate-700 opacity-[60%] w-full h-full grid place-content-center"></div>
      <div className="absolute left-0 top-[30%] right-0 ml-auto mr-auto grid place-content-center w-fit bg-white py-3 px-6 rounded-lg shadow-xl shadow-neutral-500">
        {children}
      </div>
    </>
  );
};

export default Modal;
