async function updateStatus(order: string, newStatus: string): Promise<any> {
    try {
      const response = await fetch(`https://www.toykingdom.co.za/wp-json/wc/v3/orders/${order}`, {
        method: 'PUT',
        headers: {
          Authorization: 'Basic ' + btoa('ck_093d5ae77c9855cc63de9c71919817c5508a34df:cs_41a421266ab3859d3c644951894f7f4b4a420a7a'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
  
      if (!response.ok) {
        const { status, statusText } = response;
        throw new Error(`Failed to update status. Status: ${status} ${statusText}`);
      }
  
      const updatedOrderDetails = await response.json();
      return updatedOrderDetails;
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  }
  
  export default updateStatus;
  