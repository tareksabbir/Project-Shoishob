import panda from "../../assets/sponsor/Foodpanda-Logo.wine.png"
import shohoj from "../../assets/sponsor/Sohoz_limited_logo.svg.png"
import daraz from "../../assets/sponsor/daraz-logo.png"
import coca from "../../assets/sponsor/Coca-Cola_logo.svg.png"
import nes from "../../assets/sponsor/nescafe-logo-1.png"
import nogod from "../../assets/sponsor/Nagad-Logo.wine.png"
const TournamentSponsers = () => {
  return (
    <>
      <div className=" py-6 sm:py-8 lg:py-12 px-20">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-4 flex flex-col items-center md:mb-8 lg:flex-row lg:justify-between">
            <h2 className="mb-2 text-center text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text lg:mb-0 lg:text-3xl">
             Our Tournament Sponsors
            </h2>

            <p className="max-w-md text-center text-gray-400 lg:text-right">
              Filler text is dummy text which has no meaning however looks very
              similar to real text.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 rounded-lg md:grid-cols-3 lg:gap-6">
            <div className="flex h-16 items-center justify-center rounded-lg bg-slate-950  p-4  sm:h-32">
              <img src={panda} alt="" />
            </div>

            <div className="flex h-16 items-center justify-center rounded-lg bg-slate-950 p-4 text-gray-400 sm:h-32">
            <img src={shohoj} alt=""  className="p-10"/>
            </div>

            <div className="flex h-16 items-center justify-center rounded-lg bg-slate-950 p-4 text-gray-400 sm:h-32">
            <img src={daraz} alt=""  className="p-28"/>
            </div>

            <div className="flex h-16 items-center justify-center rounded-lg bg-slate-950 p-4 text-gray-400 sm:h-32">
            <img src={coca} alt=""  className="p-24"/>
            </div>

            <div className="flex h-16 items-center justify-center rounded-lg bg-slate-950 p-4 text-gray-400 sm:h-32">
            <img src={nogod} alt=""  className="p-24"/>
            </div>

            <div className="flex h-16 items-center justify-center rounded-lg bg-slate-950 p-4 text-gray-400 sm:h-32">
            <img src={nes} alt=""  />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TournamentSponsers;
