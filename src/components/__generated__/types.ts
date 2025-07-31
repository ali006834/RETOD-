import {
	IkasImage,
	IkasNavigationLink,
	IkasVideo,
	IkasCategoryList,
	IkasProductList,
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

export type SlidingSlider = { 
	imageSlider?: IkasImage;
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

export type FeaturedProductShowcaseProps = {
	products?: IkasProductList;
	headerText?: string;
	titleText?: string;
	contentText?: string;
	btnText?: string;
	btnLink?: IkasNavigationLink;
};

export type BannerSlidingSliderProps = {
	imageSliders?: SlidingSlider[];
	titleBanner?: string;
	lowerTitle?: string;
	lowerContent?: string;
	lowerBtnText?: string;
	lowerBtnLink?: IkasNavigationLink;
};

export type BannerThinProps = {
	banner_center?: IkasImage;
	banner_cente_mobile?: IkasImage;
	banner_center_link?: IkasNavigationLink;
};

