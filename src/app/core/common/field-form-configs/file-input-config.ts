import {AcceptEnum} from "../../../common";
import {CommonConfig} from "./common-config";

export class FileInputConfig extends CommonConfig {
  accept: string;
  multiple: boolean;
  onFileChange: any;

  constructor(params?: Object) {
    super(params || {
      accept: "*/*",
      multiple: false,
      onFileChange: null,
    });
  }

  static defaultFromContext(context?: any): FileInputConfig {
    if (context != null) {
      return new FileInputConfig().setFileChangeEvent(context.onFileUploadChange);
    } else {
      return new FileInputConfig();
    }
  }

  static defaultImageFromContext(context?: any): FileInputConfig {
    if (context != null) {
      return new FileInputConfig().acceptImage().setFileChangeEvent(context.onImageUploadChange);
    } else {
      return new FileInputConfig().acceptImage();
    }
  }

  acceptImage() {
    this.accept = AcceptEnum.IMAGE;
    return this;
  }

  acceptExcel() {
    this.accept = AcceptEnum.EXCEL;
    return this;
  }

  setAccept(value: string): FileInputConfig {
    this.accept = value;
    return this;
  }

  setMultiple(value: boolean): FileInputConfig {
    this.multiple = value;
    return this;
  }

  setFileChangeEvent(value: any): FileInputConfig {
    this.onFileChange = value;
    return this;
  }
}
