export interface UserInterface {
  id: number
  firstname: string
  lastname: string
  email: string
  personalId: number
  passwordHash: string
  role: string
  reservation: any
}
export interface RegisterDoctors{
    FirstName: string
    Lastname: string
    Password: string
    Cv: any
    Category: string
    Personalid: string
    Photo: string
    Email: string
}


export interface Doctor {
  id:number

}


