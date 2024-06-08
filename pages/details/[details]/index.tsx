import Image from 'next/image';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { useRouter } from 'next/navigation'
import  Product  from '../../../types/product-type'
import apiurl from '../../../libs/api'
import styles from '../../../styles/productdetails.module.css'
import getProductList from '@/service/api-service';

// help to produce products data at server side of memeory
export const getServerSideProps = (async ({ query }: { query: any }) => {
  const Product: Product = await getProductList<Promise<Product>>(`${apiurl.BASE_URL}/products/${query.details}`)
  return { props: { Product } }
})

export default function Details({
  Product
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const router = useRouter();

  const goBack = (): void => {
    router.back();
  }
  return (<>
    <title>Product Details</title>
    <section className={styles.box}>
      <div className={styles.product_container}>
        <div className={styles.product_imgbox}>
          <Image src={Product.image} width={200} height={250} alt={Product.title} />
        </div>
        <div>
          <button aria-label="click me to go back to product" className={styles.backBtn} onClick={goBack}>Go back &laquo; &#8617; </button></div>
        <h1 className={styles.title}>{Product.title} </h1>
        <p> <label className={styles.product_label}>Price:</label> <label>${Product?.price}</label></p>
        <p> <label className={styles.productdetails}>Product Desciption:</label> <label className={styles.fontStyle}>{Product?.description}</label></p>
      </div>
    </section>
  </>
  );
};
