import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/material';
import { CSSProperties } from 'styled-components';

/**
 * 로딩 state는 반드시 외부에서 관리하도록 작성
 * @param state 
 * @returns 
 */
export default function Loading({
    loadingState,
} : {
    loadingState: boolean,
}) {
    return (
        loadingState
        ? ( 
            <Box sx={loadingContainer}>
                <CircularProgress
                style={circularProgress}
                />
            </Box>
        )
        : (<div style={{display: "none"}}></div>)
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