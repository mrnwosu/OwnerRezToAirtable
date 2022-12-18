export interface LookupQueryFilter{
    q: string
    limit: number
}

export enum EntrySource{
    ControlPanel = 1,
    Form = 2,
    API = 3,
    System = 4
}

export enum ChannelCancellationEntity{
    Guest = 1,
    Owner = 2,
    Admin = 3
}

export enum QuickBooksInvoiceDateType{
    BookedDate = 0,
    ArrivalDate = 1,
    DepartureDate = 2 
}

export enum QuickBooksInvoiceNumberType{
    OwnerRezBookingNumber = 0,
    QuickBooksAutoIncrementedNumber = 1
}

export enum BookingDepositStatus{
    NoTransactions= 1,
    NotDeposited= 2,
    PartiallyDeposited= 4,
    FullyDeposited= 8
}

export enum PaymentMethodMode{
    Offline= 1,
    CreditCard= 2
}

export enum FirstPaymentRule{
    All= 0,
    Percent= 1,
    Amount= 2
}

export enum SecondPaymentRule{
    ScheduleNever= 0,
    ScheduleAlways= 1
}

export enum SecurityDepositRule{
    TakeIf= 1,
    TakeAlways= 2,
    TakeNever= 3
}

export enum SecurityDepositType{
    Hold= 0,
    Refundable= 1
}

export enum VisibleOptionRule{
    Disabled= 0,
    Enabled= 1,
    Selected= 2,
    Required= 3
}

export enum PendingForItem{
    Payment= 0,
    Card= 1
}

export enum PendingDeadlineAction{
    Cancel= 0,
    NotifyMe= 1
}

export enum ChargeSource{
    Default= 0,
    Generated= 1,
    Imported= 2,
    ChannelBridge= 3,
    Manual= 4
}

export enum SecurityDepositReleaseEmailType{
    None= 0,
    SystemDefault= 1,
    EmailTemplate= 2
}

export enum DayOfWeekFlags{
    Sunday= 1,
	Monday= 2,
	Tuesday= 4,
	Wednesday= 8,
	Thursday= 16,
	Friday= 32,
	Saturday= 64
}

export enum AddressType{
    Home= 1,
	Work= 2,
	Other= 3
}

export interface State{
    FipsCode: string
	AlphaCode: string
	Name: string
	RegularFifty: boolean
	SalesTaxRate: number
	Id: number
}

export interface Country{
    Name: string
	IsoTwoLetter: string
	IsoThreeLetter: string
	IsoNumber: string
	Id: number
}

export enum ContactType{
    Home= 1,
	Work= 2,
	Mobile= 3,
	Other= 4
}

export interface Phone{
    Type: ContactType
	NonUs: boolean
	AreaCode: string
	RegionNumber: string
	LastFour: string
	Extension: string
	Full: string
	Raw: string
	DisableSms: boolean
	FullInformal: string
	UserId: number
	DeletedUtc: Date
	DeletedUserId: number
	UpdatedUtc: Date
	UpdatedUserId: number
	CreatedUtc: Date
	CreatedUserId: number
	Id: number
}

export interface Address{
    Type: AddressType
    Street1: string
    Street2: string
    City: string
    StateId: number
    Province: string
    PostalCode: string
    CountryId: number
    State: State
    Country: Country
    UserId: number
    DeletedUtc: Date
    DeletedUserId: number
    UpdatedUtc: Date
    UpdatedUserId: number
    CreatedUtc: Date
    CreatedUserId: number
    Id: number
}

export enum EntityType{
    Address= 2,
	ListingSite= 3,
	Agreement= 4,
	BillingInfo= 5,
	Booking= 6,
	BookingLineItem= 7,
	Calendar= 8,
	CalendarAction= 9,
	Country= 13,
	Email= 14,
	EmailAction= 15,
	EmailBody= 16,
	EmailBounce= 17,
	EmailRecipient= 18,
	EmailSend= 19,
	File= 22,
	GatewayCall= 23,
	GatewayCredential= 24,
	Holiday= 25,
	Image= 26,
	Inquiry= 27,
	InquiryEmail= 28,
	Lease= 29,
	Payment= 33,
	PaymentApiCall= 34,
	PaymentMethod= 35,
	Phone= 36,
	Picture= 37,
	Post= 38,
	Property= 39,
	PropertyPaymentMethod= 40,
	Quote= 42,
	QuoteLineItem= 43,
	RatePeriod= 44,
	Rate= 45,
	Refund= 46,
	Request= 47,
	ScheduledPayment= 48,
	ScheduledSecurityDeposit= 49,
	SecurityDeposit= 50,
	State= 51,
	SupportArticle= 53,
	SupportCategory= 54,
	SupportGrouping= 55,
	Surcharge= 56,
	Tax= 57,
	ThirdPartyAlert= 60,
	Topic= 61,
	TravelInsurance= 62,
	TravelInsuranceCall= 63,
	User= 64,
	UserInterstitial= 65,
	UserInvoice= 66,
	UserInvoiceBooking= 67,
	UserInvoicePayment= 68,
	UserPayment= 69,
	UserPlan= 70,
	UserPlanTier= 71,
	Watch= 72,
	EmailTemplate= 73,
	EmailTemplateRecipient= 74,
	Unknown= 75,
	Widget= 76,
	iCalFeed= 77,
	ApiApplication= 78,
	FieldDefinition= 79,
	Field= 80,
	ScheduledEmail= 81,
	Guest= 82,
	LinkedAccount= 83,
	LinkedAccountProperty= 84,
	Trigger= 85,
	Season= 86,
	SurchargeCriteria= 88,
	QuickBooks= 89,
	QuickBooksAction= 90,
	Expense= 91,
	TwilioCallLog= 92,
	CalendarSync= 93,
	BlockedOffTime= 94,
	InquiryPush= 95,
	LynnbrookMerchantApp= 96,
	HostedSitePage= 97,
	Owner= 98,
	Review= 99,
	VrtExport= 100,
	OwnerStatement= 101,
	PaymentVerification= 102,
	EmailAddress= 103,
	VrtImport= 104,
	HostedSite= 105,
	Autoresponder= 106,
	SystemMessage= 107,
	GuestMessage= 108,
	Drip= 109,
	ChannelSyncEvent= 110,
	Lock= 111,
	ApiApplicationConnection= 112,
	BookingDoorCode= 113,
	BookingFee= 114,
	BookingFeeExpenseSource= 115,
	ChannelWebhookQueue= 116,
	DamageProtection= 117,
	QuickBooksInvoice= 118,
	TriggerException= 119,
	TriggerRun= 120,
	UserInvoiceDamageProtection= 121,
	TwilioMessage= 122,
	TextTemplate= 123,
	HostedSiteHeader= 124,
	UserRefund= 125,
	ChannelTemplate= 126,
	AccessGrant= 127,
	VerifiedDomain= 128,
	SiteReview= 129,
	TagGroup= 130,
	ExternalSite= 131,
	CancellationPolicy= 132,
	TwilioPhone= 133,
	ThemeOverride= 134,
	FormHeader= 135,
	StatementView= 136,
	PmPayout= 137,
	OwnerPayment= 138,
	PmStatement= 140,
	Tag= 141,
	PropertyShare= 142,
	SystemAlert= 143,
	PropertyListingRoom= 144,
	PropertyListingBathroom= 145,
	AmenityCategory= 146,
	ProJob= 147,
	EntityTag= 148,
	Deposit= 149,
	DamageProtectionAgreement= 150,
	SalesAccount= 151,
	ChannelBlackout= 152,
	HolidayOccurrence= 153,
	HostedSiteBlogCategory= 154,
	HostedSiteBlogPost= 155,
	HostedSiteRedirect= 156,
	OfficialHolidaySubscription= 157,
	PayPalECPayment= 158,
	PayPalECRefund= 159,
	ProJobServiceArea= 160,
	ProJobServiceAreaCategory= 161,
	PropertyLinkedAvailabilityProperty= 162,
	PropertyOwnerApplicability= 163,
	QuickBooksDeposit= 164,
	QuickBooksOwner= 165,
	QuickBooksPayment= 166,
	QuickBooksSurcharge= 167,
	QuickBooksTax= 168,
	QuoteCharge= 169,
	ReviewTemplate= 170,
	SeasonalRate= 171,
	StatementViewColumn= 172,
	SuppressedEmailAddress= 173,
	TaxApplicability= 174,
	TaxRate= 175,
	UserInvoiceCharge= 176,
	AutoReview= 177,
	CannedQuery= 178,
	ApiAccessToken= 179,
	PayPalECSecurityDeposit= 180,
	ExpenseCategory= 181,
	ProJobStatusHistory= 182,
	PortalSite= 183,
	Address2Entity= 184,
	EmailAddress2Entity= 185,
	Phone2Entity= 186,
	UserInvite= 187,
	PropertyListingDescription= 188
}