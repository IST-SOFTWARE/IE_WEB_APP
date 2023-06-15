import { ReactNode } from "react";

type IModalMobilePage_header_routingBack = "routingBack_MMHeaderType";
type IModalMobilePage_header_hiding = "hiding_MMHeader_type";

type IModalMobilePage_header = {
  title: string;
  type: IModalMobilePage_header_hiding | IModalMobilePage_header_routingBack;
  arrowHandler: (...props: any) => any;
}

export interface IModalMobilePage{
  children: ReactNode;
  header: IModalMobilePage_header;
}