import icon from "../../assets/icons/Untitled design (2).png";
const Loading = () => {
  return (
    <>
      <div className="bg-slate-900 w-full min-h-screen flex justify-center items-center">
        <div className="flex min-h-screen w-full items-center justify-center bg-slate-900">
          <div className="flex items-center justify-center">
            <a
              href="/"
              className="inline-flex items-center gap-2.5 text-2xl font-bold  md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200"
              aria-label="logo"
            >
              <img src={icon} alt="" className="h-16" />
              Please Wait..
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
