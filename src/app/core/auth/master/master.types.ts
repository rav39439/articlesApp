// export interface User {
//     id?: string;
//     name?: string;
//     email?: string;
//     phone?: string;
//     avatar?: string;
//     status?: string;
// }

export interface MasterInstituteDoc {
    docId: string,
    board: string, /* Board Code */
    institutionName: string,
    registrationNumber: string,
    representativeName: string,
    representativePhone: string,
    creationDate?: Date,
    pincode: number,
    verificationStatus: boolean,
  }