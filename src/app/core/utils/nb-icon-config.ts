import {NbIconConfig} from "@nebular/theme";

export class NbIconConfigUtils {
  public static fromFaIcon(icon: string): NbIconConfig {
    return {
      pack: 'font-awesome',
      icon: icon,
    };
  }
}
