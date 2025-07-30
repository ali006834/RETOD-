import {
	IkasImage,
	IkasCategoryList,
	IkasNavigationLink,
} from "@ikas/storefront"

export type ScrollingTexts = { 
	content?: string;
};

export type HeaderProps = {
	logo?: IkasImage;
	logo_black?: IkasImage;
	staticCategoryMenu?: IkasCategoryList;
	categoryMenu?: IkasCategoryList;
	special_for_your?: IkasNavigationLink;
	scrollingTexts?: ScrollingTexts[];
};

