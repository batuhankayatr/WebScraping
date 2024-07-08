const puppeteer = require('puppeteer');

const scrape = async (city) => {
  const url = `https://www.opet.com.tr/akaryakit-fiyatlari/${city}`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // Sayfanın yüklenmesini bekleyelim
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Tablonun yüklenmesini bekleyelim
    const tableSelector = '#root div div div div div div:nth-child(1) div:nth-child(2) div div:nth-child(2) table tbody tr';
    await page.waitForSelector(tableSelector);

    // Tüm satırları seçelim
    const tableRows = await page.$$(tableSelector);

    // Eğer tablo satırları varsa devam edelim
    if (tableRows.length > 0) {
      // Sadece ikinci satırın verilerini çekelim (örnek olarak)
      const rowIndexToScrape = 1; // İkinci satırın indeksi 1'dir (JavaScript dizileri sıfırdan başlar)
      const rowToScrape = tableRows[rowIndexToScrape];

      // Satırdaki verileri çekelim
      const rowData = await page.evaluate(row => {
        const cells = row.getElementsByTagName('td');
        const data = Array.from(cells).map(cell => cell.textContent.trim());
        return data;
      }, rowToScrape);

      // "İlçe" değerini düzenle
      const ilceData = rowData[0].replace('İlçe', '').trim(); // "İlçeMERKEZ" -> "MERKEZ"

      // "Kurşunsuz Benzin" değerini sayısal kısmını içerecek şekilde düzenleyelim
      const kurSunsuzBenzinSelector = '#root div div div div div div:nth-child(1) div:nth-child(2) div div:nth-child(2) table tbody tr td:nth-child(3)';
      const kurSunsuzBenzinElement = await page.waitForSelector(kurSunsuzBenzinSelector);
      const kurSunsuzBenzinData = await page.evaluate(element => element.textContent.trim(), kurSunsuzBenzinElement);
      const numericValueKurSunsuzBenzin = kurSunsuzBenzinData.match(/(\d+\.\d+)/);
      const formattedKurSunsuzBenzin = numericValueKurSunsuzBenzin ? `${numericValueKurSunsuzBenzin[0].slice(2)} TL/L` : 'Veri bulunamadı';

      // "Motorin UltraForce" değerini sayısal kısmını içerecek şekilde düzenleyelim
      const motorinUltraForceSelector = '#root div div div div div div:nth-child(1) div:nth-child(2) div div:nth-child(2) table tbody tr td:nth-child(4)';
      const motorinUltraForceElement = await page.waitForSelector(motorinUltraForceSelector);
      const motorinUltraForceData = await page.evaluate(element => element.textContent.trim(), motorinUltraForceElement);
      const numericValueMotorinUltraForce = motorinUltraForceData.match(/(\d+\.\d+)/);
      const formattedMotorinUltraForce = numericValueMotorinUltraForce ? `${numericValueMotorinUltraForce[0]} TL/L` : 'Veri bulunamadı';

      // "Motorin EcoForce" değerini sayısal kısmını içerecek şekilde düzenleyelim
      const motorinEcoForceSelector = '#root div div div div div div:nth-child(1) div:nth-child(2) div div:nth-child(2) table tbody tr td:nth-child(5)';
      const motorinEcoForceElement = await page.waitForSelector(motorinEcoForceSelector);
      const motorinEcoForceData = await page.evaluate(element => element.textContent.trim(), motorinEcoForceElement);
      const numericValueMotorinEcoForce = motorinEcoForceData.match(/(\d+\.\d+)/);
      const formattedMotorinEcoForce = numericValueMotorinEcoForce ? `${numericValueMotorinEcoForce[0]} TL/L` : 'Veri bulunamadı';

      // "Gazyağı" değerini sayısal kısmını içerecek şekilde düzenleyelim
      const gazyagiSelector = '#root div div div div div div:nth-child(1) div:nth-child(2) div div:nth-child(2) table tbody tr td:nth-child(6)';
      const gazyagiElement = await page.waitForSelector(gazyagiSelector);
      const gazyagiData = await page.evaluate(element => element.textContent.trim(), gazyagiElement);
      const numericValueGazyagi = gazyagiData.match(/(\d+\.\d+)/);
      const formattedGazyagi = numericValueGazyagi ? `${numericValueGazyagi[0]} TL/L` : 'Veri bulunamadı';

      // "Fuel Oil" değerini sayısal kısmını içerecek şekilde düzenleyelim
      const fuelOilSelector = '#root div div div div div div:nth-child(1) div:nth-child(2) div div:nth-child(2) table tbody tr td:nth-child(7)';
      const fuelOilElement = await page.waitForSelector(fuelOilSelector);
      const fuelOilData = await page.evaluate(element => element.textContent.trim(), fuelOilElement);
      const numericValueFuelOil = fuelOilData.match(/(\d+\.\d+)/);
      const formattedFuelOil = numericValueFuelOil ? `${numericValueFuelOil[0]} TL/L` : 'Veri bulunamadı';

      // "Yüksek Kükürtlü Fuel Oil" değerini sayısal kısmını içerecek şekilde düzenleyelim
      const yuksekKukurtluFuelOilSelector = '#root div div div div div div:nth-child(1) div:nth-child(2) div div:nth-child(2) table tbody tr td:nth-child(8)';
      const yuksekKukurtluFuelOilElement = await page.waitForSelector(yuksekKukurtluFuelOilSelector);
      const yuksekKukurtluFuelOilData = await page.evaluate(element => element.textContent.trim(), yuksekKukurtluFuelOilElement);
      const numericValueYuksekKukurtluFuelOil = yuksekKukurtluFuelOilData.match(/(\d+\.\d+)/);
      const formattedYuksekKukurtluFuelOil = numericValueYuksekKukurtluFuelOil ? `${numericValueYuksekKukurtluFuelOil[0]} TL/L` : 'Veri bulunamadı';

      // "Kalorifer Yakıtı" değerini sayısal kısmını içerecek şekilde düzenleyelim
      const kaloriferYakitiSelector = '#root div div div div div div:nth-child(1) div:nth-child(2) div div:nth-child(2) table tbody tr td:nth-child(9)';
      const kaloriferYakitiElement = await page.waitForSelector(kaloriferYakitiSelector);
      const kaloriferYakitiData = await page.evaluate(element => element.textContent.trim(), kaloriferYakitiElement);
      const numericValueKaloriferYakiti = kaloriferYakitiData.match(/(\d+\.\d+)/);
      const formattedKaloriferYakiti = numericValueKaloriferYakiti ? `${numericValueKaloriferYakiti[0]} TL/L` : 'Veri bulunamadı';

      // Çekilen verileri bir JSON nesnesine çevirelim
      const jsonData = {
        'İlçe': ilceData,
        'Kurşunsuz Benzin': formattedKurSunsuzBenzin,
        'Motorin UltraForce': formattedMotorinUltraForce,
        'Motorin EcoForce': formattedMotorinEcoForce,
        'Gazyağı': formattedGazyagi,
        'Fuel Oil': formattedFuelOil,
        'Yüksek Kükürtlü Fuel Oil': formattedYuksekKukurtluFuelOil,
        'Kalorifer Yakıtı': formattedKaloriferYakiti
      };
     // JSON nesnesini yazdıralım
     console.log('JSON Verisi:', JSON.stringify(jsonData, null, 2));
      return jsonData;
      
    } else {
      console.log('Tablo satırları bulunamadı.');
    }
  } catch (error) {
    console.error('Hata oluştu:', error);
  } finally {
    // Tarayıcıyı kapat
    await browser.close();
  }
  
};

module.exports =scrape;
