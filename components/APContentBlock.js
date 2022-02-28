import styles from "../styles/AttachPage.module.css"

export default function ATContentBlock({StepNum, children}){
    return(
        <>
            <div className={styles.APB}>
                <div className={styles.APBConteiner}>
                        <div className={styles.APBHeaderNum}>
                            {StepNum}
                        </div>

                    <div className={styles.APBContent}>
                        {children}
                    </div>

                </div>
            </div>
        </>
    )
}