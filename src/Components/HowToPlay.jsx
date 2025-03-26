const HowToPlay = () => {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center px-8 py-16">
      <article className="max-w-3xl text-center space-y-12">
        {/* Page Header */}
        <header>
          <h1 className="text-5xl font-extrabold text-blue-400 mb-6">
            How to Play 🕹️
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Welcome to{" "}
            <span className="font-semibold text-white">SQL Adventure</span>!
            Ready to test your SQL skills? Follow these simple steps to start
            playing and mastering SQL.
          </p>
        </header>

        {/* Step 1 */}
        <section className="flex flex-col items-center text-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold text-blue-300">
              Step 1: Start the Game 🎮
            </h2>
            <p className="text-lg text-gray-300 mt-3">
              Click the{" "}
              <span className="text-blue-400 font-semibold">Start Playing</span>{" "}
              button to begin.
            </p>
          </div>
        </section>

        {/* Step 2 */}
        <section className="flex flex-col items-center text-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold text-blue-300">
              Step 2: Arrange the Query 🧩
            </h2>
            <p className="text-lg text-gray-300 mt-3">
              You will see a set of unordered SQL statements. Drag and drop them
              in the correct order.
            </p>
          </div>
        </section>

        {/* Step 3 */}
        <section className="flex flex-col items-center text-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold text-blue-300">
              Step 3: Race Against Time ⏳
            </h2>
            <p className="text-lg text-gray-300 mt-3">
              Complete the challenge before the timer runs out! The faster you
              solve it, the higher your score.
            </p>
          </div>
        </section>

        {/* Step 4 */}
        <section className="flex flex-col items-center text-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold text-blue-300">
              Step 4: Learn & Improve 📈
            </h2>
            <p className="text-lg text-gray-300 mt-3">
              View your results, analyze mistakes, and play again to improve
              your SQL skills.
            </p>
          </div>
        </section>

        {/* Call-to-Action */}
        <footer className="mt-8">
          <a
            href="/"
            className="bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-transform transform hover:scale-105 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg"
            aria-label="Start Playing the SQL Game"
          >
            Back to Home
          </a>
        </footer>
      </article>
    </main>
  );
};

export default HowToPlay;
