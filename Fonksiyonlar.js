let yeniId = function(){ //Düğümleri gezmek amacıyla
    let id = 0;         //kullanılan bir metot
    return function(){return id++;}
}();

let egeImg = document.getElementById("ege");

//Rastgele düğümlerle çizge oluşturmak için
function cizgeOlustur(points){
    let cizge = new Cizge();
    for(let i = 0; i < points; i++){
        cizge.dugumEkle(Math.random() * 300, Math.random() * 300, yeniId());
    }
    return cizge;
}

//En yakın komşu ve genetik algoritma haritalarının
//yollarının gösterilmesi amacıyla kullanılan metot
function yoluGoster(yol, cizge, canvasId, baslikId, baslikEki){
    var ctx = document.getElementById(canvasId).getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 1000, 1000);
    
    ctx.drawImage(egeImg, 0, 0, 300, 300);

    ctx.strokeStyle = "black"; 
       
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(cizge.dugumler[yol[0]].x, cizge.dugumler[yol[0]].y);
    ctx.fillRect(cizge.dugumler[yol[0]].x - 10, cizge.dugumler[yol[0]].y - 10, 20, 20);
    
    ctx.fillStyle = "blue";
    for(let i = 1; i < yol.length; i++)
    {
        ctx.lineTo(cizge.dugumler[yol[i]].x, cizge.dugumler[yol[i]].y);
        ctx.fillRect(cizge.dugumler[yol[i]].x - 3, cizge.dugumler[yol[i]].y - 3, 6, 6);
    }
    ctx.lineWidth = 3;
    ctx.stroke();

    let mesafe = cizge.yolMesafesiniAl(yol);
    document.getElementById(baslikId).innerText = baslikEki + mesafe + " MESAFE"; 
}

//İlleri seçtiğimiz haritanın noktalarını göstermek için kullanılan metot
function noktalariGoster(cizge, canvasId){
    var ctx = document.getElementById(canvasId).getContext("2d"); // İçerik tipi belirtilerek nesne alınıyor.
    ctx.fillStyle = "white"; //Arka plan rengi seçmek için
    ctx.fillRect(0, 0, 1000, 1000); //İçi dolu olarak çiziliyor.
    
    ctx.drawImage(egeImg, 0, 0, 300, 300); //Boyutları belirtilmiş bir şekilde resim eklenir.

    if(cizge != undefined){
        let idler = cizge.dugumIdleriniAl(); //Canvastaki her bir noktanın id'si alınır

        if(idler.length > 0) //Başlangıç noktası için
        {
            ctx.fillStyle = "red";        
            ctx.moveTo(cizge.dugumler[idler[0]].x, cizge.dugumler[idler[0]].y);
            ctx.fillRect(cizge.dugumler[idler[0]].x - 10, cizge.dugumler[idler[0]].y - 10, 20, 20);
        }

        ctx.fillStyle = "blue";
        for(let i = 1; i < idler.length; i++) //Diğer noktalar için
        {
            ctx.moveTo(cizge.dugumler[idler[i]].x, cizge.dugumler[idler[i]].y);
            ctx.fillRect(cizge.dugumler[idler[i]].x - 3, cizge.dugumler[idler[i]].y - 3, 6, 6);
        }
    }
}