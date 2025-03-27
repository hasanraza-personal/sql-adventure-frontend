/* eslint-disable react/prop-types */
export default function PDFViewer({ pdfUrl }) {
  // Construct the share URLs for LinkedIn and WhatsApp.
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    pdfUrl
  )}`;
  const whatsAppShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    "I just earned my SQL Certificate! Excited to share my achievement—check out my certificate: " +
      pdfUrl
  )}`;

  return (
    <div>
      <div style={{ width: "100%", height: "600px" }}>
        <iframe
          src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&zoom=page-fit`}
          width="100%"
          height="100%"
          title="PDF Viewer"
        />
      </div>

      {/* Share Buttons */}
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <a
          href={linkedInShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginRight: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#0077B5",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          Share on LinkedIn
        </a>
        <a
          href={whatsAppShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#25D366",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          Share on WhatsApp
        </a>
      </div>
    </div>
  );
}
