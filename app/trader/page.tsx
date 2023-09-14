async function getData(): Promise<any> {
  const res = await fetch('https://toykingdom.ngrok.io/api/v1/trader/customer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      DB_ACCOUNTCODE: "99442515",
    }),
    cache: 'no-store' // Set cache control to 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Page(): Promise<JSX.Element> {
  const data = await getData();
  console.log(data);

  return <div className="container mx-auto mt-5">
        <form>
            <input type="text" name="search" placeholder="search account number" className="w-15 border rounded h-12 px-4 focus:outline-none"/>
        </form>
<table className="container mx-auto bg-white mt-5">
<thead className="bg-gray-100">
<tr className="text-left">
      <th className="py-2 px-4 border-b border-gray-200">Account Number</th>
      <th className="py-2 px-4 border-b border-gray-200">Full Name</th>
      <th className="py-2 px-4 border-b border-gray-200">Email Address</th>
      <th className="py-2 px-4 border-b border-gray-200">Mobile Number</th>
      <th className="py-2 px-4 border-b border-gray-200">Royalty Points</th>
      <th className="py-2 px-4 border-b border-gray-200">Store Ref</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="py-2 px-4 border-b border-gray-200 capitalize">{data[1].DB_ACCOUNTCODE}</td>
      <td className="py-2 px-4 border-b border-gray-200 capitalize">{data[1].DB_CONTACT} {data[1].DB_NAME}</td>
      <td className="py-2 px-4 border-b border-gray-200 capitalize">{data[1].DB_EMAILADDRESS}</td>
      <td className="py-2 px-4 border-b border-gray-200 capitalize">{data[1].DB_MOBILE}</td>
      <td className="py-2 px-4 border-b border-gray-200 capitalize">{data[1].DB_LOYALTY_POINTS}</td>
      <td className="py-2 px-4 border-b border-gray-200 capitalize">{data[1].DB_USERFIELD1}</td>
    </tr>
  </tbody>
</table>
  </div>;
}

