import ReactPaginate from "react-paginate";
import styles from "./../App/App.module.css"

interface PaginationProps {
    totalPages: number,
    page: number,
    setPage: (page: number) => void;
}


export default function Pagination({ totalPages, page, setPage }: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <ReactPaginate
            pageCount={totalPages}
pageRangeDisplayed={5}
marginPagesDisplayed={1}
onPageChange={({ selected }) => setPage(selected + 1)}
forcePage={page - 1}
containerClassName={styles.pagination}
activeClassName={styles.active}
nextLabel="→"
previousLabel="←"
/>
    )
}
