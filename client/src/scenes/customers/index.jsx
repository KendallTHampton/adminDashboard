/* React */
import React from 'react'

/* Material UI & Design */
import {Box, TextField, useTheme} from "@mui/material"
import {DataGrid} from '@mui/x-data-grid'

/* Components */
import Header from 'components/Header'

/* API Calls */
import {useGetCustomersQuery} from 'state/api'
import FlexBetween from 'components/FlexBetween'
import {borderRadius} from '@mui/system'



function Customers() {
    const theme = useTheme()
    const {data, isLoading} = useGetCustomersQuery();

    const columns = [
        {
            field: '_id',
            headerName: "ID",
            flex: 1,
        },
        {
            field: 'name',
            headerName: "Name",
            flex: 0.5,
        },
        {
            field: 'email',
            headerName: "Email",
            flex: 1,
        },
        {
            field: 'phoneNumber',
            headerName: "Phone Number",
            flex: 0.5,
            renderCell: (params) => {
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3")
            }
        },
        {
            field: 'country',
            headerName: "Country",
            flex: 0.4,
        },
        {
            field: 'occupation',
            headerName: "Occupation",
            flex: 1,
        },
        {
            field: 'role',
            headerName: "Role",
            flex: 0.5,
        },


    ];

    return (
        <Box m="1.5rem 2.5rem" height="100%">
            <Header
                title="CUSTOMERS"
                subtitle="See our customers here"
            />

            <Box
                mt="20px"
                height="70vh"

            >


                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={data || []}
                    columns={columns}
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
                    }

                    }

                />

            </Box>
        </Box>
    )
}

export default Customers