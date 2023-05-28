// /* eslint-disable @typescript-eslint/explicit-function-return-type */
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// // import { DeviceDetectorService } from 'ngx-device-detector';
// import { BehaviorSubject, lastValueFrom } from 'rxjs';

// @Injectable({
//     providedIn: 'root'
// })
// export class DeviceInfoService {
//     timeIpSubject = new BehaviorSubject(null);
//     constructor(
//         private http: HttpClient,
//         private deviceDetector: DeviceDetectorService) {
//     }
//     getOsName() {
//         return this.deviceDetector.os;
//     }
//     getOsVersion() {
//         return this.deviceDetector.os_version;
//     }
//     getBrowserName() {
//         return this.deviceDetector.browser;
//     }
//     getBrowserVersion() {
//         return this.deviceDetector.browser_version;
//     }
//     getDeviceType() {
//         return this.deviceDetector.deviceType;
//     }
//     isMobile() {
//         return this.deviceDetector.isMobile();
//     }
//     isTablet() {
//         return this.deviceDetector.isTablet();
//     }
//     isDesktop() {
//         return this.deviceDetector.isDesktop();
//     }
//     getDeviceInfo() {
//         return this.deviceDetector.getDeviceInfo();
//     }
//     getTime() {
//         const timeObj = this.http.get<any>('https://worldtimeapi.org/api/timezone/Asia/Kolkata');
//         return lastValueFrom(timeObj).then((a) => {
//             this.timeIpSubject.next([a.unixtime * 1000, a.client_ip]);
//         });
//     }
// }
