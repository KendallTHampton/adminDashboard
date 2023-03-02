/* React Imports */
import React, {useState} from 'react'
/* Material UI & Design Imports */
import {DataGrid} from '@mui/x-data-grid'
import {Box, useTheme} from '@mui/material'
/* Components */
import Header from 'components/Header'
/*  API Calls */
import {useGetTransactionsQuery} from 'state/api'
import DataGridCustomToolbar from "components/DataGridCustomToolbar"



const Transactions = () => {
    const theme = useTheme();

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");

    const [searchInput, setSearchInput] = useState("");
    const {data, isLoading} = useGetTransactionsQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search,
    });

    const columns = [
        {
            field: '_id',
            headerName: "ID",
            flex: 1,
        },
        {
            field: 'userId',
            headerName: "USER ID",
            flex: 1,
        },
        {
            field: 'createdAt',
            headerName: "Created At",
            flex: 1,
        },
        {
            field: "products",
            headerName: "# of Products",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => params.value.length,
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1,
            renderCell: (params) => `$${ Number(params.value).toFixed(2) }`,
        },
    ];

    return (
        <Box m="1.5rem 2.5rem" height="100%">
            <Header title="TRANSACTIONS" subtitle="Entire List of Transactions" />
            <Box
                height="80vh"
                sx={{
                    '& .MuiDataGrid-root': {
                        border: "none",
                    },

                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: theme.palette.neutral[800],
                        borderTop: "none"
                    },

                    '& .MuiDataGrid-row': {

                        borderBottom: `1px solid ${ theme.palette.primary[500] }`
                    },

                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: theme.palette.secondary[600],
                    },

                    '& .MuiDataGrid-cell': {
                        borderTop: `.5px  solid ${ theme.palette.neutral[200] }`,
                        borderBottom: `.5px  solid ${ theme.palette.neutral[200] }`
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: theme.palette.primary.light
                    },


                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: theme.palette.neutral[800],
                        color: theme.palette.primary[200],
                        borderTop: 'none',

                    },

                    '& .MuiDataGrid-toolBarContainer .MuiButton-text': {
                        color: `${ theme.palette.secondary[200] } !important`,
                    }
                }}
            >
                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={(data && data.transactions) || []}
                    columns={columns}
                    rowCount={(data && data.total) || 0}
                    rowsPerPageOptions={[20, 50, 100]}
                    pagination
                    page={page}
                    pageSize={pageSize}
                    paginationMode="server"
                    sortingMode="server"
                    onPageChange={(newPage) => setPage(newPage)}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                    components={{Toolbar: DataGridCustomToolbar}}
                    componentsProps={{
                        toolbar: {searchInput, setSearchInput, setSearch},
                    }}
                />
            </Box>
        </Box>
    )
}

export default Transactions