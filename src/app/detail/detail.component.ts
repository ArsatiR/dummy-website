import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailService } from './detail.service';
import * as moment from "moment";
import { Moment } from "moment";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPurchaseComponent } from './confirm-purchase/confirm-purchase.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  _ISLINKACTIVE:boolean = false;
  _ISLINKREFERRAL = false;
  _ISNOTEXPIRED = true;
  loading = true

  linkUrl:any

  paramList:any = {
    itemId: undefined,
    storeId: undefined,
    referralCode: undefined
  }

  data:any

  customerAccountId = 1

  listAccount = [
    {
      id: 1,
      name: "Arsa"
    },
    {
      id: 2,
      name: "Mohisa"
    },
    {
      id: 3,
      name: "Armando"
    },
    {
      id: 4,
      name: "Rizki"
    },
    {
      id: 5,
      name: "Kunta"
    },
  ]

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private detailService: DetailService,
    public dialog: MatDialog
  ) {


   }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.paramList = {
        itemId: params.get('itemId'),
        storeId: params.get('storeId'),
        referralCode: params.get('referralCode')
      }
      this.loadData();
    })

  }


  async loadData() {
    await this.detailService.getById(this.paramList.itemId).then(data=>{
      if(data){
        this.data = data

      }
    })
    this.checkLink();
  }



  switchAcc(){
    this.loadData()
  }

  async buyButton(){

    const dialogRef = this.dialog.open(ConfirmPurchaseComponent,{
      data:{
        price: this.data.price,
        qty: this.data.qty,
        transactionDate: moment().format("YYYY-MM-DD" + " " + "HH:mm:ss"),
        customerId: this.customerAccountId,
        peripheralLink: this.linkUrl
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }

  async checkLink() {
    this._ISLINKREFERRAL = this.paramList.referralCode !=null ? true : false;
    if(this._ISLINKREFERRAL){
      this.linkUrl = "https://dummy-website-app.herokuapp.com" + this.router.url;
      await this.detailService.clickCounter(this.linkUrl)
      await this.detailService.checkPeripheralLink(this.linkUrl).then(result=>{
        if(result == 1) this._ISLINKACTIVE = true;
        else this._ISLINKACTIVE = false
      });

      if(new Date(this.data.expiredDate)  < new Date())this._ISNOTEXPIRED = false
      else this._ISNOTEXPIRED = true
    }else{
      this.linkUrl = await this.detailService.checkRecurringByCustId(this.customerAccountId, this.paramList.itemId)
      this._ISLINKACTIVE = true;
    }
    this.loading = false
  }

}
