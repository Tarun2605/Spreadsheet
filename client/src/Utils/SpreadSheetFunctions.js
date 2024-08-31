export const cellSave = (spreadsheetRef, args) => {
    if (spreadsheetRef.current) {
        spreadsheetRef.current.updateCell({ value: args.value }, args.address);
    }
};

export const format = (spreadsheetRef, args) => {
    if (spreadsheetRef.current) {
        spreadsheetRef.current.format(args.format, args.range);
    }
};

export const spreadSheetFunctionsThroughPut = (item, spreadsheetRef) => {
    if (item.action === "cellSave") {
        cellSave(spreadsheetRef, item.eventArgs);
    }
    if (item.action === "format") {
        format(spreadsheetRef, item.eventArgs);
    }
};