import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'Sensor charts - Homework';
  testChartName = 'Test chart widget';
  createWidgetIsVisible = false;
  newDataLineDataType: string;
  newDataChartType = 'line';
  chartWidgets: any = [];
  chart: Chart;
  combinedChartSeries: any = [];

  testChartParams: object = [
    {
      name: 'temperature',
      value: 24
    }
  ];
  selectedDateRange: {startDate: Moment, endDate: Moment};
  selectedDateRangeDays: any;

  createWidget = () => {
    if (this.selectedDateRange.startDate === null || this.selectedDateRange.endDate === null) {
      alert('Select date range first!');
      return;
    }
    this.createWidgetIsVisible = true;
  }

  saveChartWidget = () => {
    if (this.chartWidgets.length === 3 ) {
      alert('You can have a maximum of 4 charts on the screen, including, the combined chart.');
      return;
    }
    if (typeof this.newDataLineDataType === 'undefined') {
      alert('Select chart date type.');
      return;
    }
    const values = this.generateValues(this.newDataLineDataType);
    this.chartWidgets.push(values);

    this.chart.addSeries(
      {
        name: values.title + ' (' + values.unit + ')',
        data: values.data,
        type: undefined
      }
    );

    this.newDataLineDataType = '';
    this.createWidgetIsVisible = false;
    this.selectedDateRangeDays = 0;
  }

  generateValues = (dataType) => {
    const startDate = new Date(this.selectedDateRange.startDate['_d']);
    const endDate = new Date(this.selectedDateRange.endDate['_d']);
    const daysNumber = Math.abs(Math.round((startDate - endDate) / (1000 * 60 * 60 * 24)));

    const dataSource = {
      title: '',
      unit: '',
      type: '',
      data: []
    };

    if (dataType === 'temperature') {
      dataSource.title = 'Temperature';
      dataSource.unit = '°C';
      for (let i = 0; i < daysNumber; i++) {
        dataSource.data.push( Math.round( (Math.random() * (50 - (-30)) + (-30)) * 100) / 100 );
      }
    }

    if (dataType === 'humidity') {
      dataSource.title = 'Humidity';
      dataSource.unit = '%';
      for (let i = 0; i < daysNumber; i++) {
        dataSource.data.push(Math.floor(Math.random() * (100 - 50)) + 50);
      }
    }

    if (dataType === 'light') {
      dataSource.title = 'Light';
      dataSource.unit = 'lux';
      for (let i = 0; i < daysNumber; i++) {
        dataSource.data.push(Math.floor(Math.random() * (100 - 0)) + 0);
      }
    }

    dataSource.type = this.newDataChartType;
    return dataSource;
  }

  parseDate = (str) => {
    const mdy = str.split('/');
    return new Date(mdy[2], mdy[0] - 1, mdy[1]);
  }

  reset = () => {
    window.location.reload(); // This is cheating, I know...
  }

  ngOnInit() {
    const chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Combined chart'
      },
      credits: {
        enabled: false
      },
      series: []
    });
    this.chart = chart;
  }
}
