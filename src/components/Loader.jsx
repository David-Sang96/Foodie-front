import { ClockLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="absolute inset-0 flex h-full items-center justify-center">
      <ClockLoader color="#ffa011" size={35} />
    </div>
  );
};

export default Loader;
