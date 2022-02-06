import BraftEditor from "braft-editor";
import { Controller } from "react-hook-form";
import { editorUploadFn } from "../lib/upload";
import "braft-editor/dist/index.css";

const Editor = ({ control }) => {
  return (
    <Controller
      name="content"
      control={control}
      defaultValue={""}
      render={({ field }) => {
        return (
          <BraftEditor
            media={{ uploadFn: editorUploadFn }}
            onChange={(e) => {
              field.onChange(e.toHTML());
            }}
            placeholder="发点什么好呢..."
          />
        );
      }}
    />
  );
};
export default Editor;
