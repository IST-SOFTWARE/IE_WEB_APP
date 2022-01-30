import styles from "../../styles/Header.module.css"


const Search = () => {
    return(
        <>
            <div className={styles.search_block}>
                <input type="text" placeholder="Ищем что-то?" className={styles.search}/>
                <button className={styles.sBtn}>
                    <img src="./sBtn.png" alt="Search" width="28px"/>
                </button>
            </div>
        </>
    )
}
export default Search;