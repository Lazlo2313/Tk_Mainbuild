  export default async function getBnbOrders() {
    const url = 'https://bricksnblocks.co.za/wp-json/wc/v3/orders';
  
    const res = await fetch(url + "&per_page=100", {
        headers: {
            Authorization: 'Basic ' + btoa('ck_25d5d54a526e7289c8fd488a917514a1bbb684c5:cs_bcbff78f6defc78f68782f2d297cb60c391a7b9d'),
            'Content-Type': 'application/json'
          },
      cache: 'no-store' // Set cache control to 'no-store'
    }); 
  
    if (!res.ok) throw new Error('Failed to fetch data');
  
    return res.json();
  }
  