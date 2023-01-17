import html2pdf from "html2pdf.js";
import { saveAs } from "file-saver";

class DownloadPDF {
  async downloadPage(title, formnumber = "", margin = 0.25) {
    var result = false;
    var pageElement = document.getElementById("pdfEdge");
    let opt = {
      margin: margin,
      enableLinks: true,
      dpi: 300,
      backgroundColor: "#FF0",
      filename: title + ".pdf",
      image: { type: "jpeg", quality: 0.9 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "in", format: "A3", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] }
    };
    return await html2pdf()
      .from(pageElement)
      .set(opt)
      .toPdf()
      .get("pdf")
      .then(function (pdfObject) {
        pdfObject.setProperties({
          title: title
        });

        // This will wokr in ie
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(
            pdfObject.output("blob"),
            title + ".pdf"
          );
        } else {
          //#### 1. BlobURL - working fine in safari but not in chrome/firefox
          if (formnumber === "1") {
            var objectUrl = pdfObject.output("bloburl");
            window.open(objectUrl, "_blank");
          }

          //#### 2. Base64 and Filesave - working fine in chrome but not in safari/firefox
          // takking default file name downlaads but not adding file extnesion.
          if (formnumber === "2") {
            require("downloadjs")(
              pdfObject.output("blob"),
              "testfile.pdf",
              "application/pdf"
            );
  
          }
          //#### 3.Webkit
          if (formnumber === "3") {
            const file = pdfObject.output("blob");
            const fileURL = (window.URL || window["webkitURL"]).createObjectURL(
              file
            );
            const fileName = title + ".pdf";
            const downloadLink = document.createElement("a");
            downloadLink.href = fileURL;
            downloadLink.download = fileName;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
          }

          //#### 4. Default html2pdf save it downloads
          //file in chrome but taking default file name as download but not adding file extension .pdf

          if (formnumber === "4") {
            pdfObject.save(title);
          }

          //#### 5. Datauristring working fine in chrome but not in safari/firefox
          // takking default file name downlaads but not adding file extnesion.
          if (formnumber === "5") {
            const file = pdfObject.output("datauristring");
            saveAs(file, title + ".pdf");
          }

          //#### 6. dataurlstring - working fine in chrome but not in safari/firefox
          // takking default file name downlaads but not adding file extnesion.
          if (formnumber === "6") {
            const file = pdfObject.output("dataurlstring");
            saveAs(file, title + ".pdf");
          }

          //#### 7. Datauri  working fine in chrome but not in safari/firefox
          // its takking default file name downlaads but not adding file extnesion.
          if (formnumber === "7") {
            const file = pdfObject.output("datauri", {
              type: "application/pdf"
            });
            saveAs(file, title + ".pdf");
          }

          //#### 8.  it opening fine in chrome in new tab

          if (formnumber === "8") {
            const file = pdfObject.output("dataurl");
            saveAs(file, title + ".pdf");
          }

          //#### 8.  createObjectURL it opening fine in chrome in new tab

          if (formnumber === "9") {
            var newBlob = pdfObject.output("blob");
            const data = window.URL.createObjectURL(newBlob);
            // window.location.assign(data);
            var link = document.createElement("a");
            link.href = data;
            link.download = title + ".pdf";
            link.click();
            setTimeout(function () {
              // For Firefox it is necessary to delay revoking the ObjectURL
              window.URL.revokeObjectURL(data);
            }, 100);
          }
        }
        result = true;
        return result;
      });
  }
}

export default new DownloadPDF();
