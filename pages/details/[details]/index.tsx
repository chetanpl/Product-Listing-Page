import Image from 'next/image';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { useRouter } from 'next/navigation'
import  Product  from '../../../types/product-type'
import apiurl from '../../../libs/api'
import styles from '../../../styles/productdetails.module.css'
import getProductList from '@/service/api-service';

// help to produce products data at server side of memeory
export const getServerSideProps = (async ({ query }: { query: any }) => {
try{
  const Product: Product = await getProductList<Promise<Product>>(`${apiurl.BASE_URL}/products/${query.details}`)
  return { props: { Product } }
}
catch(error){
    const Product: Product =
      {
        id: 0,
        title: '',
        price: 0,
        description: '',
        image: ''
      }
    return { props: { Product ,errorStatusCode: 404, errorMessage: 'Sorry! Something Went Wrong try after sometime!' } };
}
})

export default function Details({
  Product,errorStatusCode,errorMessage
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  debugger;
  const router = useRouter();

  const goBack = (): void => {
    router.back();
  }
  return (<>
      <><title>Product Details</title>
    <section className={styles.box}>
    {errorStatusCode && <h3 className={styles.product_container}>{errorMessage}</h3> ||
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
}
    </section>
    </>
  </>
  );
}
