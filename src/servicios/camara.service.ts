import { Injectable } from '@angular/core';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { decode } from "base64-arraybuffer";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CamaraService {

  constructor() { }

  public async sacarFoto(): Promise<Photo> {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      // saveToGallery: false,
      resultType: CameraResultType.Base64,
      promptLabelHeader: 'Foto',
      promptLabelCancel: 'Cancelar',
      promptLabelPhoto: 'Subir Foto',
      promptLabelPicture: 'Sacar Foto',
    });
    return image;
  };
  convertPhotoToBlob(photo: Photo): Blob {
    const blob = new Blob([new Uint8Array(decode(photo.base64String!))], {
      type: `image/${photo.format}`,
    });
    return blob;
  }

  convertPhotoToFile(photo: Photo, filename: string): File {
    const blob = this.convertPhotoToBlob(photo);
    const file = new File([blob], filename, {
      lastModified: moment().unix(),
      type: blob.type,
    });
    return file;
  }
}
