This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This app is for search Products and have navigation feature to look more products. Every product has specific details page where user could get more desire information. 

Technically: This app is developed in module based css and html, SSR feature makes it more faster as the details page is being render on server side. 
The api returns 20 records and It has been set to show 4 records on each page. Global product of search box has feature to search products by their name or title and filter only current page products tiles only. Also, It has error handling feature in case of API gets down. This page shows the error. 

Product Page: 

<img width="890" alt="image" src="https://github.com/chetanpl/Product-Listing-Page/assets/16497813/d653439e-85ba-4ac9-9b35-7cf665a3ad89">


Product Details Page

<img width="928" alt="image" src="https://github.com/chetanpl/Product-Listing-Page/assets/16497813/0df73d4f-d982-46ea-a66f-00273a50797f">

Cypress Automation feature added. 
Run : npx cypress open

Automation passed with following paramters. 
1. Match the page title and color.
2. Automation auto enter product name and match with search result.
3. Automation auto click page number and match it with active page. 
![Uploading image.png…]()



