import { useQuery, gql } from '@apollo/client';

type language = {
    code: string
}

type label = {
    main_label: string,
    page_type: string,
    subtitle: string,
    languages_id: language
}

type galleryItem = {
    gallery_title: string,
    gallery_image: string,
    gallery_action: string,
}

type galleryContentItem = {
    gallery_items: Array<galleryItem>
}

type galleryContent = {
    gallery_content: Array<galleryContentItem>
}

type background_item = {
    Image_URL: string
}

type backgroundPage = {
    fill_state: number
    back_images: Array<background_item>
}

// LandingPagesData

export interface IPageOfLanding{
    page_identifier: string
    landing_label: Array<label>
    gallery: galleryContent
    background: backgroundPage
}

export interface ILandingPage{
    landing_page: Array<IPageOfLanding>
}

export const GET_LANDING_PAGE_CONTENT = gql`
query getLandingPages($lang: String){
  landing_page{
    page_identifier
    landing_label(filter: {
        languages_id:{
            code: {
                _eq: $lang
            }
        }
    }){
      main_label,
      page_type,
      subtitle,
      languages_id{
          code
      }
    }
    gallery{
        gallery_content
            (filter: {
                languages_code:{code: {_eq: $lang}}}
            ){
            gallery_items
        }
    }
    background{
        fill_state,
        back_images
    }
  }
}

`
