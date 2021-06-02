import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listType:any = [];
  itemForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.listType = LIST_TYPE
    this.setForm()
  }

  setForm(){
    this.itemForm = this.formBuilder.group({
      name: new FormControl(['']),
      description: new FormControl(['']),
      quantity: new FormControl(['']),
      price: new FormControl(['']),
      typeId: new FormControl(['']),
      recurring: new FormControl(['']),
      radioType:new FormControl(['']),
      duration: new FormControl(['']),
      picture: new FormControl([''])
    })
  }

}
const LIST_TYPE: any = [
  {id: 1, name: "Persediaan"},
  {id: 2, name: "Non Persediaan"},
  {id: 3, name: "Service"},
];
