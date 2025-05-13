import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function downloadPDF(container,data){
  if (!data) return;
    try {
      // Convertir le contenu en image
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: 1440
      });

      // Créer le PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Ajouter l'image au PDF
      pdf.addImage(
        imgData, 
        'PNG', 
        10, 
        10, 
        imgWidth, 
        imgHeight
      );

      // Télécharger le PDF
      pdf.save(`${data.title}_recette.pdf`);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF :', error);
      alert('Impossible de générer le PDF. Réessayez.');
    }
  };