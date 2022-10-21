export const getOurPartners = `
        query GetPartners{
            OurPartnersPage{
                Title_Ru,
                Title,
                partners_list{
                    Partners_id{
                        title,
                        image_url,
                        partner_url
                    }
                }
            }
        }
`


