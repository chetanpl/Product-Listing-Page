import React, { useState } from 'react';
import pageStyle from '../../styles/pagination.module.css'
interface paginationProps {
  postsPerPage: number;
  totalPosts: number;
  pageNumber: (value: number) => void
};
const Pagination = ({ postsPerPage, totalPosts, pageNumber }: paginationProps):JSX.Element => {
  const pageNumbers:number[] = [];
  const [activeClass, setActiveClass] = useState(1);

  //It helps to highlight the selected page button. 
  const selectedPagenumber = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const currentNumber = parseInt((event.target as HTMLInputElement).value);
    pageNumber(currentNumber);
    setActiveClass(currentNumber);
  }
// It arranges pagination according to total products, and per page  visible items
  const arrangePagination = (): void => {
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  }
  arrangePagination();
  return (
    <nav>
      <ul className={pageStyle.pagination}>
        {pageNumbers.map((number: number) => (
          <li key={number} className={pageStyle.page_item}>
            <button data-testid={`pageNumber${number}`} aria-label={`Page number is ${number}`}
              key={number} value={number}
              className={`${number === activeClass ? pageStyle.active : pageStyle.normal}`}
              onClick={selectedPagenumber}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;