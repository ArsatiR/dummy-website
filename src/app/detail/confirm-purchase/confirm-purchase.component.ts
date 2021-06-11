import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DetailService } from '../detail.service';

@Component({
  selector: 'app-confirm-purchase',
  templateUrl: './confirm-purchase.component.html',
  styleUrls: ['./confirm-purchase.component.scss']
})
export class ConfirmPurchaseComponent implements OnInit {

  inputQty = 0;
  totalPrice = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private detailService: DetailService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    console.log(this.data)
  }

  inputChange(event: any) {

    this.inputQty = parseInt(event.target.value);
    this.totalPrice = this.inputQty * this.data.price;
  }

  async buyButton() {
    if (this.data.peripheralLink != "null") {
      const dataSaved = {
        commissionDetails: [{
          price: this.data.price,
          qty: this.inputQty,
          transactionDate: this.data.transactionDate
        }],
        customerId: this.data.customerId,
        peripheralLink: this.data.peripheralLink
      }

      await this.detailService.buyItem(dataSaved).then(response => {
        let result = JSON.parse(response._body)
        if (result.status) {
          this.snackBar.open(result.message, 'Ok', {
            verticalPosition: 'top',
            duration: 5000
          });
          this.dialog.closeAll()
        } else {
          this.snackBar.open(result.message, 'Ok', {
            verticalPosition: 'top',
            duration: 5000
          });
        }
      })
    }else{
      //not recurring

      const dataSaved = {
        commissionDetails: [{
          price: this.data.price,
          qty: this.inputQty,
          transactionDate: this.data.transactionDate
        }],
        customerId: this.data.customerId,
        peripheralLink: this.router.url
      }

      await this.detailService.calculateQty(dataSaved).then(response => {
        let result = JSON.parse(response._body)
        if (result.status) {
          this.snackBar.open(result.message, 'Ok', {
            verticalPosition: 'top',
            duration: 5000
          });
          this.dialog.closeAll()
        } else {
          this.snackBar.open(result.message, 'Ok', {
            verticalPosition: 'top',
            duration: 5000
          });
        }
      })
    }
  }

}
