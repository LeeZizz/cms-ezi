/**
 * Created by BaoHoang on 8/22/2017.
 */
import {ChartDataSets, ChartOptions} from 'chart.js';

export class ChartMetadata {
  data: ChartDataSets[];
  labels: any[];
  options: (ChartOptions & { annotation: any });
  colors: any[];
  legend: boolean;
  type: string;
}
