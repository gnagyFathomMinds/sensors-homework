import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';


@Component({
  selector: 'chart-widget',
  templateUrl: './chart-widget.component.html',
})
export class ChartWidgetComponent implements OnInit {
  @Input() params: any;
  chart: Chart;
  constructor(private elementRef: ElementRef) {

  }

  ngOnInit() {
    console.group('**** Chart Widget ngOnInit ****');
    console.log('Custom params: ', this.params);
    const chart = new Chart({
      chart: {
        type: this.params.type
      },
      title: {
        text: this.params.title
      },
      credits: {
        enabled: false
      },
      series: [{
        name: this.params.title + ' (' + this.params.unit + ')',
        data: this.params.data
      }]
    });
    this.chart = chart;
    console.log(this.chart);
    console.groupEnd();
  }
}
