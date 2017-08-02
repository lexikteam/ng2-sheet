import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare var jQuery: any;

@Injectable()
export class SheetService {
  maxWidth;
  transform;

  closeSubject = new Subject<any>();

  constructor() {}

  updateSheetWidth(hide = true) {
    if (hide) {
      jQuery('.sheet-container:nth-last-of-type(2)').find('.sheet').css('display', 'none');
    }

    this.calculWidth();

    jQuery('.sheet-container:nth-last-of-type(2)').find('.sheet').css('transform', `translate(${jQuery(document).width()}px, 0px)`);
    jQuery('.sheet-container:nth-last-of-type(2)').find('.sheet').css('max-width', this.maxWidth);
  }

  closeSheet() {
    this.calculWidth();

    jQuery('.sheet-container:nth-last-of-type(2)').find('.sheet-overlay').fadeOut(150);

    const self = this;

    jQuery('.sheet-container:nth-last-of-type(2)').find('.sheet').css('transform', `translate(${jQuery(document).width()}px, 0px)`);
    jQuery('.sheet-container:nth-last-of-type(3)').find('.sheet').css('transform', `translate(${self.transform}px, 0px)`);

    setTimeout(() => {
      this.closeSubject.next(true);
    }, 500);
  }

  display() {
    this.calculWidth();

    jQuery('.sheet-container:nth-last-of-type(2)').find('.sheet').css('display', '');

    setTimeout(() => {
        jQuery('.sheet-container:nth-last-of-type(2)').find('.sheet').css('transform', `translate(${this.transform}px, 0px)`);
    }, 100);

    jQuery('.sheet-container:nth-last-of-type(3)').find('.sheet').css('transform', `translate(0px, 0px)`);
  }

  private calculWidth() {
    let width = jQuery(document).width();
    let maxWidth = 0;
    let minWidth = Math.floor((width - 960) / 2);
    let padding = 0;

    if (maxWidth) {
      maxWidth = Math.max(maxWidth, minWidth);
      padding = Math.max(width - maxWidth, 0);
      width = Math.min(maxWidth, width);
    } else if (1160 <= width) {
      padding = Math.floor((width - 960) / 2);
      width -= padding;
    } else if (768 <= width) {
      padding = Math.floor((width - 768) / 2);
      width -= padding;
    }

    this.maxWidth = width;
    this.transform = padding;
  }
}
