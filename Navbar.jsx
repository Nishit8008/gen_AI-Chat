
export default function Navbar({ showAbout, setShowAbout }) {
  return (
    <nav id="nav" className="bg-blue-600 text-white flex items-center justify-between px-6 py-3 relative">
      <div className="flex items-center gap-3">
        <img
          src="https://logos-world.net/wp-content/uploads/2022/05/Atos-Symbol-700x394.png"
          alt="Logo"
          className="w-17 h-9"
        />
        <span className="text-lg font-semibold">GenAI Chat</span>
      </div>
      <div>
        <button
          onClick={() => setShowAbout(!showAbout)}
          className="text-white cursor-pointer hover:underline"
        >
          About
        </button>
        {showAbout && (
          <div className="absolute right-6 top-16 bg-white text-black shadow-lg rounded-md p-4 w-72 z-10">
            <h3 className="font-semibold text-lg mb-2">About This App</h3>
            <p className="text-sm">
              This application allows you to ask data-related questions and upload PDF or Excel files.
              The backend processes your queries and returns answers, charts, and tables.
              Use this tool to easily discover insights from your data using natural language.
            </p>
          </div>
        )}
      </div>
    </nav>
  );
}
