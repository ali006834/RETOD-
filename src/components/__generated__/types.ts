import {
	IkasImage,
	IkasNavigationLink,
	IkasVideo,
	IkasCategoryList,
} from "@ikas/storefront"

export type ScrollingTexts = { 
	content?: string;
};

export type BannerTopImage = { 
	imageCDT?: IkasImage;
	imageLink?: IkasNavigationLink;
	priorityOrder?: string;
};

export type BannerTopVideo = { 
	videoCDT?: IkasVideo;
	videoLink?: IkasNavigationLink;
	priorityOrder?: string;
};

export type HeaderProps = {
	logo?: IkasImage;
	logo_black?: IkasImage;
	staticCategoryMenu?: IkasCategoryList;
	categoryMenu?: IkasCategoryList;
	special_for_your?: IkasNavigationLink;
	scrollingTexts?: ScrollingTexts[];
};

export type BannerTopSliderProps = {
	videoList?: BannerTopVideo[];
	videoListMobile?: BannerTopVideo[];
	imageList?: BannerTopImage[];
	imageListMobile?: BannerTopImage[];
};

export type BannerSingleProps = {
	imageWeb?: IkasImage;
	imageMobil?: IkasImage;
	headerText?: string;
	contentText?: string;
	btnText?: string;
	navigationLink?: IkasNavigationLink;
};

export type BannerTrioProps = {
	banner_left?: IkasImage;
	banner_left_link?: IkasNavigationLink;
	banner_right?: IkasVideo;
	banner_right_link?: IkasNavigationLink;
	banner_bg_color?: string;
	banner_center_link?: IkasNavigationLink;
	bannerCenterText?: string;
	bannerCenterTextColor?: string;
	bannerCenterContent?: string;
	bannerCenterContentColor?: string;
	bannerCenterButtonText?: string;
	bannerCenterButtonTextColor?: string;
};

