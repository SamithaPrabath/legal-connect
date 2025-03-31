import { PaymentResponse, PaymentStatus } from "@type/Payment";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const generateInvoicePDF = (payment: PaymentResponse) => {
  // Create invoice element
  const invoiceElement = document.createElement("div");
  invoiceElement.setAttribute("id", "invoice");
  invoiceElement.style.width = "800px";
  invoiceElement.style.padding = "20px";
  invoiceElement.style.background = "white";
  invoiceElement.style.fontFamily = "Arial, sans-serif";
  invoiceElement.style.border = "1px solid #ccc";
  invoiceElement.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  invoiceElement.style.borderRadius = "8px";
  invoiceElement.innerHTML = `
    <h1 style="text-align: center; color: #333; margin-bottom: 10px;">INVOICE</h1>
    <hr style="border: 1px solid #ddd;">
    <div style="display: flex; justify-content: space-between;">
      <div>
        <p><strong>Invoice ID:</strong> ${payment.invoiceId}</p>
        <p><strong>Payment for:</strong> ${payment.name}</p>
      </div>
      <div style="text-align: right;">
        <p><strong>Amount:</strong> $${payment.amount.toFixed(2)}</p>
        <p><strong>Due Date:</strong> ${payment.dueDate}</p>
        <p><strong>Status:</strong> <span style="color: ${payment.status === PaymentStatus.PAID ? 'green' : 'red'}; font-weight: bold;">${payment.status}</span></p>
      </div>
    </div>
    
    <h3 style="border-bottom: 2px solid #ddd; padding-bottom: 5px; margin-top: 20px;">Client Details</h3>
    <p><strong>Name:</strong> ${payment.client.basicInfo.firstName} ${payment.client.basicInfo.lastName}</p>
    <p><strong>Email:</strong> ${payment.client.contactInfo.email}</p>
    <p><strong>Phone:</strong> ${payment.client.contactInfo.phone}</p>
    
    <h3 style="border-bottom: 2px solid #ddd; padding-bottom: 5px; margin-top: 20px;">Lawyer Details</h3>
    <p><strong>Name:</strong> ${payment.lawyer.basicInfo.firstName} ${payment.lawyer.basicInfo.lastName}</p>
    <p><strong>Email:</strong> ${payment.lawyer.contactInfo.email}</p>
    <p><strong>Phone:</strong> ${payment.lawyer.contactInfo.phone}</p>
  `;
  
  document.body.appendChild(invoiceElement);

  html2canvas(invoiceElement, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("invoice.pdf");

    document.body.removeChild(invoiceElement); // Cleanup after generating PDF
  });
};

export default generateInvoicePDF;