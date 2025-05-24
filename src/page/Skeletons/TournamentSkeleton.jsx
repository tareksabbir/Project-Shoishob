const TournamentSkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-900 animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0"></div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Cover Image Skeleton */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12 group h-96 bg-slate-800">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10"></div>
              <div className="absolute bottom-8 left-8 z-20 flex items-center space-x-4 mb-4">
                <div className="w-20 h-20 rounded-full bg-slate-700"></div>
                <div>
                  <div className="h-6 w-48 bg-slate-700 mb-2 rounded"></div>
                  <div className="h-4 w-60 bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>

            {/* Main Grid Skeleton */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
                  <div className="h-6 w-56 bg-slate-700 mb-6 rounded"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-700 rounded w-full"></div>
                    <div className="h-4 bg-slate-700 rounded w-5/6"></div>
                    <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
                  <div className="h-6 w-64 bg-slate-700 mb-6 rounded"></div>
                  <div className="h-24 bg-slate-700 rounded"></div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                  <div className="h-6 w-48 bg-slate-700 mb-6 mx-auto rounded"></div>
                  <div className="space-y-4">
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="flex items-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/30"
                      >
                        <div className="w-5 h-5 bg-slate-600 rounded mr-4 flex-shrink-0"></div>
                        <div className="w-full space-y-2">
                          <div className="h-3 w-24 bg-slate-700 rounded"></div>
                          <div className="h-4 w-40 bg-slate-600 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button Skeleton */}
                <div className="w-full h-14 bg-slate-700 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
};

export default TournamentSkeleton;
