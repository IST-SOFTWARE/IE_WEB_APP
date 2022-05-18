import fetchData from "../helpers/fetchData"
export const getHomePageContent = async() => {

    const data = await fetchData(
        `
        query HomePageData{
            HomePage_Main{
                Title
                Title_RU
                TagLine
            }
        }
        `,
        {
            variables: {}
        }
    )
    

    return data.data.HomePage_Main;
}
