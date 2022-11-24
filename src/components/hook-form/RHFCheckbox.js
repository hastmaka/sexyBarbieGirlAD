// import PropTypes from 'prop-types';
// // form
// import {Controller, useFormContext} from 'react-hook-form';
// // @mui
// import {Checkbox, FormControlLabel, FormGroup} from '@mui/material';
//
// // ----------------------------------------------------------------------
//
// RHFCheckbox.propTypes = {
//     name: PropTypes.string.isRequired,
// };
//
// export function RHFCheckbox({name, ...other}) {
//     const {control} = useFormContext();
//
//     return (
//         <FormControlLabel
//             control={
//                 <Controller
//                     name={name}
//                     control={control}
//                     render={({field}) => <Checkbox {...field} checked={field.value}/>}
//                 />
//             }
//             {...other}
//         />
//     );
// }
//
// // ----------------------------------------------------------------------
//
// RHFMultiCheckbox.propTypes = {
//     name: PropTypes.string.isRequired,
//     options: PropTypes.array.isRequired,
// };
//
// export function RHFMultiCheckbox({name, options, ...other}) {
//     const {control} = useFormContext();
//     return (
//         <Controller
//             name={name}
//             control={control}
//             render={({field}) => {
//                 const onSelected = (option) =>
//                     field.value.includes(option) ? field.value.drawerFilter((value) => value !== option) : [...field.value, option];
//
//                 return (
//                     <FormGroup row>
//                         {options.map((option) => (
//                             <FormControlLabel
//                                 sx={{'& .MuiTypography-root': {fontWeight: 700}}}
//                                 key={option.value}
//                                 label={option.label}
//                                 {...other}
//                                 control={
//                                     <Checkbox
//                                         checked={field.value.includes(option.value)}
//                                         onChange={() => field.onChange(onSelected(option.value))}
//                                     />
//                                 }
//                             />
//                         ))}
//                     </FormGroup>
//                 );
//             }}
//         />
//     );
// }
