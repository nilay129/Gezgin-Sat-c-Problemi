let cizge = new Cizge();
//Cizge.js'de sınıf olarak yaratılmış Cizge'den nesne oluşuturuldu
let devamEdenGenetik = undefined; 
//Henüz değer ataması yapılmayan devam etmekte olan Genetik Algoritma değişkenimiz

window.onload = function(){ 
    let canvas = document.getElementById("noktalar_canvas");
    //İlk canvastan nesne yaratılır
    noktalariGoster(undefined, "noktalar_canvas");
    //İlk anda il seçimi olmadığı için nokta gözükmeyecektir
    canvas.addEventListener("mousedown", function(event){ //İl seçimi yapıldığı anda
        cizge.dugumEkle(event.offsetX, event.offsetY, yeniId()); 
        //Tıklanılan yerin x-y koordinatları alınır
        //Çizgedeki düğüme atanır
        noktalariGoster(cizge, "noktalar_canvas");
        //Canvas üzerinde seçilen her ilin noktasını göstermek için

        if(cizge.dugumIdleriniAl().length > 1) //Seçilen il sayısı 1den büyükse
        {
            document.getElementById("algorithms").style.display = "inline";
            //En yakın komşu ve genetik için kullanılan katmanı aktif hale getir
            if(devamEdenGenetik != undefined)    //Değer ataması olmuşsa
                clearInterval(devamEdenGenetik); //Değişken üzerinde yapılan işlemleri iptal eder

            //Aşağıdaki iki metot sayesinde En yakın komşu
            //ve genetik algoritmalara işletilmesi için
            //graph nesnesi gönderilir
            devamEdenGenetik = genetikOlustur(cizge);
            enYakinKomsuOlustur(cizge);
        }

    }, false);
};
