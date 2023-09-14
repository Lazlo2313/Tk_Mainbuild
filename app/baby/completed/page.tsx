'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { UserAuth } from '../../context/AuthContext';
import Spinner from '../../components/Spinner';
import getAllOrders from '../../lib/getBabyCompleted';
import SearchBar from '../../components/Searchbar';

interface Product {
  id: number;
  number: string;
  billing: {
    first_name: string;
    last_name: string;
  };
  status: string;
  total: number;

}

const Packed = () => {
  const { user, loading } = UserAuth();
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage: number = 20;

  const fetchData = async (): Promise<Product[]> => {
    const products: Product[] = await getAllOrders();
    console.log(products);
    return products;
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  useEffect(() => {
    const fetchDataAndSetProducts = async () => {
      const fetchedProducts = await fetchData();
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    };
    fetchDataAndSetProducts();
  }, []);

  const totalPages: number = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (searchTerm: string): void => {
    const filtered = products.filter((product: Product) => {
      const fullName = `${product.billing.first_name} ${product.billing.last_name}`;
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      return (
        product.number.toLowerCase().includes(lowercaseSearchTerm) ||
        fullName.toLowerCase().includes(lowercaseSearchTerm)
      );
    });
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleReset = (): void => {
    setFilteredProducts(products);
    setCurrentPage(1);
  };

  const renderPagination = () => {
    const pageNumbers: JSX.Element[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={`inline-block mx-1 ${currentPage === i ? 'font-bold' : ''}`}>
          <button onClick={() => handlePageChange(i)}>{i}</button>
        </li>
      );
    }
    return <ul className="flex justify-center mt-4">{pageNumbers}</ul>;
  };

  const indexOfLastProduct: number = currentPage * productsPerPage;
  const indexOfFirstProduct: number = indexOfLastProduct - productsPerPage;
  const currentProducts: Product[] = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  if (isLoading || loading) {
    return <Spinner />;
  }

  if (!user) {
    return <p className='container'>You must be logged in to view this page.</p>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">Orders Completed</h1>
      <p>Here's what's happening with your store today.</p>
      <SearchBar onSearch={handleSearch} onReset={handleReset} />
      <table className="container mx-auto bg-white">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="py-2 px-4 border-b border-gray-200">Reference</th>
            <th className="py-2 px-4 border-b border-gray-200">Customer</th>
            <th className="hidden md:table-cell py-2 px-4 border-b border-gray-200">Status</th>
            <th className="hidden md:table-cell py-2 px-4 border-b border-gray-200">Total</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product: Product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b border-gray-200 underline underline-offset-4 hover:text-green-700 text-bold">
                <Link href={`/baby/${product.id}`}>{product.number}</Link>
              </td>
              <td className="py-2 px-4 border-b border-gray-200 capitalize">
                {product.billing.first_name} {product.billing.last_name}
              </td>
              <td className="hidden md:table-cell py-2 px-4 border-b border-gray-200 capitalize">
                Orders Picked
              </td>
              <td className="hidden md:table-cell py-2 px-4 border-b border-gray-200">R {product.total}</td>

            </tr>
          ))}
        </tbody>
      </table>
      {renderPagination()}
    </div>
  );
};

export default Packed;
