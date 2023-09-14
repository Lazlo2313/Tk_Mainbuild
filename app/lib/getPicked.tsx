export default async function getData() {
    const url = 'https://toykingdom.co.za/wp-json/wc/v3/orders';
  
    const res = await fetch(url + '?status= stock-in-transit'+ "&per_page=100", {
      headers: {
        Authorization: 'Basic ' + btoa('ck_093d5ae77c9855cc63de9c71919817c5508a34df:cs_41a421266ab3859d3c644951894f7f4b4a420a7a'),
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // Set cache control to 'no-store'
    }); 
  
    if (!res.ok) throw new Error('Failed to fetch data');
  
    return res.json();
  }
  