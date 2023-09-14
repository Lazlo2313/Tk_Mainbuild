export default async function getData() {
    const url = 'https://petkingdom.co.za/wp-json/wc/v3/orders';
  
    const res = await fetch(url + '?status= completed'+ "&per_page=100", {
        headers: {
            Authorization: 'Basic ' + btoa('ck_42c53f09273497469da930a12500780bdd81c897:cs_1cd41998890c1e42d74970d36bf97a3f7e6e1304'),
            'Content-Type': 'application/json'
          },
      cache: 'no-store' // Set cache control to 'no-store'
    }); 
  
    if (!res.ok) throw new Error('Failed to fetch data');
  
    return res.json();
  }
  