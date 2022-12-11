import { BookingDepositStatus, ChannelCancellationEntity, ChargeSource, EntrySource, FirstPaymentRule, PaymentMethodMode, PendingDeadlineAction, PendingForItem, QuickBooksInvoiceDateType, QuickBooksInvoiceNumberType, SecondPaymentRule, SecurityDepositRule, SecurityDepositType, VisibleOptionRule } from "./CommonModels"

export interface BookingModel{
    FormKey: string
    InquiryId: number
    QuoteId: number
    OwnerBlockOff: boolean
    IsPhantomBlock: boolean
    IsIgnoreMutualBlocking: boolean
    PropertyId: number
    Arrival: Date
    Departure: Date
    BookedUtc: Date
    PendingUntil: Date
    CleaningDate: Date
    Adults: number
    Children: number
    Infants: number
    Pets: number
    GuestId: number
    TotalPaid:number
    TotalOwed:number
    TotalAmount:number
    TotalRefunded:number
    TotalTaxes:number
    TotalZeroCommission:number
    TotalNonstandardCommission:number
    TravelInsuranceId: number
    DamageProtectionId: number
    EntrySourceId: EntrySource
    ListingSiteId: number
    CanceledUtc: Date
    CanceledUserId: number
    OwnerBlockOffReason: string
    SentEmailNewToGuestUtc: Date
    SentEmailNewToOwnerUtc: Date
    SentEmailNewToThirdPartiesUtc: Date
    SentEmailCanceledToGuestUtc: Date
    SentEmailCanceledToOwnerUtc: Date
    SentEmailCanceledToThirdPartiesUtc: Date
    SentAddTriggersUtc: Date
    ImportUtc: Date
    CalendarSyncDisconnectedUtc: Date
    CheckIn: string
    CheckOut: string
    Notes: string
    Title: string
    HasProblem: boolean
    LegacyBookingId: string
    OwnerId: number
    OwnerCommissionPercent:number
    OwnerAmount:number
    OwnerPaidByGuest:number
    CommissionAmount:number
    TotalNonCommissionable:number
    TotalFullCommission:number
    TotalPreDeductedExpense:number
    TotalShowAsRent:number
    OwnerPaysTaxes: boolean
    OwnerPaysDamageProtection: boolean
    OwnerStatementExclude: Date
    PmStatementExclude: Date
    PmAmount:number
    PmLock: boolean
    CurrencyCode: string
    TotalHostFees:number
    TotalGuestFees:number
    TotalNetAmount:number
    TotalGuestBalance:number
    TotalNetBalance:number
    CalendarSyncId: number
    CalendarSyncTryCancelCount: number
    CalendarSyncUid: string
    CalendarSyncNameToken: string
    ListingSiteToken: string
    CancellationPolicyId: number
    ChannelLinkedAccountId: number
    LastChannelLinkedAccountId: number
    ChannelCancellationEntity: ChannelCancellationEntity
    ChannelPropertyToken: string
    ChannelRelatedToken: string
    ChannelIsRequestToBook: boolean
    ChannelApplyPayments: boolean
    ChannelCalendarIsUnlinked: boolean
    ChannelUseTheirTax: boolean
    ChannelCancellationPolicyId: number
    ChannelCancellationPolicyPriceFactor:number
    ChannelStatusId: number
    ChannelGuests: string
    ChannelInfo: string
    ChannelLastUpdatedUtc: Date
    HadRddSurcharge: boolean
    ChargeSource: ChargeSource
    DoubleBlindEmailAddress: string
    AgreementId: number
    RowVersion: number
    LastUpdatedFinancialsUtc: Date
    QuickBooksId: number
    QuickBooksInvoiceDateType: QuickBooksInvoiceDateType
    QuickBooksInvoiceNumberType: QuickBooksInvoiceNumberType
    QuickBooksDontPushPayments: boolean
    OfflinePaymentMethodId: number
    w_DepositStatus: BookingDepositStatus
    AllowedPaymentMode: PaymentMethodMode
    FirstPaymentRule: FirstPaymentRule
    FirstPaymentAmount:number
    SecondPaymentRule: SecondPaymentRule
    SecondPaymentDays: number
    SecurityDepositRule: SecurityDepositRule
    SecurityDepositType: SecurityDepositType
    SecurityDepositAmount:number
    SecurityDepositDays: number
    SecurityDepositReleaseDays: number
    TravelInsuranceRule: VisibleOptionRule
    PendingDaysForCreditCard: number
    PendingDaysForCheck: number
    PendingDaysForCustom: number
    DaysBeforeArrivalForCheck: number
    DaysBeforeArrivalForCustom: number
    PendingFor: PendingForItem
    PendingAction: PendingDeadlineAction
    PendingEmailTemplateId: number
    SendPaymentReminder: boolean
    SendSecurityDepositReminder: boolean
    FormKeyGuid: string
    UserId: number
    DeletedUtc: Date
    DeletedUserId: number
    UpdatedUtc: Date
    UpdatedUserId: number
    CreatedUtc: Date
    CreatedUserId: number
    Id: number
}