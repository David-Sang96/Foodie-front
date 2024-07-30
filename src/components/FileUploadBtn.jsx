/* eslint-disable react/prop-types */
const FileUploadBtn = ({ onChange }) => {
  return (
    <input
      required
      type="file"
      name="photo"
      id="photo"
      className="w-48 cursor-pointer rounded-lg bg-gradient-to-br from-gray-600 to-gray-700 text-sm text-white/80 shadow-lg shadow-gray-700/60 file:cursor-pointer file:rounded-lg file:border-none file:bg-gradient-to-b file:from-orange file:to-orange file:px-2 file:py-1 file:text-white file:shadow-lg file:shadow-orange/50 md:w-60 md:text-base"
      onChange={onChange}
    />
  );
};

export default FileUploadBtn;
