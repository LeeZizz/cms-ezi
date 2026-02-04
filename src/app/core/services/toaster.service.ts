import {Injectable} from '@angular/core';
import {NbToastrService} from '@nebular/theme';

@Injectable()
export class ToasterService {

  constructor(private toaster: NbToastrService) {

  }

  pop(type: string = 'success', title: string = 'Copy lưu bộ nhớ đệm', message: string = 'Thành công') {
    if (type === 'success') {
      this.toaster.success(message, title);
    } else if (type === 'error') {
      this.toaster.danger(message, title);
    } else if (type === 'info') {
      this.toaster.info(message, title);
    } else if (type === 'warning') {
      this.toaster.warning(message, title);
    } else if (type === 'primary') {
      this.toaster.primary(message, title);
    } else {
      this.toaster.show(message, title);
    }
  }
}
