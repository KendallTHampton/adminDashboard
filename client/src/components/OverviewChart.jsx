import React, {useMemo} from 'react'
import {ResponsiveLine} from '@nivo/line'
import {useTheme} from '@mui/material'
import {useGetSalesQuery} from "state/api"



const OverviewChart = ({isDashboard = false, view}) => {
    const theme = useTheme()
    const {data, isLoading} = useGetSalesQuery();

    // This code uses the useMemo Hook to store the computation result of creating two objects totalSalesLine and totalUnitsLine in memory and reuse it between renders if the value of data has not changed
    const [totalSalesLine, totalUnitsLine] = useMemo(() => {

        if (!data) return [];

        const {monthlyData} = data;


        const totalSalesLine = {
            id: "totalSales",
            color: theme.palette.secondary[300],
            data: [],
        }
        const totalUnitsLine = {
            id: "totalUnits",
            color: theme.palette.primary[300],
            data: [],
        }

        // {Month ,totalSales, totalUnits}
        //  Adding each consecutive months sales together 
        Object.values(monthlyData).reduce(
            (acc, {month, totalSales, totalUnits}) => {
                const currentSales = acc.sales + totalSales
                const currentUnits = acc.units + totalUnits

                totalSalesLine.data = [
                    ...totalSalesLine.data,
                    {x: month, y: currentSales}
                ]

                totalUnitsLine.data = [
                    ...totalUnitsLine.data,
                    {x: month, y: currentUnits}
                ]

                return {sales: currentSales, units: currentUnits}

            }, {sales: 0, units: 0}
        )
        return [[totalSalesLine], [totalUnitsLine]]
    }, [data])  //eslint-disable-line react-hooks/exhaustive-deps




    if (!data || isLoading) return "Loading..."

    return (
        <ResponsiveLine
            data={view === "sales" ? totalSalesLine : totalUnitsLine}
            colors={{scheme: 'dark2'}}
            theme={{

                "textColor": theme.palette.neutral[100],
                axis: {
                    domain: {
                        line: {
                            stroke: theme.palette.secondary[200]
                        }
                    },
                    legend: {
                        text: {
                            fill: theme.palette.secondary[200]
                        }
                    },
                    ticks: {
                        line: {
                            stroke: theme.palette.secondary[500],
                            strokeWidth: 1,
                        }
                    },
                    text: {
                        fill: theme.palette.secondary[500]
                    }
                },
                legends: {
                    text: {
                        fill: theme.palette.neutral[50]
                    }
                },
                tooltip:
                {

                    container: {
                        background: theme.palette.primary[600],
                        color: theme.palette.secondary[600]
                    }
                }
            }}

            margin={{top: 20, right: 50, bottom: 50, left: 70}}
            xScale={{type: 'point'}}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: false,
                reverse: false
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            enableArea={isDashboard}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                format: (v) => {
                    if (isDashboard) return v.slice(0, 3);
                    return v;
                },
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? "" : "Month",
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickValues: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? null : `Total ${ view === "sales" ? "Revenue" : "Units" }`,
                legendOffset: -60,
                legendPosition: 'middle'
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={theme.palette.secondary[300]}
            pointBorderWidth={2}
            pointBorderColor={theme.palette.secondary[300]}
            pointLabelYOffset={- 12}
            useMesh={true}
            legends={
                isDashboard ? [
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: isDashboard ? 0 : 30,
                        translateY: -40,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: theme.palette.secondary[700],
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: theme.palette.neutral[400],
                                    itemOpacity: 1,
                                }
                            }
                        ]
                    }
                ] : undefined
            }
        />
    )
}

export default OverviewChart