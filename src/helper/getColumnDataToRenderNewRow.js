export const getColumnDataToRenderNewRow = (columns) => {
    const newRow = {};
    columns.forEach(column => {
        switch (column.field) {
            case 'action':
            case 'id':
                break;
            default:
                newRow[column.field] = ''
        }
    })
    return newRow
}