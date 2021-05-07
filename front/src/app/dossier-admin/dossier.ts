export interface IUtilisateur {
    Id: number,
    prenom: string,
    nom: string,
    tel: number,
    imageUrl: string,
    pseudo: number,
    email: string,
    role: string
}
export class Hotel implements IUtilisateur{
    constructor(
        public Id: number,
        public prenom: string,
        public nom: string,
        public tel: number,
        public imageUrl: string,
        public pseudo: number,
        public email: string,
        public role: string
    )   { } 
    
    getNewPrice(price: number): number {
        return price - 5;
    }

}     