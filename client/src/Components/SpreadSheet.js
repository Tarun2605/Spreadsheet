import { SheetsDirective, SheetDirective, RangesDirective, RangeDirective, SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';
import * as React from 'react';
import '../App.css';
import { registerLicense } from '@syncfusion/ej2-base';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { IoPersonAddOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF1cWWhAYVFwWmFZfVpgdVVMYVVbRH5PIiBoS35RckVrW3hccnVcRmldUkJy');

export default function SpreadSheet() {
    const spreadsheetRef = React.useRef(null); // Reference to SpreadsheetComponent

    React.useEffect(() => {
        if (spreadsheetRef.current) {
            // spreadsheetRef.current.updateCell({ value: 'hello world' }, 'Sheet1!E6');
        }
    }, []); // Empty dependency array ensures this runs only once after the component mounts

    // State for managing menu visibility
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Box sx={{
                width: '100%',
                height: '10vh',
                backgroundColor: 'red',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '10px',
            }}>
                <h1>SpreadSheet</h1>
                <Button variant="contained" color="primary" sx={{
                    borderRadius: '50%',
                    marginLeft: '20px'
                }}>
                    <IoPersonAddOutline style={{
                        marginLeft: '10px',
                        marginRight: '10px',
                        height: '25px',
                        width: '25px',
                    }} />
                </Button>
                <Button
                    variant="contained"
                    color="transparent"
                    sx={{
                        borderRadius: '50%',
                        marginLeft: 'auto',
                        marginRight: '10px'
                    }}
                    onClick={handleProfileClick}
                >
                    <CgProfile style={{
                        marginLeft: '10px',
                        marginRight: '10px',
                        height: '25px',
                        width: '25px',
                    }} />
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Home</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </Box>
            <Box sx={{ width: '100%', height: '87vh' }}>
                <SpreadsheetComponent
                    ref={spreadsheetRef} // Attach the ref to the SpreadsheetComponent
                    style={{ width: '100%', height: '100%' }}
                >
                    <SheetsDirective>
                        <SheetDirective>
                            <RangesDirective>
                                <RangeDirective dataSource={[]} />
                            </RangesDirective>
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>
            </Box>
        </Box>
    );
}
