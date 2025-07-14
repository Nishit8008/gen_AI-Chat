import { useEffect, useState } from "react";

export default function FileUploader({ files, setFiles }) {
  const [updatedFiles, setUpdatedFiles] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      const selected = e.detail;
      setFiles((prev) => [...prev, ...selected]);
      setUpdatedFiles((prev) => [...prev, ...selected]);
    };
    window.addEventListener("files-selected", handler);
    return () => window.removeEventListener("files-selected", handler);
  }, [setFiles]);

  return (
    updatedFiles.length > 0 && (
      <div className="text-sm text-gray-600 mt-1 space-y-1">
        {updatedFiles.map((file, idx) => (
          <div key={idx}>📎 <strong>{file.name}</strong></div>
        ))}
      </div>
    )
  );
}
