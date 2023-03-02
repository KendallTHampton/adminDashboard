import React from 'react'
import {useGetPerformanceQuery} from 'state/api'
import {Box, useTheme} from "@mui/material"
import {useSelector} from "react-redux"
import Header from 'components/Header'
import {DataGrid} from '@mui/x-data-grid'
import CustomColumnMenu from 'components/DataGridCustomColumn'

const Performance = () => {
    const theme = useTheme()
    const userId = useSelector((state) => state.global.userId)
    const {data, isLoading} = useGetPerformanceQuery(userId);

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "userId",
            headerName: "User ID",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "CreatedAt",
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
            <Header
                title="PERFORMANCE"
                subtitle="Track Your Affiliate Sales Performance Here"
            />

            <Box
                mt="20px"
                height="70vh"
            >
                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={(data && data.sales) || []}
                    columns={columns}
                    components={{
                        ColumnMenu: CustomColumnMenu
                    }}
                    sx={{
                        boxShadow: " 0px 0px 5px 5px rgba(0,0,0,0.40)",
                        borderColor: theme.palette.secondary[100],
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: theme.palette.neutral[800]
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
                />

            </Box>
        </Box>
    )
}

export default Performance