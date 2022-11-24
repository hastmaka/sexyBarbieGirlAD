// import PropTypes from 'prop-types';
// // form
// import {Controller, useFormContext} from 'react-hook-form';
// //material
// import {TextField} from '@mui/material';
// import {styled} from '@mui/material/styles';
// // ----------------------------------------------------------------------
//
// const CustomTextField = styled(TextField)(({theme}) => {
//     // debugger
//     return {
//         color: 'white'
//     }
// })
//
//
// //----------------------------------------------------------------------
//
// RHFTextField.propTypes = {
//     name: PropTypes.string,
// };
//
// export default function RHFTextField({name, ...other}) {
//     const {control} = useFormContext();
//
//     return (
//         <Controller
//             name={name}
//             control={control}
//             render={({field, fieldState: {error}}) => (
//                 <CustomTextField
//                     {...field}
//                     fullWidth
//                     value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
//                     error={!!error}
//                     helperText={error?.message}
//                     {...other}
//                 />
//             )}
//         />
//     );
// }
