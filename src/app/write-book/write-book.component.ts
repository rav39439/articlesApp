import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';






@Component({
  selector: 'app-write-book',
  templateUrl: './write-book.component.html',
  styleUrls: ['./write-book.component.scss']
})
export class WriteBookComponent implements OnInit {

//  globalLength:any
//  updatedData:any
//  keys:any
//  goBackData:any
//  updateOnRefresh:any
//  allArticlesData:any
//  lastSavedTopic:any
//  currentIndex = 1

//   lastSavedGrade:any

  ngOnInit(): void {
    //this.gi()
  //  this.getAlldata()
  }

//    gi() {
//   let k=  document.getElementById('goBack') as HTMLElement
//     let goback =k.innerText
//     let timeago
//     let html = ``
//     let topicDetailsWords = ''
//     this.goBackData = JSON.parse((k.innerText).trim())
//     let updated = []

//     if (document.getElementById('gr') != null) {
//      let h= document.getElementById('gr') as HTMLElement
//         let gr = JSON.parse((h.innerText).trim())
//         let g= document.getElementById('grade') as HTMLSelectElement
//         g.value = gr

//     }
//     if (document.getElementById('tp') != null) {
//       let ht=document.getElementById('tp') as HTMLElement
//         let tp = JSON.parse((ht.innerText).trim())
//         let gt= document.getElementById('topicnames') as HTMLSelectElement

//         gt.value = tp

//     }

//     if (document.getElementById('goBack') != null) {
//       let htw=document.getElementById('goBack') as HTMLElement

//         let t = JSON.parse((htw.innerText).trim())
//         console.log(t)
//         let gtr= document.getElementById('Subject') as HTMLSelectElement

//         gtr.value = t

//     }
//     let htwr=document.getElementById('ndata') as HTMLElement

//     let updatedOptions = JSON.parse(htwr.innerText)
//     if (this.goBackData.trim() != 'All') {
//       let hu=document.getElementById('topicnames') as HTMLSelectElement
//         this.updateTopics(updatedOptions, hu.value)
//     } else {
//         console.log('all')
//     }

//     let kj=document.getElementById('ndata') as HTMLElement
//     let a = JSON.parse(kj.innerText)
//     this.updatedData = a
//     let b = this.checkData(a)
//     this.globalLength = a.length

//     a.forEach((article, index) => {
//         let rootdata = article
//         if (typeof (article.Topicdetails) != "undefined") {
//             topicDetailsWords = article.Topicdetails.split(' ').slice(0, 20).join(' ');

//         }
//         else {
//             topicDetailsWords = ''
//         }
//         if (article.time) {
//             timeago = this.getTimeDifference(article.time)

//         }
//         else {
//             timeago = ''
//         }

//         html += `

// <a href="#" style="text-decoration:none;color:black" id=${index} >

// <div class="card" style="width:100% ; background-color:rgb(226, 226, 241);border-radius:12px;position:relative;height:300px">
//   <div class="card-body" style="background-color: rgb(245, 245, 250); margin:20px;border-radius:15px">
//       <div style="display:flex;gap:0.75rem">
//   <div style="flex-shrink:0;width:50px;height:50px;border-radius:50%;overflow:hidden">
//       <img src="https://media.istockphoto.com/id/915681526/photo/bandra-worli-sea-link-mumbai.webp?b=1&s=612x612&w=0&k=20&c=rLQ4xR3AMjH-LhMuoT_DOCxiT9BlMoCmnZ4CCRAQByk=" alt="Your Image">
//       </div>
// <div style="display:flex;flex-direction:column;margin-left:10px">
//   <p style="font-size:1rem;font-weight:500 ;margin-bottom:0px;padding-bottom:0px">Ravish Kumar</p>
//   <p style="font-size:0.875rem;color:#6b7280;text-align:left">${timeago}</p>
//   </div>
//   </div>
//   <div style="padding-top:5px">
//     <h5 class="card-title" style="text-align:left;margin-bottom:5px">${article.topicName}</h5>
//     <div class="card-text" style="text-align:left;margin-bottom:18px">${topicDetailsWords}</div>
// </div>
//   </div>
// </div>
// </a>
// `
//     })
//    (document.getElementById('articles') as HTMLElement).innerHTML = html
//     attachEventListeners()
// }

// updateTopics(alltopics, topic) {
//   const selectElement1 = document.getElementById("topicnames") as HTMLElement;

//   selectElement1.innerHTML = "";
//   const optiond1 = document.createElement("option");
//   optiond1.value = 'default'
//   optiond1.textContent = '-----select your topic-----';
//   // optiond1.selected = true
//   selectElement1.appendChild(optiond1);
//   if (alltopics.length > 0) {
//       alltopics.forEach(function (elem, index) {
//           const option1 = document.createElement("option");
//           option1.value = elem.topicName;
//           option1.textContent = elem.topicName;
//           selectElement1.appendChild(option1);
//       });

//       let kk=document.getElementById('topicnames') as HTMLSelectElement
//       kk.value = topic
//   }


// }


// getTimeDifference(timestamp) {
//   const currentTime = Date.now();
//   const timeDifference = currentTime - timestamp;
//   // Convert milliseconds to seconds, minutes, hours, days, and years
//   const seconds = Math.floor(timeDifference / 1000);
//   const minutes = Math.floor(seconds / 60);
//   const hours = Math.floor(minutes / 60);
//   const days = Math.floor(hours / 24);
//   const years = Math.floor(days / 365);
//   if (years >= 1) {
//       return `${years} years ago`;
//   } else if (years === 1) {
//       return `1 year ago`;
//   } else if (days >= 1) {
//       return `${days} days ago`;
//   } else if (hours >= 1) {
//       return `${hours} hours ago`;
//   } else if (minutes >= 1) {
//       return `${minutes} mins ago`;
//   } else {
//       return `${seconds} seconds ago`;
//   }
// }

// checkData(d) {
//   let mapped = d.map(e => e.Subject)
//   return this.removeDuplicates(mapped)
// }

// removeDuplicates(arr) {
//   return arr.filter((value, index, self) => self.indexOf(value) === index);
// }

 }
