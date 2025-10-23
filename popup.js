document.addEventListener('DOMContentLoaded', () => {
  const qrCodeContainer = document.getElementById('qrcode');
  const downloadBtn = document.getElementById('download-btn');

  // Get the current tab's URL
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentUrl = tabs[0]?.url;

    if (currentUrl) {
      // Generate a QR code for the URL
      new QRCode(qrCodeContainer, {
        text: currentUrl,
        width: 150,
        height: 150,
        correctLevel: QRCode.CorrectLevel.H,
      });
    } else {
      qrCodeContainer.innerText = "Unable to fetch URL.";
    }
  });

  // Handle the download button
  downloadBtn.addEventListener('click', () => {
    const canvas = qrCodeContainer.querySelector('canvas');
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'qr_code.png';
      link.click();
    }
  });
});
