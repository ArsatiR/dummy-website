import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listType:any = [];
  itemForm!: FormGroup;
  imageTemp = ""
  isUpload = false;
  isLoadingUpload = false
  listStore:any = []
  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private homeService: HomeService
  ) {
  }

  ngOnInit() {
    this.listType = LIST_TYPE
    this.getStore()
    this.setForm()
  }

  async getStore(){
    this.listStore = await this.homeService.getStore()
  }

  setForm(){
    this.itemForm = this.formBuilder.group({
      name: new FormControl(['']),
      description: new FormControl(['']),
      quantity: new FormControl(['']),
      price: new FormControl(['']),
      type: new FormControl(['']),
      recurring: new FormControl(['']),
      commissionStatus:new FormControl(['']),
      duration: new FormControl(['']),
      commission: new FormControl(['']),
      storeId: new FormControl([]),
      picture: new FormControl([''])
    })
  }
  async changeImage(event:any){
    this.isUpload = true;
    this.isLoadingUpload = true
    const apiUpload = "https://api.cloudinary.com/v1_1/dkyltqame/image/upload"
    let imageUrl = ''
    let formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", 'haxnmpdw');
    let response:any
    await this.httpClient.post(apiUpload, formData, { responseType: 'json' }).subscribe(
      result => {
        response = result;
        this.imageTemp = response.url;
        this.isLoadingUpload = false;
      })
  }

  async save(){
    const formData = this.itemForm.getRawValue()
    const dataSaved = {
      name: formData.name,
      description: formData.description,
      qty: formData.quantity,
      price: formData.price,
      type: formData.type,
      recurring: formData.recurring,
      commissionStatus: parseInt(formData.commissionStatus),
      expiredDate: formData.duration + " 00:00:00",
      commissionPriceOrPercentage: formData.commission,
      storeId: parseInt(formData.storeId),
      photoURL: this.imageTemp.toString()
    }
    await this.homeService.add(dataSaved)

  }

}
const LIST_TYPE: any = [
  { id: 1, name: "Clothing" },
  { id: 2, name: "Food" },
  { id: 3, name: "Beverage" },
];
