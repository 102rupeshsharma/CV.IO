import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from '../../../ReduxManager/dataStoreSlice';
import './ProfileUpload.css';

const ProfileUpload = () => {
    const imageFile = useSelector(state => state.dataStore.imageFile);
    const dispatch = useDispatch();

    function handleChange(e) {
        const file = e.target.files[0];
        const fileType = file?.type;
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

        if (file && validImageTypes.includes(fileType)) {
            const temp = URL.createObjectURL(file);
            dispatch(updateState({
                key: 'imageFile',
                value: temp,
            }));
        } else {
            alert('Uploaded file type should be jpg/png!');
        }
    }

    return (
        <div className="profile-upload-container">
        <div className="profile-image-section">
            <img
                className="profile-preview"
                src={imageFile || "/face-icon.png"}
                alt="profile"
            />
        </div>
        <div className="profile-text-section">
            <p className="upload-instruction">Add a photo to your resume</p>
            <label className="upload-button">
                Add a photo
                <input
                    type="file"
                    onChange={handleChange}
                    className="hidden-file-input"
                />
            </label>
        </div>
    </div>
);
};
export default ProfileUpload;



// import React from "react";
// import { useSelector,useDispatch } from "react-redux";
// import { updateState} from '../../../ReduxManager/dataStoreSlice'
  
// function App() {
//     const imageFile= useSelector(state=> state.dataStore.imageFile)
//     const dispatch = useDispatch();
    
//     function handleChange(e) {
//         let file = e.target.files[0]
//         const  fileType = file['type'];
//         const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
//         if (validImageTypes.includes(fileType)) {
//             let temp=URL.createObjectURL(file)

//             dispatch(updateState({
//                 key:'imageFile',
//                 value:temp,
//             }))
//         }
//         else{
//             alert('Uploaded file type should be jpg/png!')
//         }
//     }
//     return (
//         <div className="container">
    
//             <div className="row">
//                 <img style={{height:'120px', width:'100px', background:'grey',padding:0}} src={imageFile} alt='profile'/>
//             </div>
//             <div className="row">
//                 <input type="file" onChange={handleChange} style={{padding:'5px 0 0 0'}} />
//             </div>
//         </div>
//     );
// } 
// export default App;