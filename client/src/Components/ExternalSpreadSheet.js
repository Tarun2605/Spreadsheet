import React, { useContext, useEffect, useRef } from 'react';
import { registerLicense } from '@syncfusion/ej2-base';
import { SheetsDirective, SheetDirective, RangesDirective, RangeDirective, SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';
import { AppContext } from '../Context/AppContext';
import { useSocket } from '../Utils/SocketWrapper';
import AiChatBot from './aiChatBot';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF1cWWhAYVFwWmFZfVpgdVVMYVVbRH5PIiBoS35RckVrW3hccnVcRmldUkJy');

export default function ExternalSpreadSheet({ roomId, workBookId }) {
    const { spreadsheetRef } = useContext(AppContext);
    const { sendCommand } = useSocket();
    const logAction = (action, details) => {
        console.log(`Action: ${action}`, details);
    };

    const handleActionComplete = (args) => {
        sendCommand(roomId, workBookId, args);
        logAction('Chart Created', args);

    };

    useEffect(() => {
        spreadsheetRef.current.hideRibbonTabs(['Review', 'File']);
    }, []);

    return (
        <>
            <SpreadsheetComponent
                ref={spreadsheetRef}
                style={{ width: '100%', height: '90vh' }}
                //D:Prasun try with images use base64 convertor
                allowImage={false}
                // allowHyperlink={false}
                actionComplete={handleActionComplete}
            >
                <SheetsDirective>
                    <SheetDirective>
                        <RangesDirective>
                            <RangeDirective dataSource={[]} />
                        </RangesDirective>
                    </SheetDirective>
                </SheetsDirective>
            </SpreadsheetComponent>
            <AiChatBot />
        </>
    );
}
