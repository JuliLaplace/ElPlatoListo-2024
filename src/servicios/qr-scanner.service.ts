import { Injectable } from '@angular/core';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint, CapacitorBarcodeScannerCameraDirection, CapacitorBarcodeScannerScanOrientation } from '@capacitor/barcode-scanner';

@Injectable({
  providedIn: 'root'
})
export class QrScannerService {
  

  constructor() { }

  async scanQRcode(): Promise<string> {
    try {
      const scan = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.QR_CODE,
        cameraDirection: CapacitorBarcodeScannerCameraDirection.BACK,
        scanOrientation: CapacitorBarcodeScannerScanOrientation.PORTRAIT
      })
      return scan.ScanResult;
    } catch (e) {
      throw e;
    }
  }
}
