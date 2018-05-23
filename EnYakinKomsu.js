//En yakın komşu yöntemiyle yolu oluşturulur.
function enYakinKomsuOlustur(cizge){ //Metot, argüman olarak bir çizge nesnesi alır.
    let dugumIdleri = cizge.dugumIdleriniAl();
    //Gidilen her il bir düğüm 
    //olarak bu değişkene atanır.
    let yolDugumleri = [dugumIdleri[0]]; 
    //Başlangıç noktası hangisiyse o düğümden başlanması için 
    //yeni bir değişkene ilgili atama sağlanır.
    while(true) //Sonsuz döngü ama listede ne kadar düğüm varsa o kadar döner.
    {
        let mesafeler = cizge.mesafeleriAl(yolDugumleri[yolDugumleri.length - 1]);
        //Her bir şehir ve o şehirden önceki şehirler arası mesafelerin
        //hesabı için değişken oluşturulur ve ilgili atama yapılır.
        mesafeler.sort(function(a, b){ return a.distance - b.distance; });
        //Döngü anında hangi şehirdeyse, bir önceki şehirle
        //arasındaki mesafeyi sıralamak açısından büyük olanı
        //küçükten çıkarmak için kullanılan sıralama metodu.
        mesafeler = mesafeler.filter(function(a){return yolDugumleri.indexOf(a.id) == -1;})
        //Başlangıç noktası seçildikten sonra gidilecek illerin
        //noktalarını ekleyebilmek için kullanılan filtreleme metodu.

        if(mesafeler.length == 0) //Her düğüm dolaşıldıysa döngüden çık
            break;

        yolDugumleri.push(mesafeler[0].id); //Anlık olarak ilk düğümü yığına ekler
    }

    yolDugumleri.push(yolDugumleri[0]);
    //Döngü bittiğinde yığına tekrardan başlangıç noktasını ekler

    yoluGoster(yolDugumleri, cizge, "canvasEYK", "eyk_h1", "EN YAKIN KOMŞU YÖNTEMİ: ");
    //Canvasta mesafe gösterilir      
}