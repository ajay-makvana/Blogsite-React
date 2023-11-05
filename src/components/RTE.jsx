import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <>
      <div className="w-full">
        {label && <label className="inline-bock mb-1 pl-1">{label}</label>}
        {/* using Controll so no need forwardRef */}
        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange } }) => (
            // Editor from tinymce
            <Editor
              initialValue={defaultValue}
              onEditorChange={onChange}
              init={{
                initialValue: { defaultValue },
                height: 500,
                branding: false,
                menubar: true,
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
                ],
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          )}
        />
      </div>
    </>
  );
}

export default RTE;
