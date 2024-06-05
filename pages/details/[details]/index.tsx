import Image from 'next/image';
import styles from '../../../styles/productdetails.module.css'
import { Product } from '../../../types/product-type'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

export const getServerSideProps = (async ({ query }: { query: any }) => {
    const res = await fetch(`https://fakestoreapi.com/products/${query.details}`)
    const Product: Product = await res.json()
    return { props: { Product } }
  })
  export default function Details({
    Product
  }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <div className={styles.product_container}>
        <div className={styles.product_imgbox}>
        <Image src={Product.image} width={200} height={250} alt={Product.title} />
        </div>
      <h1 className={styles.title}>{Product.title} </h1>
        <p className={styles.product_p}> <label className={styles.product_label}>Price:</label> {Product?.price}</p>
        <p className={styles.product_p}> <label className={styles.productdetails}>Product Desciption:</label> {Product?.description}</p>
      </div >
    </div>
  );
};
