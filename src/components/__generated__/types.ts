import {
	IkasImage,
	IkasCategoryList,
} from "@ikas/storefront"

export type ScrollingTexts = { 
	content?: string;
};

export type HeaderProps = {
	logo?: IkasImage;
	logo_black?: IkasImage;
	categoryMenu?: IkasCategoryList;
	scrollingTexts?: ScrollingTexts[];
};

