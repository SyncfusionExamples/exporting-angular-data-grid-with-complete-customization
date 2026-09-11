import { Component, OnInit, ViewChild } from '@angular/core';
import {
  GridModule, PageService, PdfExportService, ToolbarService, GridComponent,
  PdfExportProperties, ExcelExportService, ExcelExportProperties
} from '@syncfusion/ej2-angular-grids';
import { data } from './datasource';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GridModule],
  providers: [PageService, PdfExportService, ToolbarService, ExcelExportService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  public pageSettings = { pageSize: 7 };
  public data = data;
  public toolbarOptions?: string[];
  @ViewChild('grid')
  public grid!: GridComponent;
  toolbarClick(args: ClickEventArgs): void {
    if (args.item.id?.includes('pdfexport')) {
      const pdfExportProperties: PdfExportProperties = {
        fileName: 'New.pdf',
        exportType: 'CurrentPage',
        header: {
          fromTop: 0,
          height: 130,
          contents: [
            {
              type: 'Text',
              value: 'Exported Document of Customers',
              position: { x: 200, y: 50 },
              style: { textBrushColor: '#000000', fontSize: 16 }
            }
          ]
        },
        footer: {
          fromBottom: 10,
          height: 60,
          contents: [
            {
              type: 'Line',
              style: {
                penColor: '#000080',
                penSize: 2,
                dashStyle: 'Dot'
              },
              points: { x1: 0, y1: 4, x2: 685, y2: 4 }
            }
          ],
        },
        theme: {
          header: {
            bold: true,
            fontColor: '#000080',
            fontName: 'Calibri',
            fontSize: 10
          },
          record: {
            fontColor: '#B22222',
            fontName: 'Calibri',
            fontSize: 8
          }
        } 
      };
      this.grid.pdfExport(pdfExportProperties);
    }
    else if (args.item.id?.includes('excelexport')) {
      const excelExportProperties: ExcelExportProperties = {
        fileName: 'Customer.xlsx',
        header: {
          headerRows: 1,
          rows: [
            {
              cells: [
                {
                  colSpan: 5,
                  value: 'Customer Report',
                  style: { fontColor: '#C67878', fontSize: 20, hAlign: 'Center', bold: true }
                }
              ]
            }
          ]
        },
        footer: {
          footerRows: 1,
          rows: [
            {
              cells: [
                {
                  colSpan: 5,
                  value: 'Thank you for your business!',
                  style: {
                    hAlign: 'Center',
                    bold: true
                  }
                }
              ]
            }
          ]
        },
        theme: {
          header: {
            bold: true,
            fontColor: '#000080',
            fontName: 'Calibri',
            fontSize: 10
          },
          record: {
            fontColor: '#B22222',
            fontName: 'Calibri',
            fontSize: 8
          }
        }            
      };
      this.grid.excelExport(excelExportProperties);
    }
  }
  ngOnInit(): void {
    this.toolbarOptions = ['PdfExport', 'ExcelExport'];
  }
}
