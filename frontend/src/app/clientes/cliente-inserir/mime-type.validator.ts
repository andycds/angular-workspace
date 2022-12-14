import { AbstractControl } from "@angular/forms";
import { Observable, Observer, of } from "rxjs";

export const mimeTypeValidator = (
  control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  if (typeof (control.value) === 'string') {
    //@ts-ignore
    return of(null);
  }
  const arquivo = control.value as File;
  const leitor = new FileReader();
  const observable = new Observable((
    observer: Observer<{ [key: string]: any }>) => {
    leitor.addEventListener('loadend', () => {
      const bytes = new Uint8Array(leitor.result as ArrayBuffer).subarray(0, 4);
      let valido: boolean = false;
      let header = "";
      for (let i = 0; i < bytes.length; i++) {
        header += bytes[i].toString(16);
      }
      switch (header) {
        case '89504e47':
        case 'ffd8ffe0':
        case 'ffd8ffe1':
        case 'ffd8ffe2':
        case 'ffd8ffe3':
        case 'ffd8ffe8':
        case '52494646':
          valido = true;
          break;
        default:
          valido = false;
      }
      observer.next(valido ? {} : { mimeTypeInvalido: true });
      observer.complete();
    })
    leitor.readAsArrayBuffer(arquivo);
  });
  return observable;
}
