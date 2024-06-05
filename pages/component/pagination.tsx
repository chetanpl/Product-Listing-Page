import React, { useState } from 'react';
import Pagstyle from '../../styles/pagination.module.css'
interface paginationProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: (value: number) => void
};

const Pagination = ({ postsPerPage, totalPosts, paginate }: paginationProps) => {
  debugger;
  const pageNumbers = [];
  const [activeClass, setActiveClass] = useState(1);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className={Pagstyle.pagination}>
        {pageNumbers.map((number: number) => (
          <li key={number} className={Pagstyle.page_item}>
            <button
              key={number}
              className={`${number === activeClass ? Pagstyle.active : Pagstyle.normal}`}
              onClick={() => { paginate(number); setActiveClass(number) }}
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