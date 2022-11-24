// import PropTypes from 'prop-types';
// // form
// import {Controller, useFormContext} from 'react-hook-form';
// //material
// import {TextField} from '@mui/material';
// import styled from 'styled-components';
// import {useState} from "react";
//
// // ----------------------------------------------------------------------
//
// const CustomTextField = styled(TextField)((props) => {
//     // debugger
//     return {
//         color: 'white'
//     }
// })
//
//
// //----------------------------------------------------------------------
//
// RHFTextFieldMultipleFiles.propTypes = {
//     name: PropTypes.string,
// };
//
// export default function RHFTextFieldMultipleFiles({name, ...other}) {
//     const [images, setImages] = useState([]);
//     const {control} = useFormContext();
//     console.log(images);
//     return (
//         <Controller
//             name={name}
//             control={control}
//             render={({field, fieldState: {error}}) => (
//                 <CustomTextField
//                     {...field}
//                     fullWidth
//                     onChange={(e) => {
//                         for (let i = 0; i < e.target.files.length; i++) {
//                             const newImage = e.target.files[i];
//                             newImage['id'] = i + 1;
//                             setImages(prev => [...prev, newImage])
//                         }
//                         field.onChange(e.target.files)
//                     }}
//                     value={images.map(img => {
//                         debugger
//                         return img.name
//                     })}
//                     error={!!error}
//                     helperText={error?.message}
//                     {...other}
//                 />
//             )}
//         />
//     );
//
// }
