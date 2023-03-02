import React from "react";
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profileImage.png";


const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />,
    },
    {
        text: "Client Facing",
        icon: null,
    },
    {
        text: "Products",
        icon: <ShoppingCartOutlined />,
    },
    {
        text: "Customers",
        icon: <Groups2Outlined />,
    },
    {
        text: "Transactions",
        icon: <ReceiptLongOutlined />,
    },
    {
        text: "Geography",
        icon: <PublicOutlined />,
    },
    {
        text: "Sales",
        icon: null,
    },
    {
        text: "Overview",
        icon: <PointOfSaleOutlined />,
    },
    {
        text: "Daily",
        icon: <TodayOutlined />,
    },
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined />,
    },
    {
        text: "Breakdown",
        icon: <PieChartOutlined />,
    },
    {
        text: "Management",
        icon: null,
    },
    {
        text: "Admin",
        icon: <AdminPanelSettingsOutlined />,
    },
    {
        text: "Performance",
        icon: <TrendingUpOutlined />,
    },
];

const Sidebar = ({
    user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
}) => {
    const {pathname} = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSizing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: "250px",

                        },
                    }}
                >
                    <Box width="100%" height="auto">
                        <Box m="1.5rem 1.5rem 1.5rem 3rem">
                            <FlexBetween color="#18B4A4">
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <Typography variant="h4" fontWeight="bold">
                                        ECOMVISION
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({text, icon}) => {
                                if (!icon) {
                                    return (
                                        <Typography key={text} sx={{
                                            m: "2.25rem 0 1rem 3rem",
                                            fontWeight: "600"
                                        }}>
                                            {text}
                                        </Typography>
                                    );
                                }
                                const lcText = text.toLowerCase();

                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton onClick={() => {
                                            navigate(`/${ lcText }`);
                                            setActive(lcText);
                                        }}
                                            sx={{
                                                backgroundColor: active === lcText ? theme.palette.secondary[500] : "transparent",
                                                color: active === lcText ? theme.palette.primary[400] : theme.palette.secondary[200],
                                            }}>                                             <ListItemIcon sx={{ml: "2rem", color: active === lcText ? theme.palette.primary[400] : theme.palette.secondary[400], }}>                                                 {icon}                                             </ListItemIcon>                                             <ListItemText primary={text} sx={{fontSize: '1rem'}} />                                             {active === lcText && (<ChevronRightOutlined sx={{ml: "auto"}} />)}                                         </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>

                    <Box
                        position="relative"
                        sx={{
                            top: "",
                            left: "0"
                        }}

                    >
                        <Divider sx={{
                            marginTop: "2.5rem"
                        }} />
                        <FlexBetween textTransform="none" gap="1rem" m="2rem 2rem 2rem 2.8rem;">
                            <Box
                                component="img"
                                alt="profile"
                                src={profileImage}
                                height="40px"
                                width="40px"
                                borderRadius="50%"
                                sx={{objectFit: "cover"}}
                            />
                            <Box textAlign="left">
                                <Typography
                                    fontWeight="bold"
                                    fontSize="0.75rem"
                                    sx={{color: theme.palette.secondary[300]}}
                                >
                                    Kendall H.
                                </Typography>
                                <Typography
                                    fontSize="0.7rem"
                                    sx={{color: theme.palette.secondary[200]}}
                                >
                                    Engineer
                                </Typography>
                            </Box>
                            <SettingsOutlined
                                sx={{
                                    color: theme.palette.secondary[400],
                                    fontSize: "25px",
                                    cursor: 'pointer'
                                }}
                            />
                        </FlexBetween>
                    </Box>
                </Drawer>
            )
            }
        </Box>
    );
};

export default Sidebar;