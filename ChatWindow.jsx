export default function ChatWindow({
  messages,
  loading,
  input,
  setInput,
  sendMessage,
  triggerFileSelect,
  children
}) {
  return (
    <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-xs ${
              msg.role === "user" ? "ml-auto bg-blue-100" : "bg-gray-100"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="text-sm text-gray-500">Loading...</div>}
      </div>

      <div className="p-4 border-t border-gray-200 flex flex-col gap-2">
        <input
          id="fileInput"
          type="file"
          accept=".pdf,.xls,.xlsx,.csv"
          multiple
          onChange={(e) => {
            const selectedFiles = Array.from(e.target.files);
            const event = new CustomEvent("files-selected", { detail: selectedFiles });
            window.dispatchEvent(event);
          }}
          className="hidden"
        />
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <button
              onClick={triggerFileSelect}
              className="px-4 py-2 bg-gray-300 text-black cursor-pointer rounded-md hover:bg-gray-400"
            >
              Add
            </button>
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded-md hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
