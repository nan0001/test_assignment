import { Directive, ElementRef, Host, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightWords]'
})
export class HighlightWordsDirective implements OnInit {
  private highlitedWords: string[] = [];

  @Input() text: string = '';
  @Input() set appHighlightWords(query: string | null) {
    if (!query) {
      return;
    }
    this.highlitedWords = query.split(' ');
  }

  constructor(@Host() private elemRef: ElementRef, private renderer2: Renderer2) { }

  ngOnInit(): void {
    this.renderer2.appendChild(this.elemRef.nativeElement, this.getContentElement());
  }

  private getContentElement(): HTMLElement {
    const regexp = new RegExp(this.highlitedWords.join('|'),'gi');
    const content = this.text.replace(regexp, match => `<mark>${match}</mark>`);
    const contentElem: HTMLElement = this.renderer2.createElement('span');
    this.renderer2.setProperty(contentElem, 'innerHTML', content);

    return contentElem;
  }

}
