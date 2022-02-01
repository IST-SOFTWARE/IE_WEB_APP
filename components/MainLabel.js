export default function({children, padding}){
    return(
        <>
            <div className="MainLabel" style={{marginTop: padding}}>
                <h1>{children}</h1>
            </div>

        </>
    )
}
