// material
import {DataGrid, GridActionsCellItem, GridRowModes} from "@mui/x-data-grid";
import {useCallback, useMemo} from "react";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import {Tooltip} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";

//----------------------------------------------------------------
const tableSx = {
    borderRadius: '4px',
    border: '1px solid lightgrey'
};

//----------------------------------------------------------------

export default function EzMuiGrid({
    rows,
    columns,
    rowModesModel,
    setRowModesModel,
    ...rest
}) {
    const handleRowEditStart = (params, event) => event.defaultMuiPrevented = true;
    const handleRowEditStop = (params, event) => event.defaultMuiPrevented = true;

    const handleProcessRowUpdateError = useCallback((error) => {
        window.displayNotification({type: error.type, content: error.content})
        console.log(error)
    }, []);

    const handleEditClick = useCallback((id) => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}})
    }, [rowModesModel]);

    const handleSaveClick = useCallback((id) => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}})
        rest.setIsAddActive(false)
    }, [rowModesModel]);

    const handleCancelClick = useCallback((id) => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View, ignoreModifications: true}});

        const editedRow = rows.find(item => item.id === id);
        if (editedRow.isNew) {
            rest.setRows(prev => prev.filter(item => item.id !== id))
        }
        rest.setIsAddActive(false)
    }, [rowModesModel]);

    const allProductsVariantsGridColumns = useMemo(
        () => [
            ...columns,
            {
                field: 'action',
                headerName: 'Action',
                align: 'center',
                type: 'actions',
                sortable: false,
                getActions: (params) => {
                    const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;
                    if (isInEditMode) {
                        return [
                            <GridActionsCellItem
                                icon={<SaveIcon sx={{fill: '#00b764'}}/>}
                                label='Save'
                                onClick={_ => {
                                    rest.setIsAddActive(false);
                                    handleSaveClick(params.id)
                                }}
                            />,
                            <GridActionsCellItem
                                icon={<CancelIcon sx={{fill: '#ff0000'}}/>}
                                label='Cancel'
                                className='textPrimary'
                                onClick={_ => {
                                    rest.setIsAddActive(false);
                                    handleCancelClick(params.id)
                                }}
                                color='inherit'
                            />,
                        ];
                    }
                    return [
                        <Tooltip title='Edit'>
                            <GridActionsCellItem
                                icon={<EditIcon sx={{fill: '#999'}}/>}
                                label='Edit'
                                disabled={isInEditMode === true || rest.isAddActive}
                                onClick={_ => {
                                    rest.setIsAddActive(true);
                                    handleEditClick(params.id)
                                }}
                            />
                        </Tooltip>
                    ]
                },
            }
        ], [rowModesModel, handleSaveClick, handleCancelClick, handleEditClick, rest.isAddActive])


    return (
        <DataGrid
            sx={tableSx}
            rows={rows}
            columns={allProductsVariantsGridColumns}
            getRowId={row => row.id}

            //height of table is calculated depending on how many rows has
            //and nothing about pagination work because is handling auto
            autoPageSize
            // pageSize={10}
            // pageSizeOptions={[10, 25, 50, 100]}

            //to edit function in v5 editMode and experimentalFeatures are required
            editMode='row'
            onRowEditStart={handleRowEditStart}//disable edit with dbclick
            onRowEditStop={handleRowEditStop}//disable edit with dbclick
            experimentalFeatures={{newEditingApi: true}}
            onRowModesModelChange={model => setRowModesModel(model)}
            rowModesModel={rowModesModel}
            onProcessRowUpdateError={handleProcessRowUpdateError}
            {...rest}
        />
    );
}


EzMuiGrid.prototype = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    rowModesModel: PropTypes.object.isRequired,
    setRowModesModel: PropTypes.func.isRequired,
    rest: PropTypes.object
}