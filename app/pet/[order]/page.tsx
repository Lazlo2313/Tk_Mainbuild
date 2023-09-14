'use client'
import React, { useState, useEffect } from 'react';
import getOrder from '../../lib/getPetSku';
import updateStatus from '../../lib/updateStatus';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Params = {
  params: {
    order: string;
    shipping_lines: {
      id: number;
      meta_data: {
        id: number;
        key: string;
        value: string;
      }[];
    }[];

  };
};

export default function OrderDetail({ params: { order } }: Params) {
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [status, setStatus] = useState<string>('');
  const router = useRouter();

  const handleUpdateStatus = async () => {
    const updatedOrderDetails = await updateStatus(order, 'ready-for-pickup');
    setStatus(updatedOrderDetails.status);
    router.push('/woo/ready');
  };

  const handleUpdateStatusPicked = async () => {
    const updatedOrderDetailsPicked = await updateStatus(order, 'stock-in-transit');
    setStatus(updatedOrderDetailsPicked.status);
    router.push('/collect/packed');
  };

  const handleUpdateStatusPacked = async () => {
    const updatedOrderDetailsPacked = await updateStatus(order, 'order-being-packe');
    setStatus(updatedOrderDetailsPacked.status);
    router.push('/collect/shipped');
  };
  const handleUpdateStatusShipped = async () => {
    const updatedOrderDetailsShipped = await updateStatus(order, 'shipped-order');
    setStatus(updatedOrderDetailsShipped.status);
    router.push('/collect/shipped');
  };

  const handleStatusChange = async (newStatus) => {
    switch (newStatus) {
      case "stock-in-transit":
        await handleUpdateStatusPicked();
        break;
        case "order-being-packe":
          await handleUpdateStatusPacked();
          break;
      case "shipped-order":
        await handleUpdateStatusShipped();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const orderDetails = await getOrder(order);
      setOrderDetails(orderDetails);
      setStatus(orderDetails.status.replace('-', ''));
    };
    fetchOrderDetails();
  }, [order]);
  


  if (!orderDetails) {
    return <div className='container mx-auto'>Fetching data</div>;
  }

  
  return (
    <>
      <div>
        {orderDetails ? (
          <section className="py-5">
            <div className="max-w-5xl mx-auto bg-white">
              <article className="overflow-hidden">
                <div className="bg-[white] rounded-b-md">
                  <div>
                    <div className="text-slate-700">
                      <p className="text-xl font-extrabold tracking-tight uppercase font-body">
                        TK Orders
                      </p>
                      <p className='capitalize'>Order Status: {orderDetails.status}</p>
                    </div>
                     {/* Dropdown for order status */}
                  <div className="mt-4">
                    <label className="text-tkgray font-semibold">Update Order Status:</label>
                    <select
                      className="bg-white border border-gray-300 text-tkgray rounded p-2 m-2"
                      onChange={(e) => handleStatusChange(e.target.value)}
                      value={status}
                    >
                      <option value="stock-in-transit">Order Picked</option>
                      <option value="order-being-packe">Order Packed</option>
                      <option value="shipped-order">Shipped</option>
                    </select>
                    </div>
                  </div>
                  <div className='pt-9'>
                    <div>
                      <div className="grid grid-cols-3">
                        <div className="text-base font-light text-tkgray">
                          <p className="text-lg text-tkgray font-bold">Invoice Detail:</p>
                          <p className='capitalize'>{orderDetails.billing.first_name} {orderDetails.billing.last_name}</p>
                          <p>{orderDetails.billing.address_1}</p>
                          <p>{orderDetails.billing.city}</p>
                          <p>{orderDetails.billing.postcode}</p>
                          <p>{orderDetails.billing.phone}</p>
                          <p>{orderDetails.billing.email}</p>
                          
                        </div>
                        <div className="text-base font-light text-tkgray">
                          <p className="text-lg text-tkgray font-bold">Invoice Number</p>
                          <p>{orderDetails.id}</p>
                          <p className="mt-2 text-lg text-tkgray font-bold">Date of Issue</p>
                          <p>{orderDetails.date_created}</p>
                          <p className="mt-2 text-lg text-tkgray font-bold">Payment Method</p> 
                          <p>{orderDetails.payment_method}</p>
                          
                        </div>
                      </div>
                      <p className="mt-2 text-lg text-tkgray font-bold">Customer Note</p> 
                          <p>{orderDetails.customer_note}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col mx-0 mt-8">
                      <table className="min-w-full divide-y divide-slate-500">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-base font-normal text-tkgray sm:pl-6 md:pl-0"
                            >
                              Image
                            </th>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-base font-normal text-tkgray sm:pl-6 md:pl-0"
                            >
                              Description
                            </th>
                            <th
                              scope="col"
                              className="hidden py-3.5 px-3 text-right text-base font-normal text-tkgray sm:table-cell"
                            >
                              Quantity
                            </th>
                            <th
                              scope="col"
                              className="hidden py-3.5 px-3 text-right text-base font-normal text-tkgray sm:table-cell"
                            >
                              Rate
                            </th>
                            <th
                              scope="col"
                              className="py-3.5 pl-3 pr-4 text-right text-base font-normal text-tkgray sm:pr-6 md:pr-0"
                            >
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderDetails.line_items.map((item:any) => (
                            <tr key={item.id} className="border-b border-slate-200">
                              <td>
                                <div>
                                  <Link href={item.image.src}><img src={item.image.src} alt='product' width={150} height={100}/></Link>
                                </div>
                              </td>
                              <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                                <div className="font-medium text-slate-700">
                                  {item.name}
                                  <p className='text-sm text-gray-500'>SKU: {item.sku}</p>
                                </div>
                                <div className="mt-0.5 text-slate-500 sm:hidden">
                                  {item.quantity} unit{item.quantity > 1 ? 's' : ''} at R{item.price}
                                </div>
                              </td>
                              <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                                {item.quantity}
                              </td>
                              <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                                R{item.subtotal}
                              </td>
                              <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                R{item.subtotal}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className='w-full flex justify-end mt-2'>
                        <p className='text-base text-red-700'>Discount: R{orderDetails.discount_total}</p>
                      </div>
                      <div className='w-full flex justify-end mb-10'>
                        <p className='text-xl font-bold text-tkgray'>Total: R{orderDetails.total}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>
                      <div className="text-sm font-light text-slate-700 mt-15">
                        <p>
                          Payment terms are 14 days. Please be aware that according to the Late Payment of Unwrapped
                          Debts Act 0000, freelancers are entitled to claim a 00.00 late fee upon non-payment of debts
                          after this time, at which point a new invoice will be submitted with the addition of this fee.
                          If payment of the revised invoice is not received within a further 14 days, additional interest
                          will be charged to the overdue account and a statutory rate of 8% plus Bank of England base of
                          0.5%, totaling 8.5%. Parties cannot contract out of the Act’s provisions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>


            <div className="flex justify-center mt-8">
              
                <Link className='bg-tkgreen hover:bg-tkgray text-white font-bold py-2 px-4 rounded m-2' href="/woo/orders">
                  Dashboard
                </Link>
    
            </div>
          </section>
        ) : (
          <div className='container'>Loading...</div>
        )}
      </div>
    </>
  );
}
