import { AfterViewInit, Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router,NavigationEnd } from '@angular/router';

// import * as io from 'socket.io-client';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'electromagnet';
  receivedData: any;
  private socket: Socket;
  istableapp: boolean = false
  Textractdata: any

  links = [
   { path: '/', title: 'game-login' },
    { path:'/game-registration', title: 'game-registration' },
    { path:'/game', title: 'thinktac-games' },
    { path:'/logout', title: 'logout' }

  ];

  constructor(
    private router: Router
  ){

  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects === '/logout') {
          // Call your function here
          this.logout();
        }
      }
    });
  }  // m_top: any;
  // m_left: any;
  // p_left: any;
  // in_i: any
  // p_top: any;
  // battery: any;
  // nail: any;
  // d_wire: any;
  // e_minus: any
  // t_minus: any
  // u_wire: any;
  // circle: any;
  // c_line: any;
  // pin: any;
  // ac: any
  // magnate: any
  // pins: any
  // current: any
  // no_pins: number
  // mmf: any;
  // core: any;
  // c_num: any
  // storageData: any
  // size: any
  // initialGamedata: any
  // initial: any
  // canvas: any
  // studentId: any
  // h: number;
  // l: number;
  // r: number;
  // cloudrun: boolean
  // window: Window | undefined;
  // output: any
  // sliders: any
  // sliderValue: any
  // materials: any
  // istid: any
  // settings: any
  // href: string
  // queryData: any
  // onload: boolean
  // classroomid: any
  // transferData: { current: any, num: any, mmf: any, core: any, gametitle: any, state: any,studentId:string }
  // value: any
  // constructor(private http: HttpClient, private route: ActivatedRoute,
  //   private router: Router) {
  //   this.window = typeof window !== 'undefined' ? window : undefined;
  //   this.cloudrun = true
  //   this.ac = [];
  //   this.magnate = [];
  //   this.pins = [];
  //   this.current = 1;
  //   this.no_pins = 11;
  //   this.settings = {
  //     fill: "#9a1750",
  //     background: "#d7dcdf",
  //   };
  //   this.c_num = 0;
  //   this.h = 115;
  //   this.l = 130;
  //   this.r = 200;
  //   this.onload = false
  //   this.transferData = {
  //     core: '',
  //     current: 1,
  //     num: 0,
  //     mmf: 0,
  //     gametitle: this.title,
  //     state: "active",
  //     studentId:""
  //   }

  //   this.size = {
  //     width: 450,
  //     height: 300,
  //   };

  //   this.initial = {
  //     left: 110,
  //     top: 150
  //   };
  //   this.canvas = new fabric.Canvas("canvas", {
  //     hoverCursor: "pointer",
  //     selection: false,
  //     backgroundColor: '#e3e2df',
  //     selectionBorderColor: "blue",
  //     width: this.size.width,
  //     height: this.size.height,
  //   });
  //   this.socket = io('http://localhost:3000');
  //   this.socket.on('connect', () => {
  //     console.log('Connected to WebSocket server');
  //   });
  //   this.socket.on('disconnect', () => {
  //     console.log('Disconnected from WebSocket server');
  //   });
  // }

  // sendMessage(msg: string) {
  //   this.socket.emit('sendMessage', { message: msg });
  // }

  // onNewMessage() {
  //   return new Observable(observer => {
  //     this.socket.on('newMessage', msg => {
  //       observer.next(msg);
  //     });
  //   });
  // }

  // ngAfterViewInit(): void {

  //   const isRunningInsideIframe = window.self !== window.top;

  //   if (isRunningInsideIframe) {
  //     this.cloudrun = true
  //   } else {
  //     this.cloudrun = false
  //   }
  //   let slider = document.getElementById("myRange") as HTMLInputElement;
  //   let output = document.getElementById("range.value") as HTMLElement;
  //   slider.oninput = () => {
  //     console.log(slider.value)
  //     output.innerHTML = (slider.value) + " A";
  //     this.current = slider.value;
  //     this.transferData.current = slider.value

  //   }
  //   this.settings = {
  //     fill: "#9a1750",
  //     background: "#d7dcdf",
  //   };
  //   this.sliders = document.querySelectorAll(".range-slider");
  //   Array.prototype.forEach.call(this.sliders, (slider) => {
  //     slider.querySelector("input").addEventListener("input", (event: any) => {
  //       this.applyFill(event.target);
  //     });
  //     this.applyFill(slider.querySelector("input"));
  //   });
  // }

  // ngOnInit(): void {
  //   this.route.queryParams.subscribe(params => {
  //   })
  //   this.canvas = new fabric.Canvas("canvas", {
  //     hoverCursor: "pointer",
  //     selection: false,
  //     backgroundColor: '#e3e2df',
  //     selectionBorderColor: "blue",
  //     width: this.size.width,
  //     height: this.size.height,
  //   });
  //   if (this.window) {
  //     this.window.onload = () => {
  //       this.onload = true
  //       if (this.cloudrun) {
  //         this.getInitialGameData()
  //       }
  //       this.bucket();
  //       // this.calcu();
  //       this.coil();
  //       let imgElement = document.getElementById("image") as HTMLImageElement;
  //       let imgInstance = new fabric.Image(imgElement, {
  //         left: 340,
  //         top: 5,
  //         selectable: false
  //       });
  //       this.canvas.add(imgInstance);
  //       let kk = document.getElementById("instruction") as HTMLInputElement
  //       kk.innerHTML = "Select number of turns to create electromagnet.";
  //     }
  //   }
  // }

  // applyFill(slider: any) {
  //   const percentage =
  //     (100 * (slider.value - slider.min)) / (slider.max - slider.min);
  //   this.sliderValue = slider.value;
  //   const bg = `linear-gradient(90deg, ${this.settings.fill} ${percentage}%, ${this.settings.background
  //     } ${percentage + 0.1}%)`;
  //   slider.style.background = bg;
  // }

  // pull() {
  //   let no_pull = this.calcu();          // setTimeout(coil,5000);
  //   if (this.m_left > this.l && this.m_left < this.r && this.m_top > this.h) {
  //     this.h = 0;
  //     this.l = 0;
  //     this.r = this.size.width;
  //     for (let i = 0; i < no_pull; i++) {
  //       if (i < 3) {
  //         this.pins[i].set({
  //           left: this.m_left + 10 + i * 5,
  //           top: this.m_top + 123,
  //           angle: 0
  //         });
  //         if (this.m_top >= 120) {
  //           this.pins[i].set('top', 243);
  //         }
  //       }
  //       if (i >= 3) {
  //         this.pins[i].set({
  //           left: this.m_left + i * 5,
  //           top: this.m_top + 170,
  //           angle: 0
  //         });
  //         if (this.m_top >= 72) {
  //           this.pins[i].set('top', 243);
  //         }
  //       }
  //     }
  //     for (let i = 0; i < 11; i++) {
  //       this.pins[i].set('angle', -3);
  //     }
  //     if (no_pull != 0) {
  //       let p = document.getElementById("instruction") as HTMLInputElement
  //       p.innerHTML = "Hurray! you have pulled " + no_pull + " pins.";
  //     }
  //   }
  // }

  // clear_coil() {
  //   for (let i = 0; i < 120; i++) {
  //     this.canvas.remove(this.ac[i]);
  //     this.ac.pop();
  //   }
  // }

  // move() {
  //   this.m_left = this.materials.get('left');
  //   this.m_top = this.materials.get('top');
  //   if (this.m_left >= this.size.width - 110) {
  //     this.m_left = this.size.width - 110;
  //     this.materials.set('left', this.size.width - 110);
  //   }
  //   if (this.m_left <= 0) {
  //     this.m_left = 1;
  //     this.materials.set('left', 0);
  //   }
  //   if (this.m_top >= this.size.height - 140) {
  //     this.m_top = this.size.height - 150;
  //     this.materials.set('top', this.size.height - 140);
  //   }
  //   if (this.m_top <= 25) {
  //     this.m_top = 25;
  //     this.materials.set('top', 25);
  //   }
  //   this.pull();
  // }

  // coil() {
  //   let p = document.getElementById("dropbtn") as HTMLSelectElement
  //   this.c_num = p.value;
  //   this.transferData.num = this.c_num
  //   this.bucket();
  //   this.clear_coil();
  //   this.calcu();
  //   let r;
  //   let in_i;

  //   let e_minus;
  //   let c_left = 0;
  //   var bat = document.getElementById("battery") as HTMLImageElement;
  //   var battery = new fabric.Image(bat, {
  //     left: this.initial.left + 80,
  //     top: this.initial.top - 120,
  //     selectable: false
  //   });
  //   var nal = document.getElementById("nail") as HTMLImageElement;
  //   this.nail = new fabric.Image(nal, {
  //     left: this.initial.left + 20,
  //     top: this.initial.top - 123,
  //     selectable: false
  //   });

  //   if (this.core == 0.5) {
  //     console.log( fabric.Image.filters)
  //           let filter = new fabric.Image.filters.Tint({
  //             color: 'blue',
  //             opacity: 0.5
  //           });
  //           this.nail.filters.push(filter);
  //           this.nail.applyFilters(this.canvas.renderAll.bind(this.canvas));
  //   }
  //   this.u_wire = new fabric.Rect({
  //     left: this.initial.left + 110,
  //     top: this.initial.top - 100,
  //     fill: 'black',
  //     width: 1,
  //     height: 65,
  //     angle: 90,
  //     selectable: false
  //   });
  //   this.d_wire = new fabric.Rect({
  //     left: this.initial.left + 110,
  //     top: this.initial.top - 16,
  //     fill: 'black',
  //     width: 1,
  //     height: 65,
  //     angle: 90,
  //     selectable: false
  //   });
  //   if (this.c_num == 5) {
  //     this.r = 7;
  //     this.in_i = 17.4;
  //     this.e_minus = 0;
  //     this.t_minus = 86;
  //     c_left = 1;
  //   }
  //   else if (this.c_num == 20) {
  //     this.r = 5;
  //     this.in_i = 3.9;
  //     this.e_minus = 0;
  //     this.t_minus = 90.7;
  //   }
  //   else if (this.c_num == 50) {
  //     this.r = 3;
  //     this.in_i = 1.61;
  //     this.e_minus = 0;
  //     this.t_minus = 95.6;
  //   }
  //   else if (this.c_num == 120) {
  //     this.r = 2;
  //     this.in_i = .685;
  //     this.e_minus = -2;
  //     this.t_minus = 97.3;
  //     c_left = -1;
  //   }
  //   for (let i = 0; i < this.c_num; i++) {
  //     var circle = new fabric.Circle({
  //       radius: r,
  //       left: -35.5 + c_left,
  //       flipX: true,
  //       top: i * this.in_i - 44,
  //       angle: 45,
  //       startAngle: 0,
  //       endAngle: Math.PI - 1,
  //       stroke: 'red',
  //       strokeWidth: .5,
  //       fill: ''
  //     });
  //     var c_line = new fabric.Rect({
  //       left: this.initial.left - 140 + c_left - this.e_minus * 1.5,
  //       top: 60 - this.t_minus + i * this.in_i,
  //       fill: 'red',
  //       width: .5,
  //       height: 8 - this.e_minus,
  //       angle: 105,
  //     });
  //     var group = new fabric.Group([circle, c_line], {
  //     });
  //     this.ac.push(group);
  //   }
  //   this.materials = new fabric.Group([battery, this.nail, this.u_wire, this.d_wire], {
  //     selectable: true,
  //     hasBorders: false,
  //     hasControls: false
  //   })
  //   for (let i = 0; i < this.ac.length; i++) {
  //     this.materials.add(this.ac[i]);
  //   }
  //   this.canvas.add(this.materials);
  //   this.magnate.push(this.materials);
  //   this.canvas.remove(this.magnate[this.magnate.length - 2]);
  //   this.materials.on('moving', () => { this.move() });
  // }

  // calcu() {
  //   let co = document.getElementById("core") as HTMLSelectElement
  //   this.core = co.value;
  //   this.transferData.core = this.core

  //   this.mmf = Math.floor(this.c_num * this.current * this.core);
  //   let no_pull = Math.floor(this.mmf / 100);
  //   if (this.mmf == 0) {
  //     let j = document.getElementById("instruction") as HTMLInputElement
  //     j.innerHTML = "No electromagnate were created."
  //   }
  //   else {
  //     let h = document.getElementById("instruction") as HTMLInputElement
  //     h.innerHTML = this.mmf + " Ampere-turn of Magnetomotive force (mmf) were created."
  //     this.transferData.mmf = this.mmf
  //   }

  //   if (!this.onload || this.transferData.state=='active') {
  //     this.sendDataServer(this.transferData)
  //   }
  //   else {
  //     this.onload = false
  //   }
  //   return no_pull;
  // }

  // bucket() {
  //   this.clear_pins();
  //   let line1 = new fabric.Line([0, 20, 0, 70],
  //     {
  //       left: this.initial.left + 45,
  //       top: this.initial.top + 90,
  //       stroke: "black",
  //       strokeWidth: 2,
  //       selectable: false,
  //       evented: false,
  //     }
  //   );
  //   let line2 = new fabric.Line([0, 20, 0, 70],
  //     {
  //       left: this.initial.left + 102,
  //       top: this.initial.top + 90,
  //       stroke: "black",
  //       strokeWidth: 2,
  //       selectable: false,
  //       evented: false,
  //     }
  //   );
  //   var line3 = new fabric.Line([0, 30, 0, 88],
  //     {
  //       left: this.initial.left + 103,
  //       top: this.initial.top + 139,
  //       stroke: "black",
  //       strokeWidth: 2,
  //       selectable: false,
  //       evented: false,
  //       angle: 90
  //     }
  //   );
  //   let table = new fabric.Rect({
  //     left: 0,
  //     top: this.initial.top + 150,
  //     // rx : 2,
  //     fill: '#bab2b5',
  //     width: 9,
  //     height: 450,
  //     angle: -90,
  //     selectable: false
  //   });
  //   let test_tube = new fabric.Group([line1, line2, line3, table], {
  //     selectable: false
  //   })
  //   this.canvas.add(test_tube);
  //   let p = document.getElementById("pin") as HTMLImageElement;
  //   for (let i = 0; i < this.no_pins; i++) {
  //     let pin = new fabric.Image(p, {
  //       left: 155 + i * 5,
  //       top: 242,
  //       angle: -1,
  //       selectable: false
  //     });
  //     this.pins.push(pin);
  //     this.canvas.add(this.pins[i]);
  //   }
  // }

  // clear_pins() {
  //   for (let i = 0; i <= this.pins.length; i++) {
  //     this.canvas.remove(this.pins[i]);
  //   }
  //   this.pins = [];
  //   this.h = 115;
  //   this.l = 130;
  //   this.r = 200;
  // }

  // sendDataServer(gamedata: any) {
  //   let data = {
  //     title: "Electromagnet",
  //     game: gamedata
  //   }
  //   if (this.cloudrun) {
  //     console.log("sending.........")
  //     console.log(this.transferData.state)
  //     const url = 'http://localhost:5000/thinktac-staging/asia-south1/get_game_state'; // Adjust the endpoint as needed
  //     this.http.post(url, data).subscribe(
  //       (response: any) => {
  //         this.receivedData = response;
  //         console.log(this.receivedData)
  //         // this.receivedData.game.mode='default'
  //         console.log('Data sent to server successfully.');
  //       },
  //       (error) => {
  //         console.error('Error retrieving data from Firebase:', error);
  //       }
  //     );
  //   }
  //   else {
  //     console.log(data)
  //   }
  // }

  // getInitialGameData() {
  //   console.log("getting initialgamedata")
  //   const url = 'http://localhost:5000/thinktac-staging/asia-south1/get_game_state'; // Adjust the endpoint as needed
  //   this.http.get(url).subscribe(
  //     (response: any) => {
  //       if (response.initidata != null) {
  //         this.setData(response)
  //       }
  //     },
  //     (error) => {
  //       console.error('Error retrieving data from Firebase:', error);
  //     }
  //   );
  // }

  // setData(data: any) {
  //   this.initialGamedata = data
  //   console.log(this.initialGamedata)
  //   this.c_num = this.initialGamedata.initialgamedata.gamePost.gameData.num
  //   this.core = this.initialGamedata.initialgamedata.gamePost.gameData.core
  //   this.mmf = this.initialGamedata.initialgamedata.gamePost.gameData.mmf
  //   this.current = this.initialGamedata.initialgamedata.gamePost.gameData.current
  //   let p = document.getElementById("dropbtn") as HTMLSelectElement
  //   p.value = this.c_num
  //   let co = document.getElementById("core") as HTMLSelectElement
  //   co.value = this.core
  //   let h = document.getElementById("instruction") as HTMLInputElement
  //   h.innerHTML = this.mmf + " Ampere-turn of Magnetomotive force (mmf) were created."
  //   let slider = document.getElementById("myRange") as HTMLInputElement;
  //   slider.value = this.current
  //   let output = document.getElementById("range.value") as HTMLElement;
  //   output.innerHTML = (slider.value) + " A";
  //   this.transferData.studentId=this.initialGamedata.studentId
  // }
  // pause() {
  //   this.transferData.state = 'paused'
  //   this.sendDataServer(this.transferData)
  //   this.cloudrun = false
  // }

  // start() {
  //   this.transferData.state = 'active'
  //   this.sendDataServer(this.transferData)
  //   this.cloudrun = true
  // }


  navigateTo(link: string): void {
    this.router.navigateByUrl(link);
  }

  logout(){
    localStorage.clear()
  }
}
