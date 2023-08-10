import { FC } from 'react'
import styles from "./LoaderModal.module.scss"

const LoaderModal: FC = () => {
  return(
    <>
      <div className={styles.loader_container}>
        <div className={styles.loader_block}>
          Loading...
        </div>
      </div>
    </>
  )
}

export default LoaderModal; 