import fetchData from "../helpers/fetchData"
export const getHomePageContent = async() => {

    const data = await fetchData(
        `
        query HomePageData{
            HomePage_Main{
                Title
                Title_RU
            }
        }
        `,
        {
            variables: {}
        }
    )
    

    return data ? data.data.HomePage_Main : null;
}
