import {CommonConfig} from "./common-config";

export class HtmlEditorConfig extends CommonConfig {
  height: number;

  constructor(params?: Object) {
    super(params || {
      height: 350,
    });
  }


}

