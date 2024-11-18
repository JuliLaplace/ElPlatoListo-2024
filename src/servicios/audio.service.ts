import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  public splash!: string;
  public cierreSesion!: string;
  public success!: string;
  public pagina!: string;
  public sonidoActivo: boolean = true;

  constructor() {
    try {
      this.splash = 'splash-audio.mp3';
      this.cierreSesion = 'cerrarSesion.wav';
    } catch (error) {
      console.error(`Error al cargar los audios: ${error}`);
    }
  }

  reporoduccionSplash() {
    this.reproducirAuido(this.splash);
  }

  reporoduccionCerrarSeion() {
    this.reproducirAuido(this.cierreSesion);
  }

  async reproducirAuido(audio: string) {
    try {
      if (!this.sonidoActivo) return;

      const assetCompleto = `assets/audios/${audio}`;

      const audioElement = await this.loadAudio(assetCompleto);

      // Comprueba si el audio ya está reproduciendo
      if (!audioElement.paused) {
        console.log('El audio ya está reproduciendo.');
        return;
      }

      // Intenta reproducir el audio
      audioElement
        .play()
        .then(() => {
          console.log('Audio reproduciendo...');
        })
        .catch((error) => {
          console.error('Error al reproducir el audio:', error);
        });
    } catch (error) {
      console.error(`Error al cargar el audio: ${error}`);
    }
  }

  private async loadAudio(url: string): Promise<HTMLAudioElement> {
    return new Promise((resolve, reject) => {
      const audio = new Audio(url);
      audio.addEventListener('canplaythrough', () => resolve(audio));
      audio.onerror = () => reject(new Error(`Error loading audio: ${url}`));
    });
  }
}
