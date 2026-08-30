// mes interfaces
export type CategoriePlat = "resistance" | "braice"| "enjaillement"

export interface Mplat{
    id:number,
    nom:string,
    description: string,
    prix:number,
    image:string,
    categorie:CategoriePlat
};
 
export interface PanierItem extends Mplat{
    quantite:number
}