// // material
// import {MenuItem, Stack, TextField} from "@mui/material";
// import {styled} from '@mui/material/styles';
// import {Controller, useFormContext} from "react-hook-form";
//
// //----------------------------------------------------------------
//
// const RootStyle = styled(Stack)(({theme}) => ({}));
//
// //----------------------------------------------------------------
//
// export default function RHFSelect({name, options, ...other}) {
//     // debugger
//     const {control} = useFormContext();
//     return (
//         <Controller
//             name={name}
//             control={control}
//             render={({field, fieldState: {error}}) => (
//                 <TextField
//                     select
//                     fullWidth
//                     {...field}
//                     {...other}
//                     error={!!error}
//                 >
//                     {options.map((option) => (
//                         <MenuItem key={option.value} value={option.value}>
//                             {option.label}
//                         </MenuItem>
//                     ))}
//                 </TextField>
//             )}
//         />
//     );
// }
