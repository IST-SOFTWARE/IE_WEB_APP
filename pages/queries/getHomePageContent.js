import fetchData from "../helpers/fetchData"

export const getHomePageContent = async() => {

    const data = await fetchData(
        `
            HomePage_Main{
                Title
            }
        `,
        {
            variables: {}
        }
    )

    return data;

}