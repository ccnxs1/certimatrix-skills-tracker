
import { Certificate } from "@/lib/types";
import { toast } from "sonner";

/**
 * Exports certificates to a JSON file for download
 */
export const exportCertificates = (certificates: Certificate[]) => {
  try {
    // Validate data before export
    if (!Array.isArray(certificates) || certificates.length === 0) {
      toast.error("No certificates to export");
      return;
    }

    // Convert certificates to JSON string
    const certificatesJson = JSON.stringify(certificates, null, 2);
    
    // Create a blob with the data
    const blob = new Blob([certificatesJson], { type: "application/json" });
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = url;
    link.download = `certificates-export-${new Date().toISOString().split('T')[0]}.json`;
    
    // Append to the document, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL
    URL.revokeObjectURL(url);
    
    toast.success(`${certificates.length} certificates exported successfully`);
  } catch (error) {
    console.error("Error exporting certificates:", error);
    toast.error("Failed to export certificates");
  }
};

/**
 * Imports certificates from a JSON file
 */
export const importCertificates = (
  onCertificatesImported: (certificates: Certificate[]) => void
) => {
  // Create a file input
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";
  
  // Add event listener for when a file is selected
  input.onchange = (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }
    
    const reader = new FileReader();
    
    // Event handler for when file is read
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedCertificates = JSON.parse(content) as Certificate[];
        
        // Validate that the imported data is an array of certificates
        if (!Array.isArray(importedCertificates)) {
          throw new Error("Invalid format: expected an array of certificates");
        }
        
        if (importedCertificates.length === 0) {
          toast.warning("The imported file contains no certificates");
          return;
        }
        
        // Basic validation of each certificate
        const validCertificates = importedCertificates.filter(cert => {
          return cert.id && cert.name && cert.provider && cert.userId;
        });
        
        if (validCertificates.length < importedCertificates.length) {
          toast.warning(`${importedCertificates.length - validCertificates.length} certificates were invalid and skipped`);
        }
        
        if (validCertificates.length === 0) {
          toast.error("No valid certificates found in the imported file");
          return;
        }
        
        // Pass the imported certificates to the callback
        onCertificatesImported(validCertificates);
        toast.success(`Imported ${validCertificates.length} certificates successfully`);
      } catch (error) {
        console.error("Error parsing imported file:", error);
        toast.error("Failed to import certificates: Invalid file format");
      }
    };
    
    // Handle file read errors
    reader.onerror = () => {
      toast.error("Error reading the file");
    };
    
    reader.readAsText(file);
  };
  
  // Trigger the file dialog
  input.click();
};
