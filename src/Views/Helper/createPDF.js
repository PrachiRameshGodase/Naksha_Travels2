// pdfUtils.js
import html2pdf from "html2pdf.js";
import { createRoot } from "react-dom/client";

/**
 * Generates a PDF from the specified React component.
 * @param {ReactNode} contentComponent - The component to render as PDF content.
 * @param {string} filename - The desired filename for the PDF.
 * @param {Function} setLoading - Function to toggle loading state.
 * @param {number} delay - Delay before generating the PDF (in milliseconds).
 */


// export pfd with firebase....

// export const generatePDF = async (contentComponent, filename, setLoading, delay = 500) => {
//     const content = document.createElement("div");
//     content.setAttribute("id", "print-content");
//     setLoading(true);

//     const root = createRoot(content);
//     root.render(contentComponent);

//     setTimeout(async () => {
//         // Generate PDF as blob
//         const pdfBlob = await html2pdf()
//             .set({
//                 margin: 5,
//                 filename,
//                 pagebreak: { mode: ["avoid-all", "css", "legacy"] },
//                 jsPDF: { format: "a4", orientation: "portrait" },
//                 html2canvas: { scale: 4 },
//             })
//             .from(content)
//             .output("blob");

//         // Firebase imageDB reference with custom filename
//         const imageDBRef = ref(imageDB, `pdfs/${filename}`);

//         // Upload PDF blob to Firebase Storage
//         try {
//             await uploadBytes(imageDBRef, pdfBlob);
//             const fileUrl = await getDownloadURL(imageDBRef);

//             // Open the custom URL in a new tab
//             window.open(fileUrl, "_blank");
//         } catch (error) {
//             console.error("Failed to upload PDF to Firebase", error);
//         } finally {
//             setLoading(false);
//             root.unmount();
//             document.body.removeChild(content);
//         }
//     }, delay);
// };


// without firebase without firebase 
export const generatePDF = async (contentComponent, filename, setLoading, delay = 500) => {
    const content = document.createElement("div");
    content.setAttribute("id", "print-content");
    document.body.appendChild(content);
    setLoading(true);

    const root = createRoot(content);
    root.render(contentComponent);

    setTimeout(async () => {
        try {
            // Generate PDF as blob
            const pdfBlob = await html2pdf()
                .set({
                    margin: 5,
                    filename,
                    pagebreak: { mode: ["avoid-all", "css", "legacy"] },
                    jsPDF: { format: "a4", orientation: "portrait" },
                    html2canvas: { scale: 4 },
                })
                .from(content)
                .output("blob");

            // Create a Blob URL and open it in a new tab
            const pdfURL = URL.createObjectURL(pdfBlob);
            window.open(pdfURL, "_blank");
        } catch (error) {
            console.error("Failed to generate or open PDF", error);
        } finally {
            setLoading(false);
            root.unmount();
            document.body.removeChild(content);
        }
    }, delay);
};
