export default function Motivation() {
  return (
    <>
      <main className="relative bg-nearest-rgb-23-32-49">
        <section className="relative">
          <div className="bg-nearest-rgb-23-32-49">
            <div className="mx-auto lg:px-28 px-4 md:px-2">
              <h1 className="mb-4 lg:mb-10 text-center text-2xl sm:text-3xl lg:text-8xl md:mb-6 lg:py-3 font-extrabold bg-gradient-to-r from-cyan-400 to-purple-800 text-transparent bg-clip-text">
                About Us
              </h1>

              <p className="mb-6 text-gray-500 sm:text-sm md:mb-8 text-justify">
                Our project aims to address the growing concern of screen
                addiction and physical inactivity in children and young people
                by providing accessible and engaging opportunities for them to
                participate in sports and recreational activities. We believe
                that promoting physical activity and sports can have a positive
                impact on childrens physical, emotional, and social development,
                including improving their overall health and well-being.
                <br />
                <br />
                To achieve this, we are developing a website and a
                cross-platform application for iOS and Android devices, which
                will enable children to participate in sports tournaments and
                events at designated fields and locations known as SHOISHOB
                ZONES These zones will serve as safe and fun environments for
                children to engage in various physical activities and develop
                leadership qualities, self-confidence, and make friends.{" "}
                <a
                  href="#"
                  className="text-indigo-500 underline transition duration-100 hover:text-indigo-600 active:text-indigo-700 text-justify"
                ></a>{" "}
                Our project is not just about promoting physical activity but
                also aims to create a healthy environment that fosters positive
                growth and development in children. We believe that
                participating in sports and other physical activities can help
                children develop crucial life skills such as teamwork,
                communication, and resilience, which will be beneficial in their
                future personal and professional lives. Through our website and
                mobile application, we hope to provide children with an
                easy-to-use platform that enables them to connect with other
                like-minded individuals, participate in sports events and
                activities, and track their progress. We also aim to leverage
                technology to make the entire process more engaging and
                interactive, such as incorporating gamification elements to
                encourage participation and motivation.
              </p>

              <blockquote className="mb-6 border-l-4 pl-4 italic text-gray-500 sm:text-sm md:mb-8 md:pl-6">
                “In summary, our projects primary objective is to promote
                physical activity and sports among children and young people
                while providing them with accessible and engaging opportunities
                to participate in activities that foster personal growth and
                development. We believe that our approach will not only benefit
                individual children but also have a positive impact on the
                community as a whole, creating a healthy and supportive
                environment for all. ”
              </blockquote>
            </div>
          </div>
        </section>
        <div
          className="absolute inset-0 blur-[218px] max-w-lg h-[1400px] mx-auto sm:max-w-3xl sm:h-[400px]"
          style={{
            background:
              "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
            zIndex: -1,
          }}
        ></div>
      </main>
    </>
  );
}
