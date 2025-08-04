import {
	IkasImage,
	IkasNavigationLink,
	IkasVideo,
	IkasProductList,
	IkasCategoryList,
	IkasProduct,
	IkasBlogList,
	IkasBlog,
} from "@ikas/storefront"

export type ScrollingTexts = { 
	content?: string;
};

export type BannerTopImage = { 
	imageCDT?: IkasImage;
	imageLink?: IkasNavigationLink;
	titleCDT?: string;
	contentCDT?: string;
	btnTextCDT?: string;
	priorityOrder?: string;
};

export type BannerTopVideo = { 
	videoCDT?: IkasVideo;
	videoLink?: IkasNavigationLink;
	titleCDT?: string;
	contentCDT?: string;
	btnTextCDT?: string;
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

export type CategorNames = { 
	category_name?: string;
};

export type DiscountBannerCategoryNames = { 
	cat_names?: CategorNames;
	header_text?: string;
	header_color?: string;
	content_text?: string;
	content_color?: string;
	bg_color?: string;
	isColorEffectEnabled?: boolean;
	isTextEffectEnabled?: boolean;
};

export type DeliveryContent = { 
	question?: string;
	answer?: string;
};

export type Campaigns = { 
	isActive?: boolean;
	campaignTitle?: string;
	campaignDate?: string;
	campaignDescription?: string;
	campaignImage?: IkasImage;
	campaignConditions?: string;
	btnText?: string;
	productList?: IkasProductList;
};

export type MessageSubTopic = { 
	topicName?: string;
};

export type MessageTopic = { 
	messageName?: string;
	subTopic?: MessageSubTopic;
};

export type ContactForm = { 
	name?: string;
	messageType?: MessageTopic;
};

export type WorkingHours = { 
	dayName?: string;
	checkInTime?: string;
	checkOutTime?: string;
};

export type ShoppingCentre = { 
	name?: string;
	address?: string;
	phone?: string;
	link?: string;
	workingHours?: WorkingHours;
	isAvm?: boolean;
};

export type District = { 
	districtName?: string;
	districtStores?: ShoppingCentre;
};

export type Province = { 
	provinceName?: string;
	stores?: District;
};

export type Position = { 
	positionName?: string;
};

export type CareerForm = { 
	name?: string;
	departments?: Position;
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
	categorNames?: DiscountBannerCategoryNames[];
};

export type ProductDetailProps = {
	product?: IkasProduct;
	deliveryDescription?: string;
	deliveryDescriptionLink?: IkasNavigationLink;
	bankTable?: MainTable[];
};

export type BottomScrollingTextProps = {
	scrollingTexts?: ScrollingTexts[];
	transitionPeriod?: string;
};

export type BannerTextsProps = {
	headerText?: string;
	contentText?: string;
	btnText?: string;
	navigationLink?: IkasNavigationLink;
};

export type BlogListsProps = {
	bannerTitle?: string;
	blogs?: IkasBlogList;
};

export type BlogDetailProps = {
	blog?: IkasBlog;
};

export type AlternativeProductsProps = {
	alternativeProducts?: IkasProductList;
};

export type LastSeenProductsProps = {
	lastSeenProducts?: IkasProductList;
};

export type CartProps = {
	summaryText?: string;
};

export type Page404Props = {
	image?: IkasImage;
};

export type LoginProps = {
	title?: string;
};

export type RegisterProps = {
	title?: string;
	content?: string;
	image?: IkasImage;
	title2?: string;
};

export type ForgotPasswordProps = {
	title?: string;
};

export type RecoverPasswordProps = {
	title?: string;
};

export type PageSearchProps = {
	productList?: IkasProductList;
};

export type AboutProps = {
	title?: string;
	textPicture?: string;
	imageWeb?: IkasImage;
	imageMobile?: IkasImage;
	footer_links?: IkasNavigationLink[];
	content?: string;
	titleRight?: string;
	contentRight?: string;
	btnRight?: string;
	btnRightLink?: IkasNavigationLink;
};

export type CookiePolicyProps = {
	title?: string;
	textPicture?: string;
	imageWeb?: IkasImage;
	imageMobile?: IkasImage;
	footer_links?: IkasNavigationLink[];
	content?: string;
	titleRight?: string;
	contentRight?: string;
	btnRight?: string;
	btnRightLink?: IkasNavigationLink;
};

export type PrivacyPolicyProps = {
	title?: string;
	textPicture?: string;
	imageWeb?: IkasImage;
	imageMobile?: IkasImage;
	footer_links?: IkasNavigationLink[];
	content?: string;
	titleRight?: string;
	contentRight?: string;
	btnRight?: string;
	btnRightLink?: IkasNavigationLink;
};

export type DistanceSalesAgreementProps = {
	title?: string;
	textPicture?: string;
	imageWeb?: IkasImage;
	imageMobile?: IkasImage;
	footer_links?: IkasNavigationLink[];
	content?: string;
	titleRight?: string;
	contentRight?: string;
	btnRight?: string;
	btnRightLink?: IkasNavigationLink;
};

export type FaqProps = {
	title?: string;
	textPicture?: string;
	imageWeb?: IkasImage;
	imageMobile?: IkasImage;
	footer_links?: IkasNavigationLink[];
	contents?: DeliveryContent[];
	titleRight?: string;
	contentRight?: string;
	btnRight?: string;
	btnRightLink?: IkasNavigationLink;
};

export type ReturnsAndDeliveryProps = {
	title?: string;
	textPicture?: string;
	imageWeb?: IkasImage;
	imageMobile?: IkasImage;
	footer_links?: IkasNavigationLink[];
	titleRight?: string;
	contentRight?: string;
	btnRight?: string;
	btnRightLink?: IkasNavigationLink;
	contents?: DeliveryContent[];
};

export type CampaignsProps = {
	title?: string;
	textPicture?: string;
	imageWeb?: IkasImage;
	imageMobile?: IkasImage;
	footer_links?: IkasNavigationLink[];
	campaigns?: Campaigns[];
};

export type ContactProps = {
	title?: string;
	textPicture?: string;
	imageWeb?: IkasImage;
	imageMobile?: IkasImage;
	footer_links?: IkasNavigationLink[];
	formTitle?: string;
	contactForm?: ContactForm[];
	contactInformation?: string;
	mapLink?: string;
};

export type StoresProps = {
	title?: string;
	textPicture?: string;
	imageWeb?: IkasImage;
	imageMobile?: IkasImage;
	footer_links?: IkasNavigationLink[];
	storeList?: Province[];
};

export type CareerProps = {
	title?: string;
	textPicture?: string;
	imageWeb?: IkasImage;
	imageMobile?: IkasImage;
	footer_links?: IkasNavigationLink[];
	formTitle?: string;
	careerForm?: CareerForm[];
	otherInformation?: string;
};

export type BannerSingleVideoProps = {
	videoWeb?: IkasVideo;
	videoMobile?: IkasVideo;
};

export type BannerDuoProps = {
	banner_left?: IkasImage;
	banner_left_link?: IkasNavigationLink;
	banner_right?: IkasVideo;
	banner_right_link?: IkasNavigationLink;
};

export type RewardsProps = {
	title?: string;
	textPicture?: string;
	imageWeb?: IkasImage;
	imageMobile?: IkasImage;
	contents?: DeliveryContent[];
	contentsTitle?: string;
	contentsOrientation?: string;
	awardTitle?: string;
	awardContent?: string;
	rewardPackages?: string;
	productShowcaseTitle?: string;
	productShowcaseContent?: string;
	productShowcaseBtnText?: string;
	productShowcaseBtnLink?: IkasNavigationLink;
};

