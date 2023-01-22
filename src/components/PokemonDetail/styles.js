import { createStyles } from "@mantine/core";

const useStyles=createStyles((theme) => ({
    Card:{
        width: '24vw',

        [`@media (max-width:${theme.breakpoints.sm}px)`]:{
            display:'none',
        },
        [`@media (max-width:${theme.breakpoints.md}px)`]:{
            display:'none',
        },
    },


    ColumnTextJustify:{
        textAlign: 'justify'
    }
}))

export default useStyles;