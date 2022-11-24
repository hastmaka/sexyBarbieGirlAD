// import PropTypes from 'prop-types';
// // form
// import {Controller, useFormContext} from 'react-hook-form';
// //material
// import {TextareaAutosize} from '@mui/material';
//
// // ----------------------------------------------------------------------
//
// // const CustomTextField = styled(TextField)((props) => {
// //     // debugger
// //     return {
// //         color: 'white'
// //     }
// // })
//
//
// //----------------------------------------------------------------------
//
// RHFTextArea.propTypes = {
//     name: PropTypes.string,
// };
//
// export default function RHFTextArea({name, ...other}) {
//
//     const {control} = useFormContext();
//     return (
//         <Controller
//             name={name}
//             control={control}
//             render={({field, fieldState: {error}}) => (
//                 <TextareaAutosize
//                     {...field}
//                     {...other}
//                 />
//             )}
//         />
//     );
//
// }
