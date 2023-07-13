// "use client";

// import { useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState, ContentState, convertFromHTML, convertToRaw } from "draft-js";
// import draftToHtml from "draftjs-to-html";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// export default function MySharedProjects() {
//     const[editorState, setEditorState] = useState(EditorState.createWithContent(
//         ContentState.createFromBlockArray(
//             convertFromHTML('<p>Hello</p>')
//         )
//         ));
    
//         const { control, handleSubmit } = useForm();
        

//     const onSubmit = (data) => {
//         console.log(data);
//         console.log(editorState);
//         console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <Controller
//                 name="editor"
//                 control={control}
//                 defaultValue={editorState}
//                 render={({ field }) => (
//                 <Editor
//                     editorState={field.value}
//                     onEditorStateChange={(editorState) => field.onChange(editorState)}
//                 />
//                 )}
//             />
//         <button type="submit">Submit</button>
//         </form>
//     )
// }

export default function MySharedProjects() {
    return (
        <h1>Hello</h1>
    )
}