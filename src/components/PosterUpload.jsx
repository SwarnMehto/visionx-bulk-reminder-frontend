"use client";

import { useState } from "react";

export default function PosterUpload() {
  const [file, setFile] = useState(null);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {file && (
        <div style={styles.preview}>
          {file.name}
        </div>
      )}
    </div>
  );
}

const styles = {
  preview: {
    marginTop: "10px",
    fontSize: "12px",
    background: "#f1f5f9",
    padding: "8px",
    borderRadius: "8px",
  },
};