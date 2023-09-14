export default async function getData() {
    const url = 'https://babykingdom.co.za/wp-json/wc/v3/orders';
  
    const res = await fetch(url + '?status= completed'+ "&per_page=100", {
      headers: {
        Authorization: 'Basic ' + btoa('ck_5753279bd985b09a6f664fe9a981214c1b69ba87:cs_1c9cc49903f4a924e49ed1d82b766148c462f2d1'),
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // Set cache control to 'no-store'
    }); 
  
    if (!res.ok) throw new Error('Failed to fetch data');
  
    return res.json();
  }
  