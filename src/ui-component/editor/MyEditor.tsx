import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import { Box } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import React from "react";

type MyEditorTypes = {
  initialValue: any;
  onEditorChange: any;
  isPreformatted?: boolean;
  onClick?: any;
  onFocus?: any;
  editorHeight?: number;
  [x: string]: any;
};

const MyEditor = ({
  initialValue,
  onEditorChange,
  isPreformatted = false,
  onClick,
  onFocus,
  editorHeight = 500,
  ...props
}: MyEditorTypes) => {
  const editorRef: any = React.useRef(null);

  const getInitialValue = () => {
    if (isPreformatted) {
      return <pre>initialValue</pre>;
    } else {
      return initialValue;
    }
  };

  return (
    <GrammarlyEditorPlugin clientId="client_XceQ4Hc6Jw4SS4kSvkSWVx">
      <Editor
        apiKey="w9b8q1k5xygg3uyj0vqhk0w9lgn1xog0f4auzbg5h8dc8ql6"
        onInit={(evt: any, editor: any) => (editorRef.current = editor)}
        initialValue={initialValue}
        onClick={onClick}
        onFocus={onFocus}
        init={{
          height: editorHeight,
          menubar: true,
          forced_root_block: isPreformatted ? "pre" : "div",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            // "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            // "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Poppins,Helvetica,Arial,sans-serif; font-size:14px } pre {font-family:Poppins,Helvetica,Arial,sans-serif;}",
          branding: false,
        }}
        onEditorChange={(value: string, editor: any) => {
          onEditorChange(value, editor);
        }}
        {...props}
      />
    </GrammarlyEditorPlugin>
  );
};

export default MyEditor;
