'use client'
import { useEffect, useState } from 'react';
import { getProducts } from '../service/api-service';
import { Product } from '../types/product-type'
import Link from 'next/link';
import styles from '../styles/product.module.css'
import Image from 'next/image';
import pagestyles from '../styles/pagination.module.css'
import Pagination from '../pages/component/pagination'

const Home = () => {
  const [Products, setUsers] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchVal, setSearchVal] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Products.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getProducts('https://fakestoreapi.com/products');
        setUsers(usersData);
      } catch (error) {
        console.error('something went wrong', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  const filter = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = { ...e.target };
    setSearchVal(value);
  }
  return (
    <>
      <h1 className={styles.title}>Choose Your Life Style</h1>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <input type='text' placeholder='Please search product name and it should be case sensitive :-' className={styles.input} onChange={filter} id='filter' />
        </div>
        <ul className={styles.product_list}>
          {currentPosts.filter((line: Product) => line.title.includes(searchVal)).map((product: Product) => (
            <li className={styles.product_item} key={product.id}>
              <>
                <Link className={styles.product_image} href={`/details/${product.id}`}> <Image  src={product.image} width={500} height={250} alt={product.title} style={{ width: '100%' }} /></Link>
                <h2 className={styles.product_name}>{product.title}</h2>
                <p className={styles.product_price}><Link href={`/details/${product.id}`}> ${product.price}</Link></p>
                <p className={styles.product_description}>{product.description}</p>
              </>
            </li>
          ))}
        </ul>
        <div className={pagestyles.pagination} id='Pagination'>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={Products.length-1}
            paginate={setCurrentPage}
          />
        </div>
      </div >
    </>
  );
};

export default Home;