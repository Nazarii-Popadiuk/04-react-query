import styles from "./SearchBar.module.css";
import toast from "react-hot-toast";

export interface SearchProps {
    onSubmit: (query: string) => void;
}
export default function SearchBar({ onSubmit }: SearchProps) {
  const handleSubmit = async (formData: FormData) => {
    const query = formData.get("query")?.toString().trim();
    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }
    onSubmit(query);
  };
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
              <form className={styles.form}
                  action={async (formData: FormData) => {
                      await handleSubmit(formData);
                      const input = document.querySelector<HTMLInputElement>('input[name="query"]')
                      if (input) input.value = '';
              }}
              >
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
                  <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
