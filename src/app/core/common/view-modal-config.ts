import {ModalOptions} from 'ngx-bootstrap/modal';

export class ViewModalConfig {
  static init(): ModalOptions {
    return {
      class: 'modal-lg',
      ignoreBackdropClick: true,
    };
  }

  static setHugeModal() {
    return {
      class: 'modal-huge',
    };
  }

}
