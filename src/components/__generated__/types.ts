import {
	IkasImage,
	IkasNavigationLink,
	IkasVideo,
	IkasCategoryList,
	IkasProductList,
	IkasProduct,
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

export type ShoppingPolicies = { 
	iconSP?: string;
	contentSP?: string;
};

export type SocialMedia = { 
	icon_SM?: string;
	isExternal_SM?: boolean;
	link_SM?: IkasNavigationLink;
};

export type InstallmentContent = { 
	rate?: string;
};

export type TableTitles = { 
	table_Header_1?: string;
	table_Header_2?: string;
	table_Header_3?: string;
};

export type InterestRates = { 
	interestRate_1_2?: string;
	interestRate_3_6?: string;
	interestRate_7_12?: string;
};

export type Row = { 
	installmentContent?: InstallmentContent;
};

export type AddBank = { 
	logo?: IkasImage;
	interestRates?: InterestRates;
	content?: Row;
};

export type MainTable = { 
	enterTitles?: TableTitles;
	enterLogoAndPropotions?: AddBank;
};

export type FooterLower = { 
	title?: string;
	content?: string;
	btnText?: string;
	btnLink?: IkasNavigationLink;
	qrTitle?: string;
	qrImage?: IkasImage;
	qrContent?: string;
	acceptedCardsTitle?: string;
	acceptedCardsImages?: AcceptedCards;
};

export type AcceptedCards = { 
	acceptedCardsImage?: string;
};

export type FooterTop = { 
	title?: string;
	content?: string;
	langTitle?: string;
};

export type HeaderProps = {
	logo?: IkasImage;
	logo_black?: IkasImage;
	staticCategoryMenu?: IkasCategoryList;
	categoryMenu?: IkasCategoryList;
	searchRecomProducts?: IkasProductList;
	special_for_your?: IkasNavigationLink;
	scrollingTexts?: ScrollingTexts[];
	cartProducts?: IkasProductList;
	title?: string;
};

export type FooterProps = {
	logo?: IkasImage;
	shoppingPolicies?: ShoppingPolicies[];
	socialMediaList?: SocialMedia[];
	supportLinks?: IkasNavigationLink[];
	legalLinks?: IkasNavigationLink[];
	footerLower?: FooterLower;
	footerUpperTop?: FooterTop;
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

export type ProductListProps = {
	categories?: IkasCategoryList;
	productList?: IkasProductList;
};

export type ProductDetailProps = {
	product?: IkasProduct;
	deliveryDescription?: string;
	deliveryDescriptionLink?: IkasNavigationLink;
	bankTable?: MainTable[];
};

export type BottomScrollingTextProps = {
	scrollingTexts?: ScrollingTexts[];
};

export type BannerTextsProps = {
	headerText?: string;
	contentText?: string;
	btnText?: string;
	navigationLink?: IkasNavigationLink;
};

