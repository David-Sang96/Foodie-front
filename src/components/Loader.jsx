import { MutatingDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="absolute inset-0 flex h-full items-center justify-center">
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#fb923c"
        secondaryColor="#fb923c"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
      />
    </div>
  );
};

export default Loader;
