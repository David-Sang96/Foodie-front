const fetchErrorMsg = (field, isError) => {
  if (isError && isError.message) {
    // Check if `isError.message` is an object and has `path` and `msg`
    if (typeof isError.message === "object" && isError.message.path === field) {
      return (
        <p className="text-xs font-medium italic text-red-500">
          {isError.message.msg}
        </p>
      );
    } else if (typeof isError.message === "string") {
      return (
        <p className="text-xs font-medium italic text-red-500">
          {isError.message}
        </p>
      );
    }
  }
  return null;
};

export default fetchErrorMsg;
