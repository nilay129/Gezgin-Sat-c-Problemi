//Başlamak için rastgele bir yol oluştur
function rastgeleYolOlustur(cizge){
    let dugumIdleri = cizge.dugumIdleriniAl();
    let yolDugumleri = [dugumIdleri.shift()]; //Baştan başla
    
    for(let i = 0; i < dugumIdleri.length; )
    {
        let a = Math.round(Math.random() * (dugumIdleri.length - 1));
        yolDugumleri.push(dugumIdleri[a]);
        dugumIdleri.splice(a, 1);
    }

    yolDugumleri.push(yolDugumleri[0]); //İlkiyle tekrar bitir

    return yolDugumleri;
}

//Yolu biraz mutasyona uğratın
function yoluMutasyonaUgrat(yol){
    let cikisYolu = yol.slice();
    let ilkVeSon = cikisYolu.pop();

    let mutasyonaUgrat = Math.ceil(Math.random() * ((yol.length - 1) / 50) + 1);
    mutasyonaUgrat = 1;
    
    for(let i = 0; i < mutasyonaUgrat; i++){
        let rastgeleIndis = Math.round(Math.random() * (cikisYolu.length - 1));
        let rastgeleDigerIndis = Math.round(Math.random() * (cikisYolu.length - 1));
        
        let eleman = cikisYolu[rastgeleIndis];
        cikisYolu.splice(rastgeleIndis, 1);
        cikisYolu.splice(rastgeleDigerIndis, 0, eleman);
    }

    //Başlangıç düğümüyle başla ve bitir
    cikisYolu.unshift(ilkVeSon);
    cikisYolu.push(ilkVeSon);

    return cikisYolu;
}

//Devam ettirmek için en uygun yolları bulun
function devamEdenYollariSec(yollar, cizge, adet){
    yollar.sort(function(a, b){return cizge.yolMesafesiniAl(a) - cizge.yolMesafesiniAl(b);});
    
    let ciftKayitOlmayan = [];
    for(let y in yollar)
        if(ciftKayitOlmayan.indexOf(yollar[y]) == -1)
            ciftKayitOlmayan.push(yollar[y]);
    
    return ciftKayitOlmayan.splice(0, adet);
}

//Yeni bir nesil yarat: YeniNesil = yavru -> mutasyon + ebeveynler -> seçim
function nesilOlustur(cizge, eskiNesil, turBasiYavru, turBasiGeriyeKalanlar, turBasiRastgele){
    
    let yeniNesil = [];
    for(let y = 0; y < eskiNesil.length; y++)
        for(let i = 0; i < turBasiYavru; i++)
            yeniNesil.push(yoluMutasyonaUgrat(eskiNesil[y]));

    for(let y = 0; y < eskiNesil.length; y++)
        yeniNesil.push(eskiNesil[y]); //Ayrıca aileleri yavrulara da ekleyin

    for(let i = 0; i < turBasiRastgele; i++)
        yeniNesil.push(rastgeleYolOlustur(cizge)); //Ayrıca rasgele yollar ekleyin

    let geriyeKalanlar = devamEdenYollariSec(yeniNesil, cizge, turBasiGeriyeKalanlar);
    
    return geriyeKalanlar;
}

//Genetik algoritmayı yapmak için ana program
function genetikOlustur(cizge){

    let nesilBasiYavru = 20;
    let turBasiGeriyeKalanlar = 20;
    let turBasiRastgele = 5;

    //İlk nesil bazı rastgele yollardır
    let nesil = [];
    for(let i = 0; i < turBasiGeriyeKalanlar; i++)
        nesil.push(rastgeleYolOlustur(cizge));

    //Nesiller boyunca devam eder
    let tur = 0;
    return setInterval(function(){
        nesil = nesilOlustur(cizge, nesil, nesilBasiYavru, turBasiGeriyeKalanlar, turBasiRastgele);
        console.log("Turun en iyisi " + tur++ + ": " + cizge.yolMesafesiniAl(nesil[0]));
        yoluGoster(nesil[0], cizge, "canvasGenetik", "genetik_h1", "GENETİK YÖNTEM: ");
    }, 1);
}