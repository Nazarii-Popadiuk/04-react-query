import ReactPaginate from "react-paginate";
import styles from "./../App/App.module.css"

interface PaginationProps {
    pageCount: number,
    forcePage: number,
    onPageChange: ({ selected }: { selected: number }) => void;
}


export default function Pagination({ pageCount, forcePage, onPageChange }: PaginationProps) {
    if (pageCount <= 1) return null;

    return (
        <ReactPaginate
            pageCount={pageCount}
pageRangeDisplayed={5}
marginPagesDisplayed={1}
onPageChange={onPageChange}
forcePage={forcePage}
containerClassName={styles.pagination}
            activeClassName={styles.active}
            renderOnZeroPageCount={null}
nextLabel="→"
previousLabel="←"
/>
    )
}
