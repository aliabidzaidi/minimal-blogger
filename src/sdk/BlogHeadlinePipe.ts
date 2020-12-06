import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'BlogHeadline',
})
export class BlogHeadlinePipe implements PipeTransform {
  constructor(private _domSanitizer: DomSanitizer) {}

  transform(value: any, args?: any): any {
    return this.stylize(value);
  }

  private stylize(text: string): string {
    let subString: string = '...';
    if (text && text.length > 0) {
      let temp = new DOMParser().parseFromString(text, 'text/html');
      subString = temp.body.textContent || '...';

      console.log('here is parsed text => ', subString);
    }

    return subString;
  }
}
