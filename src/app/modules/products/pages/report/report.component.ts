import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
  ActualTargetData,
  ActualTargetResponse,
} from 'src/app/models/actual-target';
import { GrowthData, GrowthResponse } from 'src/app/models/growth';
import { ProductService } from 'src/app/services/product.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  year: string[] = [];
  year2: string[] = [];
  totalPc: number[] = [];
  actual: number[] = [];
  target: number[] = [];
  totalActual!: string;
  totalGrowth!: string;
  noneActual: boolean = false;
  noneGrowth: boolean = false;

  constructor(
    private _productService: ProductService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._productService.getActualTarget().subscribe({
      next: (result: ActualTargetResponse) => {
        if(result.data) {
          this.target = result.data.target;
          this.actual = result.data.actual;
          this.year2 = result.data.year;
          this.totalActual = result.data.total;
          this.chartActual();
          this._changeDetectorRef.markForCheck();
        }else{
          this.noneActual = true
        }
      },
      error: (e) => console.log(e),
    });

    this._productService.getGrowth().subscribe({
      next: (result: GrowthResponse) => {
        if(result.data) {
          this.totalPc = result.data.totalPc;
          this.year = result.data.year;
          this.totalGrowth = result.data.total;
          this.chartGrowth();
          this._changeDetectorRef.markForCheck();
        }else{
          this.noneGrowth = true
        }

      },
      error: (e) => console.log(e),
    });
  }

  chartActual() {
    new Chart('chart-line', {
      type: 'bar',
      data: {
        labels: this.year2,
        datasets: [
          {
            label: 'Target',
            data: this.target,
            borderColor:  'rgb(201, 203, 207)',
            backgroundColor:'rgb(201, 203, 207)',
            borderWidth: 1,
          },
          {
            label: 'Actual',
            data: this.actual,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            grid: {
              display: false,
            },
          },
        },
        responsive: true,
        interaction: {
          intersect: false,
        },
      },
    });
  }

  chartGrowth() {
    new Chart('growth', {
      type: 'line',
      data: {
        labels: this.year,
        datasets: [
          {
            label: 'Growth',
            data: this.totalPc,
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }
}
