/* REACT and REDUX*/
import React from 'react'
import {useGetDashboardQuery} from 'state/api'

/*Material UI and Designs */
import {Box, Button, useTheme, useMediaQuery, Typography} from '@mui/material'
import {DataGrid} from '@mui/x-data-grid'
import {DownloadOutlined, Email, PersonAdd, Traffic, PointOfSale} from '@mui/icons-material'


/* COMPONENTS */
import Header from 'components/Header'
import FlexBetween from 'components/FlexBetween'
import OverviewChart from 'components/OverviewChart'
import StatBox from "components/Statbox"
import BreakdownChart from 'components/BreakdownChart'



function Dashboard() {
    const theme = useTheme()
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)")
    const {data, isLoading} = useGetDashboardQuery()

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
            <FlexBetween>
                <Header title="DASHBOARD" subtitle="Welcome To Your Dashboard" />
                <Box>
                    <Button
                        sx={{
                            backgroundColor: theme.palette.secondary[300],
                            color: theme.palette.neutral[500],
                            fontSize: "14px",
                            fontWeight: "400px",
                            padding: "10px 20px"
                        }}
                    >
                        <DownloadOutlined sx={{mr: "10px"}} />
                        Download Reports
                    </Button>
                </Box>
            </FlexBetween>


            <Box
                mt="20px"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="160px"
                gap="20px"
                sx={{
                    "& > div": {gridColumn: isNonMediumScreens ? undefined : "span 12"},
                }}
            >
                {/* ROW 1 */}
                <StatBox
                    title="Total Customers"
                    value={data && data.totalCustomers}
                    increase="+14%"
                    description="Since last month"
                    icon={
                        <Email
                            sx={{color: theme.palette.secondary[300], fontSize: "26px"}}
                        />
                    }
                />
                <StatBox
                    title="Sales Today"
                    value={data && data.todayStats.totalSales}
                    increase="+21%"
                    description="Since last month"
                    icon={
                        <PointOfSale
                            sx={{color: theme.palette.secondary[300], fontSize: "26px"}}
                        />
                    }
                />
                <Box
                    gridColumn="span 8"
                    gridRow="span 2"
                    backgroundColor={theme.palette.neutral[900]}
                    p="1rem"
                    borderRadius="0.55rem"
                >
                    <OverviewChart view="sales" isDashboard={true} />
                </Box>
                <StatBox
                    title="Monthly Sales"
                    value={data && data.thisMonthStats.totalSales}
                    increase="+5%"
                    description="Since last month"
                    icon={
                        <PersonAdd
                            sx={{color: theme.palette.secondary[300], fontSize: "26px"}}
                        />
                    }
                />
                <StatBox
                    title="Yearly Sales"
                    value={data && data.yearlySalesTotal}
                    increase="+43%"
                    description="Since last month"
                    icon={
                        <Traffic
                            sx={{color: theme.palette.secondary[300], fontSize: "26px"}}
                        />
                    }
                />


                {/* ROW 2 */}
                <Box
                    gridColumn="span 7"
                    gridRow="span 3"
                    sx={{
                        '& .MuiDataGrid-root': {
                            border: "none",
                            borderRadius: "5rem"
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
                    />
                </Box>
                <Box
                    gridColumn="span 5"
                    gridRow="span 3"
                    backgroundColor={theme.palette.neutral[900]}
                    p="2rem"
                    borderRadius="0.55rem"
                >
                    <Typography variant="h6" sx={{color: theme.palette.secondary[200]}}>
                        Sales By Category
                    </Typography>
                    <BreakdownChart isDashboard={true} />
                    <Typography p="0 0.6rem" fontSize="0.6rem" sx={{color: theme.palette.secondary[200]}}>
                        Breakdown of real states and information via category for revenue made this year
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Dashboard