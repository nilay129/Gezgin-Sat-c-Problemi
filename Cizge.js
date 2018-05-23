let Cizge = class{
    constructor(){
        this.dugumler = {};
    }

    //Düğüm id'lerini almak için
    dugumIdleriniAl(){
        let cikis = [];
        for(let id in this.dugumler)
            cikis.push(id);
        return cikis; 
    }

    //Bir düğüm eklemek için
    dugumEkle(x, y, id){
        this.dugumler[id] = {x:x, y:y};
    }

    //Yol uzunluğunu almak için
    yolMesafesiniAl(yol){
        let mesafe = 0;
        for(let i = 0; i < yol.length - 1; i++)
            mesafe += this.mesafeyiAl(yol[i], yol[i + 1]);
        return mesafe;
    }

    //Genetik algoritmanın kullandığı mesafe hesaplama metodu
    mesafeyiAl(dugumId, digerId)
    {
        return this.dugumMesafeleriniAl(this.dugumler[dugumId], this.dugumler[digerId]);
    }

    //mesafeyiAl ve mesafeleriAl metotlarının istediği hesaplamaları yapan metot
    dugumMesafeleriniAl(a, b){
        let x = Math.abs(b.x - a.x);
        let y = Math.abs(b.y - a.y);

        return x + y;
    }

    //En yakın komşu algoritmasının kullandığı mesafe hesaplama metodu
    mesafeleriAl(dugumId){

        let cikis = [];
        for(let digerId in this.dugumler)
        {
            if(dugumId != digerId)
                cikis.push({id:digerId, distance:this.dugumMesafeleriniAl(this.dugumler[digerId], this.dugumler[dugumId])});            
        }
        return cikis;
    }
}