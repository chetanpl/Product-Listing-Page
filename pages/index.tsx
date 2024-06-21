import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import Product from '../types/product-type'
import Pagination from '../pages/component/pagination'
import getProductList from '../service/api-service'
import apiurl from '../libs/api'
import styles from '../styles/product.module.css'

type Props = {
  initialProducts: Product[];
  errorStatusCode: string;
  errorMessage: string;
};

const Home: React.FC<Props> = ({ initialProducts, errorStatusCode, errorMessage }): JSX.Element => {
  const [Products] = useState<Product[]>(initialProducts);
  const [searchVal, setSearchVal] = useState<string>('');
  //handling pagination states and veribles start
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Products.slice(indexOfFirstPost, indexOfLastPost);
  //end pagination states and variables
  const isFilterHasRecord = currentPosts.filter((line: Product) => line.title.includes(searchVal));
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const searchQuery = event.target.value.toString();
    setSearchVal(searchQuery);
  };
  // render one card of the product
  const ProductCards = ({ product }: { product: Product }): JSX.Element => {
    return (<li data-testid="productid" className={styles.product_item} key={product.id}>
      <>
        <Link className={styles.product_image} href={`/details/${product.id}`}> <Image src={product.image} width={500} height={250} alt={product.title} style={{ width: '100%' }} /></Link>
        <h2 data-testid="productName" className={styles.product_name}>{product.title}</h2>
        <p className={styles.product_price}><Link href={`/details/${product.id}`}> ${product.price}</Link></p>
        <p className={styles.product_description}>{product.description}</p>
      </>
    </li>)
  }
  return (
    <>
      <header>
        <title>Product Page</title>
        <h1 className={styles.title} data-testid="title">Choose Your Life Style</h1>
      </header>
      <div className={styles.container}>
        {errorStatusCode && <h3 className={styles.inputContainer}>{errorMessage}</h3> || <><div className={styles.inputContainer}>
          <input data-testid="seachInputCtrl" type='text' aria-label="Please search product name and it should be case sensitive" placeholder='Please search product name and it should be case sensitive :-' className={styles.input} onChange={handleSearch} id='filter' />
        </div>
          <section>
            <ul className={styles.product_list}>
              {isFilterHasRecord.map((product: Product) => (
                <ProductCards product={product} />
              ))}
              {isFilterHasRecord.length <= 0 && <h2 className={styles.noRecordsFound}>&#128542;Out of Stock.</h2>}
            </ul>
          </section>
          {isFilterHasRecord.length > 0 && <footer id='Pagination'>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={Products.length - 1}
              pageNumber={setCurrentPage}
            />
          </footer>
          }
        </>
        }
      </div >
    </>
  );
};
// help to produce products data at server side of memeory
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const initialProducts = await getProductList<Promise<Product[]>>(`${apiurl.BASE_URL}/products`);
    return { props: { initialProducts } };
  }
  catch (error) {
    const initialProducts: Product[] = [];
    return { props: { initialProducts, errorStatusCode: 404, errorMessage: 'Sorry! Something Went Wrong try after sometime!' } };
  }
};
export default Home;