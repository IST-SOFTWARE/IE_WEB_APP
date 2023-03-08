import {IPageOfLanding} from "../../queries/landingPage";

type gallerySlide = {
    image: string,
    title: string,
    list_num: number,
    action?: string | null,
}

export interface IGallery{
    slides: Array<gallerySlide>
}

const getGallery = (page: IPageOfLanding):IGallery =>{
    const galleryCont = page.gallery.gallery_content[0];
    const galleryOut:IGallery = {
        slides: new Array<gallerySlide>()
    };
    if(galleryCont){
        galleryCont.gallery_items.map((gal_item, gal_index)=>{
            const newGalItem:gallerySlide = {
                image: gal_item.gallery_image,
                title: gal_item.gallery_title,
                list_num: gal_index,
                action: gal_item.gallery_action
            }
            galleryOut.slides.push(newGalItem);
        })
    }
    return galleryOut;
}

export default getGallery;