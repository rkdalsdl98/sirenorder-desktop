import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/material';
import { CSSProperties } from 'styled-components';

export default function Loading() {
    return (
        <Box sx={loadingContainer}>
            <CircularProgress
            style={circularProgress}
            />
        </Box>
    )
}

const loadingContainer : SxProps = {
    width: "100%",
    height: "100%",
    display: "inline-flex",
    backgroundColor: "black",
    opacity: 0.5,
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
}

const circularProgress : CSSProperties = {
    alignSelf: "center",
}