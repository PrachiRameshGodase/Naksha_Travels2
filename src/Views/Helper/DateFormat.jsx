import jsPDF from 'jspdf';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import PdfTemplate from './ComponentHelper/PrintAndPDFComponent/PrintContent';
import ReactDOMServer from 'react-dom/server';
import html2canvas from 'html2canvas';




//show date in yy-mm-dd
export const formatDate = (date) => {
    if (!date) return ''; // Return empty string if date is undefined or null
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String((d.getMonth() + 1)).padStart(2, '0'); // Months are zero-based
    const year = d.getFullYear();

    return `${year}-${month}-${day}`;
};




//show date in (month name/,dd/yy) format
export const formatDate2 = (date) => {
    const d = new Date(date);
    const dMY = d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    return dMY?.split(" ").join('-')
}


//show date in ( dd/month name/yy) format
export const formatDate3 = (date) => {
    return new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}


//generate today date
export const todayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 because January is 0
    const day = String(today.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
}


// current time
export const currentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12; // Converts 0 to 12 for midnight
    hours = String(hours).padStart(2, '0'); // Ensure two-digit format
    return `${hours}:${minutes} ${period}`;
};



//show date in dd-mm-yy
export const formatDate4 = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
};

export const generatePDF = async (data) => {
    try {
        const fetchData = async () => {
            return data?.map((item, index) => [
                (index + 1).toString(),
                item.item_id,
                item.quantity,
                item.gross_amount,
                item.final_amount,
            ]);
        };
        const apiData = await fetchData();
        const tableData = [
            ['S.NO', 'Item & Description', 'Qty', 'Rate', 'Amount'],
            ...apiData,
        ];
        // Calculate the total amount
        const totalAmount = apiData.reduce((sum, row) => sum + parseFloat(row[4]), 0).toFixed(2);
        tableData.push(['', '', '', 'Total', totalAmount]);

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const tableTop = 350;
        const marginLeft = 50;
        const rowHeight = 20;
        const columnWidths = [40, 200, 50, 50, 100];
        const headerBgColor = rgb(0, 0, 0);
        const headerTextColor = rgb(1, 1, 1);
        const borderColor = rgb(0, 0, 0);

        // Draw header row background
        const headerY = tableTop - rowHeight;
        page.drawRectangle({
            x: marginLeft,
            y: headerY,
            width: columnWidths.reduce((a, b) => a + b, 0),
            height: rowHeight,
            color: headerBgColor,
        });

        // Draw table
        tableData.forEach((row, rowIndex) => {
            const y = tableTop - rowHeight * (rowIndex + 1);
            row.forEach((cell, cellIndex) => {
                const x = marginLeft + columnWidths.slice(0, cellIndex).reduce((a, b) => a + b, 0);
                const cellWidth = columnWidths[cellIndex];
                const cellHeight = rowHeight;

                // Calculate the position to center the text horizontally and vertically
                const textWidth = font.widthOfTextAtSize(cell, 12);
                const textX = x + (cellWidth - textWidth) / 2;
                const textY = y + (cellHeight - 12) / 2 + 6; // Adjusting for better vertical alignment

                page.drawText(cell, {
                    x: textX,
                    y: textY,
                    size: 12,
                    font,
                    color: rowIndex === 0 ? headerTextColor : rgb(0, 0, 0), // White text for header, black for others
                });
            });

            // Draw bottom border for each row
            page.drawLine({
                start: { x: marginLeft, y: y },
                end: { x: marginLeft + columnWidths.reduce((a, b) => a + b, 0), y: y },
                thickness: 1,
                color: borderColor,
            });
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        window.open(url);
    } catch (error) {
        console.error('Error generating PDF:', error);
    } finally {
        // setLoading(false);
    }
};


export const generatePDF1 = async (data) => {
    try {
        const fetchData = async () => {
            return data?.map((item, index) => [
                (index + 1).toString(),
                item.item_id.toString(), // Convert item_id to string
                item.quantity.toString(), // Convert quantity to string
                item.gross_amount.toString(), // Convert gross_amount to string
                item.final_amount.toString(), // Convert final_amount to string
            ]);
        };
        const apiData = await fetchData();
        const tableData = [
            ['S.NO', 'Item & Description', 'Qty', 'Rate', 'Amount'],
            ...apiData,
        ];
        // Calculate the total amount
        const totalAmount = apiData.reduce((sum, row) => sum + parseFloat(row[4]), 0).toFixed(2);
        tableData.push(['', '', '', 'Total', totalAmount.toString()]); // Convert total to string

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const tableTop = 350;
        const marginLeft = 50;
        const rowHeight = 20;
        const columnWidths = [40, 200, 50, 50, 100];
        const headerBgColor = rgb(0, 0, 0);
        const headerTextColor = rgb(1, 1, 1);
        const borderColor = rgb(0, 0, 0);

        // Draw header row background
        const headerY = tableTop - rowHeight;
        page.drawRectangle({
            x: marginLeft,
            y: headerY,
            width: columnWidths.reduce((a, b) => a + b, 0),
            height: rowHeight,
            color: headerBgColor,
        });

        // Draw table
        tableData.forEach((row, rowIndex) => {
            const y = tableTop - rowHeight * (rowIndex + 1);
            row.forEach((cell, cellIndex) => {
                const x = marginLeft + columnWidths.slice(0, cellIndex).reduce((a, b) => a + b, 0);
                const cellWidth = columnWidths[cellIndex];
                const cellHeight = rowHeight;

                // Convert cell to string if not already
                const cellText = cell.toString();

                // Calculate the position to center the text horizontally and vertically
                const textWidth = font.widthOfTextAtSize(cellText, 12);
                const textX = x + (cellWidth - textWidth) / 2;
                const textY = y + (cellHeight - 12) / 2 + 6;

                page.drawText(cellText, {
                    x: textX,
                    y: textY,
                    size: 12,
                    font,
                    color: rowIndex === 0 ? headerTextColor : rgb(0, 0, 0), // White text for header, black for others
                });
            });

            // Draw bottom border for each row
            page.drawLine({
                start: { x: marginLeft, y: y },
                end: { x: marginLeft + columnWidths.reduce((a, b) => a + b, 0), y: y },
                thickness: 1,
                color: borderColor,
            });
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        return url; // Return the Blob URL
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
};

export const generatePDF2 = async (data) => {
    const pdf = new jsPDF('p', 'pt', 'a4');
    const element = document.createElement('div');
    element.innerHTML = ReactDOMServer.renderToString(<PdfTemplate data={data} />);

    await html2canvas(element, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 20, 20, 550, 0);
    });

    pdf.save('invoice.pdf');


};




