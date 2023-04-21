import {useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
// material
import {Box} from "@mui/material";
import ChildWrapper from "../../../../components/ChildWrapper/ChildWrapper";
import EzMuiGrid from "../../../../components/EzMuiGrid/EzMuiGrid";
import EzText from "../../../../components/ezComponents/EzText/EzText";
import {productSliceActions} from "../../../../store/productSlice";
import {sortArray} from "../../../../helper";
import {updateProductApi} from "../../../../helper/firebase/FirestoreApi";
import {tableSx} from "../../../../helper/sx/Sx";
import VariationGridToolBar from "./VariationGridToolBar";

//----------------------------------------------------------------

export default function VariationGrid({variation}) {
    const {tempProduct} = useSelector(slice => slice.product);
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [isAddActive, setIsAddActive] = useState(false);

    useEffect(_ => {
        setRows(variation)
    }, [variation])

    const processRowUpdate = useCallback(
        async (newRow, oldRow, rows) => {
            debugger
            await new Promise((resolve, reject) => {
                //check empty field
                if(!(!!newRow.color) || !(!!newRow.size)) {
                    return reject({type: 'error', content: 'No empty field allowed'});
                }
                //check if variation exist
                if(newRow.isNew) {
                    let tempRows = [...rows];
                    tempRows.splice(0,1);
                    const existVariation = tempRows.find(item => (
                            item.color.toLowerCase() === newRow.color.toLowerCase()) &&
                        item.size.toLowerCase() === newRow.size.toLowerCase()
                    );
                    if(!!existVariation) {
                        return reject({type: 'error', content: 'Variant already exit'});
                    }
                }
                resolve()
            })

            if(JSON.stringify(newRow) === JSON.stringify(oldRow)) {
                return oldRow
            } else {
                let {id, variation, ...rest} = {...tempProduct},
                    tempRows = [];
                if(newRow.isNew) {
                    tempRows = [...rows]
                    tempRows.splice(0,1);
                } else {
                    tempRows = [...rows]
                }
                let indexTempVariation = tempRows.findIndex(item => item.id === newRow.id);
                if(indexTempVariation >= 0) {
                    tempRows[indexTempVariation] = newRow;
                    debugger
                    // if(dataToUpdateProduct) {
                    // debugger
                    //update variation when product is in creating mode
                    //     dataToUpdateProduct(sortArray(tempRows))
                    // }
                } else {
                    //new variation
                    const {isNew, ...rest} = newRow;
                    tempRows = [...tempRows, rest];
                }
                window.dispatch(
                    productSliceActions.updateProduct({
                        ...rest,
                        id,
                        variation: sortArray(tempRows)
                    })
                )
                //if no id, the product was not uploaded yet
                if(id) updateProductApi(id, {id, variation: tempRows, ...rest})
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
            renderCell: (index) => index.api.getRowIndex(index.row.id) + 1
        }, {
            field: 'size',
            headerName: 'Size',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            editable: true,
        }, {
            field: 'price',
            headerName: 'Price',
            flex: 1,
            align: 'center',
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
        <ChildWrapper sx={{height: `${variation.length * 52 + 161}px`, padding: 0}}>
            <Box sx={{height: '100%', width: '100%'}}>
                <EzMuiGrid
                    rows={rows}
                    setRows={setRows}
                    columns={columns}
                    // rowHeight={85}
                    setRowModesModel={setRowModesModel}
                    rowModesModel={rowModesModel}
                    processRowUpdate={processRowUpdate}
                    isAddActive={isAddActive}
                    setIsAddActive={setIsAddActive}
                    components={{
                        Toolbar: VariationGridToolBar
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
                />
            </Box>
        </ChildWrapper>
    );
}
