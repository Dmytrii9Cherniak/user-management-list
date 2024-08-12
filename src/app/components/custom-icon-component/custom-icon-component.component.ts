import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { all_svg_list } from '../../../assets/svg/all_svg_list';

@Component({
  selector: 'app-svg-icon',
  template: `<div [innerHTML]="svgIcon"></div>`,
})
export class SvgIconComponent implements OnInit {

  @Input() iconName: keyof typeof all_svg_list;
  public svgIcon: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const svgContent = all_svg_list[this.iconName] || '';
    this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(svgContent);
  }
}
