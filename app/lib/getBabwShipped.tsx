export default async function getData() {
    const url = 'https://buildabear.co.za/wp-json/wc/v3/orders';
  
    const res = await fetch(url + '?status=shipped-order'+ "&per_page=100", {
      headers: {
        Authorization: 'Basic ' + btoa('ck_af4a19e98273cbd724b6b392537909a4864999f8:cs_fc4c7cadadab8e31ad07c3f53384ea6f3de4f3f8'),
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // Set cache control to 'no-store'
    }); 
  
    if (!res.ok) throw new Error('Failed to fetch data');
  
    return res.json();
  }
  