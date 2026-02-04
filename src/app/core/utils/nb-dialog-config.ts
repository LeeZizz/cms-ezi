import {NbDialogConfig} from '@nebular/theme';

export class NbDialogConfigUtils {
  private config: NbDialogConfig; // Example property to demonstrate state

  // Private constructor prevents direct instantiation from outside the class
  private constructor() {
    this.config = {
      autoFocus: false,
      backdropClass: '',
      closeOnBackdropClick: false,
      context: {
        model: null,
        modalSize: 'small',
        modalType: 'primary',
      },
      dialogClass: 'modal-small',
      hasScroll: false,
      viewContainerRef: undefined,
      hasBackdrop: true,
      closeOnEsc: false,
    };
  }

  public static newInstance(): NbDialogConfigUtils {
    return new NbDialogConfigUtils();
  }

  public static fromConfig(fromConfig: NbDialogConfig): NbDialogConfigUtils {
    return this.newInstance().setConfig(fromConfig);
  }

  public getConfig(): NbDialogConfig {
    return this.config;
  }

  public setConfig(newConfig: NbDialogConfig): this {
    this.config = newConfig;
    return this;
  }

  public setSize(newModalSize: ModalSize): this {
    this.config.context.modalSize = newModalSize;
    this.config.dialogClass = `modal-${newModalSize}`;
    return this;
  }

  public largeSize(): this {
    this.config.context.modalSize = ModalSize.LARGE;
    this.config.dialogClass = `modal-${ModalSize.LARGE}`;
    return this;
  }

  public hugeSize(): this {
    this.config.context.modalSize = ModalSize.HUGE;
    this.config.dialogClass = `modal-${ModalSize.HUGE}`;
    return this;
  }

  public setType(newModalType: string): this {
    this.config.context.modalType = newModalType;
    return this;
  }

  setModel(model: any): this {
    this.config.context.model = model;
    return this;
  }

  patch(patchConfig: any): this {
    this.config = {
      ...this.config,
      ...patchConfig,
    };
    return this;
  }

  setContext(context: any): this {
    this.config.context.context = context;
    return this;
  }

}

export enum ModalSize {
  SMALL = 'small',
  LARGE = 'large',
  HUGE = 'huge',
  HUGE_FULL = 'huge-full',
}
