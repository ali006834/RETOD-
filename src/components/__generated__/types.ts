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
	staticCategoryMenu?: IkasCategoryList;
	categoryMenu?: IkasCategoryList;
	scrollingTexts?: ScrollingTexts[];
};

