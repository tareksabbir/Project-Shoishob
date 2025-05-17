const TurfCardSkeleton = () => {
  const skeletonCards = Array.from({ length: 10 }); 
  return (
    <div className="flex flex-wrap justify-center">
      {skeletonCards.map((_, index) => (
        <div key={index} className="p-1 lg:w-1/5 md:w-1/3 w-1/2">
          <div className="h-full bg-slate-900 flex flex-col items-center p-6 rounded-lg animate-pulse">
            <div className="w-16 h-16 bg-gray-700 rounded-full mb-2"></div>

            <div className="flex-grow text-center w-full">
              <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto mt-3 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-5/6 mx-auto mb-3"></div>
              <div className="h-3 bg-gray-800 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TurfCardSkeleton;
