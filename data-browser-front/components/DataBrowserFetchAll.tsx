import * as React from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {useCallback, useEffect, useRef, useState} from "react";
import {
    Box,
    Button,
    CircularProgress,
    debounce,
    Divider, FormControl, InputLabel,
    List,
    ListItem,
    MenuItem,
    Modal, Select, TextField,
    Typography
} from "@mui/material";
import {CancelOutlined, Close, Remove} from "@mui/icons-material";
import { AllTableDataConfig } from "@/Utils/configuration";


export default function DataBrowserFetchAll() {

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [operator, setOperator] = useState("equals");
    const [order, setOrder] = useState('ASC');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [tableName, setTableName] = useState<>("Product") // ProductForecast Site, Store, Product
    const [selectedFilters, setSelectedFilters] = useState<>([]) // ProductForecast Site, Store, Product
    const [datas, setDatas] = useState<>([])
    const [columns, setColumns] = useState<GridColDef[]>([])
    const [MetaDatas, setMetaDatas] = useState<>([])
    const [mainInput, setMainInput] = useState('')
    const [filterValue, setFilterValue] = useState<any>(null)
    const [savedConfigurations, setSavedConfigurations] = useState<[]>(AllTableDataConfig)
    const didFetchRef = useRef(false)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {

        // if (didFetchRef.current === false) {
        //     didFetchRef.current = true
        //     fetchDataBrowser()
        //
        // }
        fetchDataBrowser(tableName, order, page, rowsPerPage)
    }, [tableName, order, page, rowsPerPage])
    async function fetchDataBrowser(tableName: string = 'Product', order: string = 'ASC', page: number = 1, rowsPerPage: number = 10) {
        try {
            let path = '/browser'
            if (tableName !== undefined) {
                path = `/browser/${tableName}?`
            }
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + path +
                new URLSearchParams({
                    order: order,
                    page: page,
                    take: rowsPerPage
                })
                , {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
            const json = await res.json()
            setDatas(json?.data)
            setColumns(json?.data[0] && Object.entries(json.data[0]).map(([key, value]) => {
                return {
                    field: key,
                    headerName: key.split(/(?=[A-Z])/).join(' '),
                    type: (key === 'date' || key === 'entryDate') ? 'date' : value === null ? 'string' : typeof value,
                    width: 200,   //columnSize*6, //
                    // editable: true,
                    valueGetter: (params: GridValueGetterParams) => (key === 'date' || key === 'entryDate') ? new Date(params.row[key]) : params.row[key]

                }
            }));
            setPage(json.meta.page)
            setOrder(json.meta.order)
            setCount(json.meta.itemCount)
            setRowsPerPage(json.meta.take)

        } catch (e: any) {
            console.log(e.message)
        }

    }

    const debouncedUpdateData = useCallback(debounce(updateData, 500), [])

    function handleToDoChange(e: { target: any }, id: number) {
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        const copy = [...datas]
        const idx = datas.findIndex((data) => data.id === id)
        const changedToDo = {
            ...datas[idx],
            [name]: value
        }
        copy[idx] = changedToDo
        debouncedUpdateData(changedToDo)
        setDatas(copy)
    }
    async function updateData(data: { name: string, completed: boolean, id: number }) {
        const values = {
            name: data.name,
            completed: data.completed
        }
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/datas/${data.id}`, {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const labelDisplayedRows = ({from, to, count}) => {
        return `${from}-${to} of ${count} rows`;
    };
    function compareFilterObject(obj1, obj2) {
        return obj1.tableName=== obj2.tableName && obj1.name === obj2.name;
    }
    function handleMainInputChange(e: any) {
        setMainInput(e.target.value)
    }
    function handleKeyDown(e: { key: string }) {
        if (e.key === 'Enter') {
            if (mainInput.length > 0) {
                // addToDo(mainInput)
                setMainInput('')
            }
        }
    }




    return (
        <div style={{height: '100%', width: '95vw'}}>

                {/*Table Name: {tableName}*/}

            <List style={{display: 'flex', flexDirection: 'row', padding: 0, margin: 10}}>
                {savedConfigurations.map(
                    (tableDataConfig, idx) => (
                        <ListItem key={idx}>
                            <Button onClick={() => {
                                setRowsPerPage(10);
                                setPage(1);
                                setTableName(tableDataConfig.tableName)
                            }}
                                    variant="outlined"
                                    style={{
                                        backgroundColor: tableName === tableDataConfig.tableName ? "rgba(2,121,169,0.8)" : "#fff",
                                        color: tableName === tableDataConfig.tableName ? "#fff" : "rgba(2,121,169,0.8)",
                                    }}
                            >
                                {tableDataConfig.tableName.split(/(?=[A-Z])/).join(' ')}
                            </Button>
                        </ListItem>
                    ))}
            </List>

            <Divider/>
                {/*Filter Actions Header*/}

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '95vw',
                margin : 5,
            }}>
                <h2 style={{paddingLeft: 4, color: "#8540f8"}}>Filters</h2>
                <div>
                    <Button variant="outlined" onClick={handleOpen}
                            style={{height: "40px", color: "#8540f8", margin: 10}}>Add filter</Button>
                    {selectedFilters.filter(filterItem => filterItem.tableName === tableName).length > 0 &&
                        <Button variant="outlined"
                                onClick={() => setSelectedFilters(selectedFilters.filter(filterItem => filterItem.tableName !== tableName))}
                                style={{height: "40px", color: "#8540f8", margin: 10}}>
                            Clear filter
                        </Button>
                    }
                </div>
            </div>
            {/*Header*/}
            {
                selectedFilters.filter(filterItem => filterItem.tableName === tableName).length > 0 &&
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',

                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '95vw',
                        margin: 5,
                        flex: 3
                    }}>
                        <h3 style={{paddingLeft: 4, flex: 2, color: "#696868",}} > Name </h3>
                        <h3 style={{paddingLeft: 4, flex: 1, color: "#696868",}} > Operator </h3>
                        <h3 style={{paddingLeft: 4, flex: 3.5, color: "#696868",}} > Values </h3>
                    </div>
                    <h3 style={{paddingLeft: 4, color: "#696868",}}> Remove Action </h3>
                </div>
            }

            <Divider/>
            {
                selectedFilters.filter(filterItem => filterItem.tableName === tableName).map((filterItem, idx) => (
                    <div key={idx} style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        width: '95vw',
                        paddingTop: 5,
                        margin: 5
                    }}>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flex: 3, justifyContent: 'space-between'}}>
                            <div style={{flex: 2}}>
                                <h3 style={{paddingLeft: 4, color: "#111111", margin: 2}}>{filterItem.label}</h3>
                                <p style={{paddingLeft: 4, color: "#696868", margin: 2}}>{filterItem.description}</p>
                            </div>
                            <div  style={{flex: 1}}>
                                <Box sx={{ minWidth: 200 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Operators</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={filterItem.operator.filter(operator => operator.selected === true)[0].value}
                                            label="Operators"
                                            onChange={(e: any)=> {
                                                let obj = selectedFilters.filter(
                                                    filterItem3 => filterItem3.tableName === tableName
                                                    && filterItem3.name === filterItem.name)[0].operator.map(
                                                    (operator, idx2) => {
                                                        if (operator.value === e.target.value) {
                                                            operator.selected = true
                                                        }else {
                                                            operator.selected = false
                                                        }
                                                    })
                                                setSelectedFilters([...selectedFilters, obj])
                                            }}>
                                            {filterItem.operator.map(
                                                (operator, idx) => (
                                                    <MenuItem key={idx} value={operator.value}>{operator.label}</MenuItem>
                                            ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div style={{flex: 4}}>
                                {filterItem.operator.filter(operator => operator.selected === true)[0].value === "between" && filterItem.hasOwnProperty("value2") ?
                                    <>
                                        <TextField id="standard-basic" label={filterItem.type === 'date' ? '' : "Value"}
                                                   variant="outlined" type={filterItem.type}
                                                   style={{paddingLeft: 4, margin: 2, minWidth: 400 }}
                                                   value={filterItem.value}
                                                   onChange={(e: any)=> {
                                                       let obj = selectedFilters.filter(
                                                           filterItem3 => filterItem3.tableName === tableName
                                                               && filterItem3.name === filterItem.name)[0].value = e.target.value
                                                         setSelectedFilters([...selectedFilters, obj])
                                                   }}/>
                                        <TextField id="standard-basic" label={filterItem.type === 'date' ? '' : "Value"}
                                                   variant="outlined" type={filterItem.type}
                                                   style={{paddingLeft: 4, margin: 2, minWidth: 400 }}
                                                   value={filterItem.value2}
                                                   onChange={(e: any)=> {
                                                       let obj = selectedFilters.filter(
                                                           filterItem3 => filterItem3.tableName === tableName
                                                               && filterItem3.name === filterItem.name)[0].value2 = e.target.value
                                                       setSelectedFilters([...selectedFilters, obj])
                                                   }}/>
                                    </> :
                                    <TextField id="standard-basic" label={filterItem.type === 'date' ? '' : "Value"}
                                               variant="outlined" type={filterItem.type}
                                               style={{paddingLeft: 4, margin: 2, minWidth: 400 }}
                                               value={filterItem.value}
                                               onChange={(e: any)=> {
                                                   let obj = selectedFilters.filter(
                                                       filterItem3 => filterItem3.tableName === tableName
                                                           && filterItem3.name === filterItem.name)[0].value = e.target.value
                                                   setSelectedFilters([...selectedFilters, obj])
                                               }}/>
                                }
                            </div>
                        </div>
                        <div>
                            <Button variant="outlined" onClick={() => {
                                setSelectedFilters(selectedFilters.filter((item, index) => index !== idx))
                            }}
                                    style={{height: "40px", color: "#ff2222", margin: 10}}><Remove fontSize="large"  /></Button>
                        </div>
                    </div>
                ))
            }

            <Divider/>

            <div style={{height: 700, width: '100%'}}>
                <h2 style={{paddingLeft: 4, color: "#0279a9"}}>{tableName.split(/(?=[A-Z])/).join(' ')}</h2>
                {columns?.length === 0 || datas?.length === 0 ?
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '40px'
                    }}>
                        <CircularProgress/>
                    </div>
                    :
                    <div style={{height: 640, width: '100%'}}>

                        <DataGrid
                            rows={datas || []}
                            columns={columns || []}
                            pageSizeOptions={[5, 10, 15, 25, 50]}
                            initialState={{
                                pagination: {
                                    paginationModel: {page: page - 1, pageSize: rowsPerPage},
                                },
                            }}
                            onPaginationModelChange={(model, details) => {
                                setPage(model.page + 1)
                                setRowsPerPage(model.pageSize)
                            }
                            }
                            rowCount={count}
                            page={page}
                            sx={{
                                '& .MuiDataGrid-cell:focus-within': {
                                    outline: 'none',
                                },
                                '& .MuiDataGrid-columnHeader:focus-within': {
                                    outline: 'none',
                                },
                                '& .MuiDataGrid-columnHeader:focus': {
                                    outline: 'none',
                                },
                                '& .MuiDataGrid-columnHeader:focus-visible': {
                                    outline: 'none',
                                },
                                '& .MuiDataGrid-cell:focus': {
                                    outline: 'none',
                                },
                                width: '95vw',
                                overflowX: 'scroll',
                                scrollbar: {
                                    width: '5px', '&::-webkit-scrollbar': {
                                        width: '6px',
                                    }
                                },

                                scrollbarWidth: 'thin'

                            }}
                            autoHeight
                            rowsPerPage={rowsPerPage}
                            loading={datas?.length === 0 && columns?.length === 0}
                            scrollbarSize={0}
                            labelDisplayedRows={labelDisplayedRows}
                        />
                    </div>

                }
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    overflow: 'scroll'
                }}
            >
                <Box sx={{
                    backgroundColor: "#FFF", borderRadius: 10,
                    alignSelf: 'center', alignItems: 'center',
                    width: "800px", minHeight: "200px", padding: 5, margin: '50px auto'
                }}>
                    <Button onClick={handleClose} style={{position: 'relative', float: "right", left: 35, bottom: 20}}>
                        <Close/>
                    </Button>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{paddingTop: 30}}>
                        Available Filters
                    </Typography>
                    <List style={{display: 'flex', flexDirection: 'column', padding: 0, margin: 5}}>
                        {savedConfigurations.filter((tableDataConfig) => tableDataConfig.tableName === tableName)[0].filtrableColumns.map(
                            (column, idx) => (
                                <ListItem key={idx}>
                                    <Button onClick={() => {
                                        // let index = selectedFilters.indexOf(column);
                                        let index = selectedFilters.findIndex((obj) => {
                                            return obj.tableName === column.tableName && obj.name === column.name;
                                        });

                                        if (index !== -1) {
                                            setSelectedFilters(selectedFilters.filter((item, idx) => idx !== index))
                                            // setSelectedFilters(selectedFilters.filter((item) => item !== column));
                                        }else {
                                            setSelectedFilters([...selectedFilters, column])
                                        }
                                    }}
                                            variant="outlined"
                                            style={{
                                                backgroundColor: selectedFilters.includes(column) ? "rgba(2,121,169,0.8)" : "#fff",
                                                color: selectedFilters.includes(column) ? "#fff" : "rgba(2,121,169,0.8)",
                                            }}
                                    >
                                        {column.label}
                                    </Button>
                                </ListItem>
                            ))}
                    </List>
                    <Button variant="outlined"
                            onClick={handleClose}
                            style={{height: "40px", margin: 10, float: "right", }}>
                        OK
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
