export const tokensDark = {
    gray: {
        0: "#ffffff",
        10: "#f6f6f6",
        50: "#f0f0f0",
        100: "#e0e0e0",
        200: "#c2c2c2",
        300: "#a3a3a3",
        400: "#858585",
        500: "#666666",
        600: "#525252",
        700: "#3d3d3d",
        800: "#292929",
        900: "#141414",
    },

    primary: {
        100: "#d0d7db",
        200: "#a1b0b8",
        300: "#718894",
        400: "#426171",
        500: "#13394d",
        600: "#0f2e3e",
        700: "#0b222e",
        800: "#08171f",
        900: "#040b0f"
    },

    secondary: {
        100: "#d5f9ed",
        200: "#abf4da",
        300: "#82eec8",
        400: "#58e9b5",
        500: "#2ee3a3",
        600: "#25b682",
        700: "#1c8862",
        800: "#008D5C",
        900: "#092d21"
    },

};

//function that reverses the color palette

function reverseTokens(tokensDark) {
    const reversedTokens = {};
    Object.entries(tokensDark).forEach(([key, val]) => {
        const keys = Object.keys(val);
        const values = Object.values(val);
        const length = keys.length;
        const reversedObject = {};

        for (let i = 0; i < length; i++) {
            reversedObject[keys[i]] = values[length - 1 - i];
        }
        reversedTokens[key] = reversedObject;
    });
    return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);


export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === 'dark') ?
                {
                    primary: {
                        ...tokensDark.primary,
                        main: tokensDark.primary[400],
                        light: tokensDark.primary[400],
                    },
                    secondary: {
                        ...tokensDark.secondary,
                        main: tokensDark.secondary[300],
                    },
                    neutral: {
                        ...tokensDark.gray,
                        main: tokensDark.gray[500],
                    },
                    background: {
                        default: tokensDark.primary[500],
                        alt: tokensDark.primary[500],

                    }
                }
                :
                {
                    primary: {
                        ...tokensLight.primary,
                        main: tokensDark.gray[50],
                        light: tokensDark.gray[100],
                    },
                    secondary: {
                        ...tokensLight.secondary,
                        main: tokensDark.secondary[600],
                        light: tokensDark.secondary[700],
                    },
                    neutral: {
                        ...tokensLight.gray,
                        main: tokensDark.gray[500],
                    },
                    background: {
                        default: tokensDark.primary[100],
                        alt: tokensDark.gray[50],
                    },
                }
        },
        typography: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 14,
            },
        },



    }
}