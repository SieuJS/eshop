import * as React from 'react';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
});

export default function Pagination(props) {
    const count = props.count;
    const onChange = props.onChange;
    const page = props.page;

  const { items } = usePagination({
    count: count,
    onChange: onChange,
    page: page
  });

  return (
    <nav >
      <ul class="pagination justify-content-center mb-3">
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;
          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '…';
          } else if (type === 'page') {
            children = (
              <button
                type="button"
                className={`page-link`}
                
                {...item}
              >
                {page}
              </button>
            );
          } else {
            if (type == 'previous') {
                children = (
                  <button className='page-link' type="button" {...item}>
                    <span aria-hidden="true">«</span>
                    <span className="sr-only">Previous</span>
                  </button>
                );
            }
            else {
                children = (
                    <button className='page-link' type="button" {...item}>
                      <span aria-hidden="true">»</span>
                      <span className="sr-only">Next</span>
                    </button>
                );
            }
          }

          return <li className={`page-item ${selected ? 'active': ''}`} key={index}>{children}</li>;
        })}
      </ul>
    </nav>
  );
}