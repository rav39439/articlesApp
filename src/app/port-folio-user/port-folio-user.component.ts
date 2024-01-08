import { Component } from '@angular/core';

@Component({
  selector: 'app-port-folio-user',
  templateUrl: './port-folio-user.component.html',
  styleUrls: ['./port-folio-user.component.scss']
})
export class PortFolioUserComponent {
email='rav39439@gmail.com'
isDropdownActive = false;
isDropdownActive1 = false;
isDropdownActive2 = false;
isDropdownActive3 = false;
isDropdownActive4 = false;

toggleList() {
//  let ds=document.getElementById('hhjjdd') as HTMLElement
//  let ds1=document.getElementById('hhjjdd1') as HTMLElement
 let ds1=document.getElementById('hhjjdd2') as HTMLElement

 if(!this.isDropdownActive){
 // ds.classList.add('createSpace')
  ds1.classList.add('createSpace')
//  ds2.classList.add('createSpace')

}
 else{
  ///ds.classList.remove('createSpace')
  ds1.classList.remove('createSpace')
 // ds2.classList.remove('createSpace')

 }
  this.isDropdownActive = !this.isDropdownActive;


}
toggleList1() {
  let ds1=document.getElementById('hhjjdd1') as HTMLElement

  if(!this.isDropdownActive1){
    // ds.classList.add('createSpace')
     ds1.classList.add('createSpace1')
   //  ds2.classList.add('createSpace')

   }
    else{
     ///ds.classList.remove('createSpace')
     ds1.classList.remove('createSpace1')
    // ds2.classList.remove('createSpace')

    }
  this.isDropdownActive1 = !this.isDropdownActive1;
}

toggleList2() {
    let ds2=document.getElementById('hhjjdd3') as HTMLElement

   if(!this.isDropdownActive2){

    ds2.classList.add('createSpace2')

  }
   else{

    ds2.classList.remove('createSpace2')

   }
  this.isDropdownActive2 = !this.isDropdownActive2;


}

toggleList3() {
  let ds2=document.getElementById('hhjjdd4') as HTMLElement

 if(!this.isDropdownActive3){

  ds2.classList.add('createSpace4')

}
 else{

  ds2.classList.remove('createSpace4')

 }
this.isDropdownActive3 = !this.isDropdownActive3;


}

toggleList4() {
  let ds2=document.getElementById('mmmm') as HTMLElement

 if(!this.isDropdownActive4){

  ds2.classList.add('createSpace3')

}
 else{

  ds2.classList.remove('createSpace3')

 }
this.isDropdownActive4 = !this.isDropdownActive4;


}
}
