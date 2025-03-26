const AboutUs = () => {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center px-8 py-16">
      <article className="max-w-3xl text-center space-y-12">
        {/* Header Section */}
        <header>
          <h1 className="text-5xl font-extrabold text-blue-400 mb-4">
            About Us
          </h1>
          <p className="text-lg leading-relaxed text-gray-300">
            Welcome to{" "}
            <span className="font-semibold text-white">SQL Adventure</span>, the
            ultimate platform for SQL enthusiasts and learners! We believe
            learning SQL should be{" "}
            <span className="text-blue-300">interactive</span>,
            <span className="text-blue-300"> engaging</span>, and{" "}
            <span className="text-blue-300">fun</span>. Our mission is to
            provide a hands-on experience that sharpens your SQL skills through
            a unique gaming challenge.
          </p>
        </header>

        {/* Game Description Section */}
        <section>
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">
            Learn SQL the Fun Way 🎮
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            At SQL Adventure, we’ve designed an innovative SQL-based game where
            you are given unordered SQL queries. Your mission? Arrange them
            correctly within a time limit! This gamified approach enhances your
            ability to structure complex SQL queries efficiently.
          </p>
        </section>

        {/* Benefits Section */}
        <section>
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">
            Why Play Our Game? 🚀
          </h2>
          <ul className="text-lg space-y-3 text-gray-300">
            <li className="flex gap-2 items-start">
              <span className="text-blue-400 font-semibold">
                ➤ Sharpen Your SQL Skills:
              </span>{" "}
              Improve query structuring in a fun, challenging environment.
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-blue-400 font-semibold">
                ➤ Race Against Time:
              </span>{" "}
              Test your speed and accuracy in solving SQL challenges.
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-blue-400 font-semibold">
                ➤ Data-Driven Insights:
              </span>{" "}
              Analyze gameplay patterns and improve your learning.
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-blue-400 font-semibold">
                ➤ Compete & Improve:
              </span>{" "}
              Track progress and challenge yourself to become an SQL master.
            </li>
          </ul>
        </section>

        {/* Vision Section */}
        <section>
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">
            Our Vision 🔥
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Our goal is to revolutionize SQL learning by making it more
            interactive and engaging. Whether you are a beginner learning the
            basics or a developer refining your skills, SQL Adventure provides a{" "}
            <span className="text-blue-300">dynamic</span> way to learn SQL.
          </p>
        </section>

        {/* Call-to-Action Section */}
        <footer>
          <a
            href="/"
            className="bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-transform transform hover:scale-105 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg"
            aria-label="Start Playing the SQL Game"
          >
            Back To Home
          </a>

          {/* <a
            href="/dash"
            className="bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-transform transform hover:scale-105 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg"
            aria-label="Start Playing the SQL Game"
          >
            🚀 Start Playing Now
          </a> */}
        </footer>
      </article>
    </main>
  );
};

export default AboutUs;
