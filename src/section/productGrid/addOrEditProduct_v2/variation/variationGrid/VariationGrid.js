import {useCallback, useEffect, useState} from "react";
// material
import {Box, capitalize} from "@mui/material";
import ChildWrapper from "../../../../../components/ChildWrapper/ChildWrapper";
import EzMuiGrid from "../../../../../components/EzMuiGrid/EzMuiGrid";
import EzText from "../../../../../components/ezComponents/EzText/EzText";
import {productSliceActions} from "../../../../../store/productSlice";
import {checkValidFields, sortArray} from "../../../../../helper";
import {update} from "../../../../../helper/firebase/FirestoreApi";
import {tableSx} from "../../../../../helper/sx/Sx";
import VariationGridToolBar from "./VariationGridToolBar";
import {colorArray, sizeArray} from "../../../../../helper/staticData/StaticData";
import EzSelect from "../../../../../components/ezComponents/EzSelect/EzSelect";

//----------------------------------------------------------------

export default function VariationGrid({editMode, tempProduct}) {
    const {variation, id, color, size, ...rest} = tempProduct;
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [isAddActive, setIsAddActive] = useState(false);

    useEffect(_ => {
        setRows(variation)
    }, [variation])

    const processRowUpdate = useCallback(
        async (newRow, oldRow, rows) => {
            //need to crate the variables outside to get the scope
            let tempVariation = rows.filter(item => !item.isNew),
                tempColor = [...color],
                tempSize = [...size];

            await new Promise((resolve, reject) => {
                //if isNew is true the row is added it, and we have the make a workaround to get the data
                if(newRow.isNew) {
                    const colorFromRow = rows.find(item => item.isNew)
                    newRow = {...newRow, color: colorFromRow.color, size: colorFromRow.size}
                }
                //check empty field
                const response = checkValidFields(newRow)
                if (response !== true) {
                    return reject({type: 'error', content: response.message});
                }
                //check if variation exist
                const existVariation = tempVariation.find(item => (
                    item.color.toLowerCase() === newRow.color.toLowerCase() &&
                    item.size.toLowerCase() === newRow.size.toLowerCase()
                ));
                if(!!existVariation) {
                    return reject({type: 'error', content: 'Variant already exit'});
                }
                resolve()
            })

            if(JSON.stringify(newRow) === JSON.stringify(oldRow)) {
                return oldRow
            } else {
                if(newRow.isNew) {
                    //new variation
                    //need to update variation, color and size
                    const {isNew, ...restFromNewVariation} = newRow;
                    //check if color exist, in case Yes update color
                    const existedColor = tempVariation.findIndex(item => item.color === restFromNewVariation.color);
                    if(existedColor === -1) {
                        tempColor = [...tempColor, {color: restFromNewVariation.color, image: []}]
                    }
                    //check if size exist, in case Yes update size
                    const existedSize = tempSize.findIndex(item => item.size === restFromNewVariation.size);
                    if(existedSize === -1) {
                        const size = sizeArray.find(item => item.size === restFromNewVariation.size)
                        tempSize = [...tempSize, size]
                    }
                    tempVariation = [...tempVariation, restFromNewVariation]
                    //update redux store
                    window.dispatch(
                        productSliceActions.setTempProduct({
                            ...rest,
                            color: tempColor,
                            size: tempSize,
                            variation: sortArray(tempVariation)
                        })
                    )
                } else {
                    //edit mode
                    let indexTempVariation = tempVariation.findIndex(item => item.id === newRow.id);
                    tempVariation[indexTempVariation] = newRow;
                    //update redux store
                    window.dispatch(
                        productSliceActions.setTempProduct({
                            ...rest, color, size,
                            variation: sortArray(tempVariation)
                        })
                    )
                }

                //if no id, the product was not uploaded yet
                if(id) {
                    window.dispatch(update({
                        id,
                        data: {
                            ...rest,
                            id,
                            color: editMode ? tempColor : color,
                            size: editMode ? tempSize : size,
                            variation: tempVariation,
                        },
                        collection: 'products'
                    }))
                }
                return newRow
            }
        },[]
    );

    const columns = [
        {
            field: 'id',
            headerName: '#',
            width: 40,
            align: 'center',
            headerAlign: 'center',
            filterable: false,
            renderCell: (params) => {
                let value = params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1;
                return isNaN(value) ? '' : value.toString()
            }
        },{
            field: 'color',
            headerName: 'Color',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            editable: true,
            renderEditCell: (params) => {
                if(params.row.isNew) {
                    return <EzSelect
                        initialData={colorArray}
                        value={params.row.color}
                        valueToIterate='color'
                        setValue={value => {
                            setRows(prev => {
                                const tempPrev = [...prev]
                                const indexToUpdate = tempPrev.findIndex(item => item.id === params.row.id);
                                tempPrev[indexToUpdate] = {
                                    ...tempPrev[indexToUpdate],
                                    color: value
                                }
                                params.row.color = value
                                return tempPrev
                            })
                        }}
                    />
                }
            },
        }, {
            field: 'size',
            headerName: 'Size',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            editable: true,
            renderEditCell: (params) => {
                if(params.row.isNew) {
                    return <EzSelect
                        initialData={sizeArray}
                        value={params.row.size}
                        valueToIterate='size'
                        setValue={value => {
                            setRows(prev => {
                                const tempPrev = [...prev]
                                const indexToUpdate = tempPrev.findIndex(item => item.id === params.row.id);
                                tempPrev[indexToUpdate] = {
                                    ...tempPrev[indexToUpdate],
                                    size: value
                                }
                                params.row.size = value
                                return tempPrev
                            })
                        }}
                    />
                }
            },
        }, {
            field: 'price',
            headerName: 'Price',
            flex: 1,
            align: 'center',
            type: 'number',
            headerAlign: 'center',
            editable: true,
            valueFormatter: ({value}) => `$ ${value}`
        }, {
            field: 'stock',
            headerName: 'Stock',
            flex: 1,
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            editable: true,
            renderCell: (params) => {
                let s = params.row.stock,
                    tempColor = s <= 5 ? '#d00000' : s <= 10 ? '#dc2f02' : s <= 20 ? '#ffb703' : s <= 50 ? '#006d77' : '';
                return (
                    <Box sx={{color: tempColor}}>{params.row.stock}</Box>
                )
            }
        }, {
            field: 'discount',
            headerName: 'Discount',
            type: 'number',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            editable: true,
            renderCell: (params) => {
                let tempColor = params.row.discount > 0 ? 'green' : 'red';
                return (
                    <EzText text={params.row.discount} sx={{fontSize: '13px', color: tempColor}}/>
                )
            }
        }, {
            field: 'active',
            headerName: 'Active',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            type: 'boolean',
            editable: true,
            renderCell: (params) => {
                let tempColor = params.row.active === true ? 'green' : 'red';
                return <EzText text={params.row.active? 'true' : 'false'} sx={{fontSize: '13px', color: tempColor}}/>
            }
        }
    ]

    return (
        <ChildWrapper sx={{height: 'calc(100vh - 450px)', padding: 0}}>
            <Box sx={{height: '100%', width: '100%'}}>
                <EzMuiGrid
                    rows={rows}
                    setRows={setRows}
                    columns={columns}
                    // rowHeight={85}
                    // hideFooter={true}
                    setRowModesModel={setRowModesModel}
                    rowModesModel={rowModesModel}
                    processRowUpdate={(newRow, oldRow) => processRowUpdate(newRow, oldRow, rows)}
                    isAddActive={isAddActive}
                    setIsAddActive={setIsAddActive}
                    components={{
                        Toolbar: editMode ? VariationGridToolBar : ''
                    }}
                    componentsProps={{
                        toolbar: {
                            setRows,
                            rowModesModel,
                            setRowModesModel,
                            tempProduct,
                            columns,
                            isAddActive,
                            setIsAddActive
                        },
                    }}
                    disableSelectionOnClick
                    sx={({palette}) => tableSx(palette)}

                    onCellEditStop={(params) => {
                        debugger
                        const { id, field, value } = params;
                        const updatedRows = [...rows];
                        const index = updatedRows.findIndex((row) => row.id === id);
                        updatedRows[index] = { ...updatedRows[index], [field]: value };
                        setRows(updatedRows);
                    }}
                />
            </Box>
        </ChildWrapper>
    );
}
