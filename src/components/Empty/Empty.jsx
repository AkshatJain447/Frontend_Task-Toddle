import empty from "../../assets/Empty.png";

const Empty = () => {
  return (
    <div className="grid place-content-center text-center">
      <img src={empty} className="w-[200px] lg:w-[550px]" alt="Empty" />
      <h1 className="font-semibold text-xl">Nothing added here yet</h1>
      <p>Click on the [+] Add button to add items to this course</p>
    </div>
  );
};

export default Empty;
