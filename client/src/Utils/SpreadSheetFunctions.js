export const cellSave = (spreadsheetRef, args) => {
    if (spreadsheetRef.current) {
        spreadsheetRef.current.updateCell({ value: args.value }, args.address);
    }
};


export const spreadSheetFunctionsThroughPut = (item, spreadsheetRef) => {
    if (item.action === "cellSave") {
        cellSave(spreadsheetRef, item.eventArgs);
    }
};