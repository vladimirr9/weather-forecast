import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }



  private percentColors = [
    { pct: 0.0, color: { r: 0x16, g: 0x30, b: 0x79 } },
    { pct: 0.25, color: { r: 0x49, g: 0x9e, b: 0xe5 } },
    { pct: 0.5, color: { r: 0xa9, g: 0xda, b: 0xfb } },
    { pct: 0.75, color: { r: 0xf4, g: 0xd6, b: 0x80 } },
    { pct: 1.0, color: { r: 0xf0, g: 0x98, b: 0x61 } }];

  getColorForTemperature(temperature: number, opacity: number) {
    let pct = (temperature + 40) / 80;
    for (var i = 1; i < this.percentColors.length - 1; i++) {
      if (pct < this.percentColors[i].pct) {
        break;
      }
    }
    let lower = this.percentColors[i - 1];
    let upper = this.percentColors[i];
    let range = upper.pct - lower.pct;
    let rangePct = (pct - lower.pct) / range;
    let pctLower = 1 - rangePct;
    let pctUpper = rangePct;
    let color = {
      r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
      g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
      b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgba(' + [color.r, color.g, color.b, opacity].join(',') + ')';
  };
}
