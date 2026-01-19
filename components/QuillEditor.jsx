"use client";

import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export default function QuillEditor({ value, onChange }) {
  return (
    <SunEditor
      setContents={value}
      onChange={onChange}
      setOptions={{
        buttonList: [
          ["undo", "redo"],
          ["bold", "italic", "underline"],
          ["list", "align"],
          ["link"],
          ["formatBlock"],
          ["removeFormat"],
        ],
      }}
      height="200px"
    />
  );
}
