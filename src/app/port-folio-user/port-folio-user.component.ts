import { Component, OnInit } from '@angular/core';
// import {} from '../../assets/'
@Component({
  selector: 'app-port-folio-user',
  templateUrl: './port-folio-user.component.html',
  styleUrls: ['./port-folio-user.component.scss']
})
export class PortFolioUserComponent implements OnInit {
ngOnInit(): void {
  this.toggleList()
  this.toggleList1()
  this.toggleList2()

  this.toggleList3()
  this.toggleList4()

  this.runChange()
}


email='rav39439@gmail.com'
isDropdownActive = false;
isDropdownActive1 = false;
isDropdownActive2 = false;
isDropdownActive3 = false;
isDropdownActive4 = false;
images = [
  '../../assets/newedu1.PNG',
  '../../assets/newed2.PNG',
  '../../assets/newed3.PNG'
];

images1 = [
  '../../assets/newblog1.PNG',
  '../../assets/newblog2.PNG',
  '../../assets/newblog3.PNG',
  '../../assets/newblog4.PNG'
];

images2 = [
  '../../assets/ecomblog1.PNG',
  '../../assets/ecomblog2.PNG',
  '../../assets/ecomblog3.PNG'
];

images3 = [
  '../../assets/stackClone1.PNG',
  '../../assets/stackClone2.PNG',
  '../../assets/StackClone3.PNG',
  '../../assets/stackClone4.PNG',
  '../../assets/stackClone5.PNG'

];

images4 = [
  '../../assets/Object-detection1.PNG',
  '../../assets/Object-detection2.PNG',
 

];

images5 = [
  '../../assets/javapr1.PNG',
  '../../assets/javapr2.PNG',
  '../../assets/javapr3.PNG',

  '../../assets/javapr4.PNG',
  '../../assets/javapr5.PNG',
  '../../assets/javapr6.PNG',
  '../../assets/javapr7.PNG',
  '../../assets/javapr8.PNG',
  '../../assets/javapr9.PNG',

];
currentImage=this.images[0]
currentImage1=this.images1[0]
currentImage2=this.images2[0]
currentImage3=this.images3[0]
currentImage4=this.images4[0]
currentImage5=this.images5[0]

Index=0
Index1=0
Index2=0
Index3=0
Index4=0
Index5=0

runChange(){
  setInterval(()=>{
this.currentImage=this.images[this.Index]
this.Index=this.Index+1
if(this.Index>2){
  this.Index=0
}

this.currentImage1=this.images1[this.Index1]
this.Index1=this.Index1+1
if(this.Index1>3){
  this.Index1=0
}

this.currentImage2=this.images2[this.Index2]
this.Index2=this.Index2+1
if(this.Index2>2){
  this.Index2=0
}

this.currentImage3=this.images3[this.Index3]
this.Index3=this.Index3+1
if(this.Index3>4){
  this.Index3=0
}

this.currentImage4=this.images4[this.Index4]
this.Index4=this.Index4+1
if(this.Index4>1){
  this.Index4=0
}

this.currentImage5=this.images5[this.Index5]
this.Index5=this.Index5+1
if(this.Index5>1){
  this.Index5=0
}
  },5000)
}
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

toggleright(){
  if(this.Index<this.images.length){
    this.Index=this.Index+1
    this.currentImage=this.images[this.Index]
  }
  else{
    this.Index=0
    this.currentImage=this.images[this.Index]
  }
}

toggleleft(){
  if(this.Index>0){
    this.Index=this.Index-1
    this.currentImage=this.images[this.Index]
  }
  else{
    this.Index=2
    this.currentImage=this.images[this.Index]

  }
}

toggleright1(){
  if(this.Index1<this.images1.length){
    this.Index1=this.Index1+1
    this.currentImage1=this.images1[this.Index1]
  }
  else{
    this.Index1=0
    this.currentImage1=this.images1[this.Index1]

  }
  
}
toggleleft1(){
  if(this.Index1>0){
    this.Index1=this.Index1-1
    this.currentImage1=this.images1[this.Index1]
  }
  else{
    this.Index1=3
    this.currentImage1=this.images1[this.Index1]

  }
}

toggleright2(){
  if(this.Index2<this.images2.length){
    this.Index2=this.Index2+1
    this.currentImage2=this.images2[this.Index2]
  }
  else{
    this.Index2=0
    this.currentImage2=this.images2[this.Index2]

  }
  
}
toggleleft2(){
  if(this.Index2>0){
    this.Index2=this.Index2-1
    this.currentImage2=this.images2[this.Index2]
  }
  else{
    this.Index2=2
    this.currentImage2=this.images2[this.Index2]

  }
}

toggleright3(){
  if(this.Index3<this.images3.length){
    this.Index3=this.Index3+1
    this.currentImage3=this.images3[this.Index3]
  }
  else{
    this.Index3=0
    this.currentImage3=this.images3[this.Index3]

  }
  
}
toggleleft3(){
  if(this.Index3>0){
    this.Index3=this.Index3-1
    this.currentImage3=this.images3[this.Index3]
  }
  else{
    this.Index3=4
    this.currentImage3=this.images3[this.Index3]

  }
}

toggleright4(){
  if(this.Index4<this.images4.length){
    this.Index4=this.Index4+1
    this.currentImage4=this.images4[this.Index4]
  }
  else{
    this.Index4=0
    this.currentImage4=this.images4[this.Index4]

  }
  
}
toggleleft4(){
  if(this.Index4>0){
    this.Index4=this.Index4-1
    this.currentImage4=this.images4[this.Index4]
  }
  else{
    this.Index4=1
    this.currentImage4=this.images4[this.Index4]

  }
}

toggleright5(){
  if(this.Index5<this.images5.length){
    this.Index5=this.Index5+1
    this.currentImage5=this.images5[this.Index5]
  }
  else{
    this.Index5=0
    this.currentImage5=this.images5[this.Index5]

  }
  
}
toggleleft5(){
  if(this.Index5>0){
    this.Index5=this.Index5-1
    this.currentImage5=this.images5[this.Index5]
  }
  else{
    this.Index5=8
    this.currentImage5=this.images5[this.Index5]

  }
}
}
