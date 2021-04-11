import { Component } from '@angular/core';
import * as data from './../assets/pos.products.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pos-assignment';
  products: any = (data as any).default;
  date=new Date();
  cart:any = [];
  subtotal:number = 0
  total_quantity:number = 0
  vat:number = 0
  discount:number = 0
  grand_total:number = 0
  modal:boolean = false
  constructor(){}
  ngOnInit(){
    console.log(this.products)
  }

  addtocart(i:number){
    let carts = {
      title:'',
      price:0,
      quantity:1,
      total:0
    }
    carts.title = (this.products[i].name)
    carts.price = (this.products[i].price)
    carts.total = (this.products[i].price)
    this.cart.push(carts)
    this.get_sum()
  }

  remove(i:number){
    this.cart.pop()
    this.get_sum()
  }
  update_quantity(x,i){
    this.cart[i].quantity = x.target.value
    this.cart[i].total = parseInt(this.cart[i].price) * parseInt(x.target.value)
    this.get_sum()
  }
  get_sum(){
    this.subtotal = 0
    this.total_quantity = 0
    for(let i=0;i<this.cart.length;i++){
      this.subtotal+= parseInt(this.cart[i].total)
      this.total_quantity+= parseInt(this.cart[i].quantity)
    }
  }
  
  open(){
    this.modal = !this.modal
  }
  clear(){
    this.cart = []
    this.vat = 0
    this.discount = 0
    this.grand_total = 0
  }

  
  value_update(event: any,type:number) {
    if(type==1){
      this.vat = (this.subtotal*event.target.value/100);
    }
    else{
      this.discount = (this.subtotal*event.target.value/100);
    }
    this.grand_total = this.subtotal+this.vat-this.discount
    }
}
