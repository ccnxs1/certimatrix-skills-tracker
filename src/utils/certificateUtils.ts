
import { Certificate } from "@/lib/types";
import { toast } from "sonner";

/**
 * Exports certificates to a JSON file for download
 */
export const exportCertificates = (certificates: Certificate[]) => {
  try {
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
    
    toast.success("Certificates exported successfully");
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
  try {
    // Create a file input
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    
    // Add event listener for when a file is selected
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
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
          
          // Basic validation of each certificate
          importedCertificates.forEach(cert => {
            if (!cert.id || !cert.name || !cert.provider || !cert.userId) {
              throw new Error("Invalid certificate data: missing required fields");
            }
          });
          
          // Pass the imported certificates to the callback
          onCertificatesImported(importedCertificates);
          toast.success(`Imported ${importedCertificates.length} certificates`);
        } catch (error) {
          console.error("Error parsing imported file:", error);
          toast.error("Failed to import certificates: Invalid file format");
        }
      };
      
      reader.readAsText(file);
    };
    
    // Trigger the file dialog
    input.click();
  } catch (error) {
    console.error("Error importing certificates:", error);
    toast.error("Failed to import certificates");
  }
};
