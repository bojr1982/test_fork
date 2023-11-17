export interface Commande {
    ncommande: string;
    fournisseur: string;
    libelle_four: string;
    datecommande:Date;
    nbpostes: number;
    nbpostes_termine:number;
    devise:string;
    postes:any[];
 
    }