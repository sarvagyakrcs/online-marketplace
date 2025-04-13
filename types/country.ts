export enum CountryCode {
    US = "US", // United States
    CA = "CA", // Canada
    UK = "UK", // United Kingdom
    DE = "DE", // Germany
    FR = "FR", // France
    ES = "ES", // Spain
    IT = "IT", // Italy
    JP = "JP", // Japan
    AU = "AU", // Australia
    BR = "BR", // Brazil
    NL = "NL", // Netherlands
    SE = "SE", // Sweden
    NO = "NO", // Norway
    DK = "DK", // Denmark
    FI = "FI", // Finland
    CH = "CH", // Switzerland
    AT = "AT", // Austria
    BE = "BE", // Belgium
    CZ = "CZ", // Czech Republic
    PL = "PL", // Poland
    IE = "IE", // Ireland
    PT = "PT", // Portugal
    NZ = "NZ", // New Zealand
    SG = "SG", // Singapore
    KR = "KR", // South Korea
    HK = "HK", // Hong Kong
    TW = "TW", // Taiwan
    CL = "CL", // Chile
    AR = "AR", // Argentina
    MX = "MX", // Mexico
    ZA = "ZA", // South Africa
    IS = "IS", // Iceland
    LU = "LU", // Luxembourg
    LI = "LI", // Liechtenstein
    MT = "MT", // Malta
    RO = "RO", // Romania
    BG = "BG", // Bulgaria
    SK = "SK", // Slovakia
    RS = "RS", // Serbia
    SI = "SI", // Slovenia
    HR = "HR", // Croatia
    EE = "EE", // Estonia
    LV = "LV", // Latvia
    LT = "LT", // Lithuania
    UA = "UA", // Ukraine
    GE = "GE", // Georgia
    KZ = "KZ", // Kazakhstan
    AZ = "AZ", // Azerbaijan
    BY = "BY", // Belarus
    MA = "MA", // Morocco
    TN = "TN", // Tunisia
    EG = "EG", // Egypt
    JO = "JO", // Jordan
    LB = "LB", // Lebanon
    KW = "KW", // Kuwait
    QA = "QA", // Qatar
    AE = "AE", // United Arab Emirates
    SA = "SA", // Saudi Arabia
    OM = "OM", // Oman
    BH = "BH", // Bahrain
    IL = "IL", // Israel
    IN = "IN", // India
    TH = "TH", // Thailand
    MY = "MY", // Malaysia
  }

  export interface CountryInfo {
    name: string;
    code: CountryCode;
    phoneCode: string;
  }

  export const COUNTRY_MAP: Record<CountryCode, CountryInfo> = {
    [CountryCode.US]: { name: "United States", code: CountryCode.US, phoneCode: "+1" },
    [CountryCode.CA]: { name: "Canada", code: CountryCode.CA, phoneCode: "+1" },
    [CountryCode.UK]: { name: "United Kingdom", code: CountryCode.UK, phoneCode: "+44" },
    [CountryCode.DE]: { name: "Germany", code: CountryCode.DE, phoneCode: "+49" },
    [CountryCode.FR]: { name: "France", code: CountryCode.FR, phoneCode: "+33" },
    [CountryCode.ES]: { name: "Spain", code: CountryCode.ES, phoneCode: "+34" },
    [CountryCode.IT]: { name: "Italy", code: CountryCode.IT, phoneCode: "+39" },
    [CountryCode.JP]: { name: "Japan", code: CountryCode.JP, phoneCode: "+81" },
    [CountryCode.AU]: { name: "Australia", code: CountryCode.AU, phoneCode: "+61" },
    [CountryCode.BR]: { name: "Brazil", code: CountryCode.BR, phoneCode: "+55" },
    [CountryCode.IN]: { name: "India", code: CountryCode.IN, phoneCode: "+91" },
    [CountryCode.NL]: { name: "Netherlands", code: CountryCode.NL, phoneCode: "+31" },
    [CountryCode.SE]: { name: "Sweden", code: CountryCode.SE, phoneCode: "+46" },
    [CountryCode.NO]: { name: "Norway", code: CountryCode.NO, phoneCode: "+47" },
    [CountryCode.DK]: { name: "Denmark", code: CountryCode.DK, phoneCode: "+45" },
    [CountryCode.FI]: { name: "Finland", code: CountryCode.FI, phoneCode: "+358" },
    [CountryCode.CH]: { name: "Switzerland", code: CountryCode.CH, phoneCode: "+41" },
    [CountryCode.AT]: { name: "Austria", code: CountryCode.AT, phoneCode: "+43" },
    [CountryCode.BE]: { name: "Belgium", code: CountryCode.BE, phoneCode: "+32" },
    [CountryCode.CZ]: { name: "Czech Republic", code: CountryCode.CZ, phoneCode: "+420" },
    [CountryCode.PL]: { name: "Poland", code: CountryCode.PL, phoneCode: "+48" },
    [CountryCode.IE]: { name: "Ireland", code: CountryCode.IE, phoneCode: "+353" },
    [CountryCode.PT]: { name: "Portugal", code: CountryCode.PT, phoneCode: "+351" },
    [CountryCode.NZ]: { name: "New Zealand", code: CountryCode.NZ, phoneCode: "+64" },
    [CountryCode.SG]: { name: "Singapore", code: CountryCode.SG, phoneCode: "+65" },
    [CountryCode.KR]: { name: "South Korea", code: CountryCode.KR, phoneCode: "+82" },
    [CountryCode.HK]: { name: "Hong Kong", code: CountryCode.HK, phoneCode: "+852" },
    [CountryCode.TW]: { name: "Taiwan", code: CountryCode.TW, phoneCode: "+886" },
    [CountryCode.CL]: { name: "Chile", code: CountryCode.CL, phoneCode: "+56" },
    [CountryCode.AR]: { name: "Argentina", code: CountryCode.AR, phoneCode: "+54" },
    [CountryCode.MX]: { name: "Mexico", code: CountryCode.MX, phoneCode: "+52" },
    [CountryCode.ZA]: { name: "South Africa", code: CountryCode.ZA, phoneCode: "+27" },
    [CountryCode.IS]: { name: "Iceland", code: CountryCode.IS, phoneCode: "+354" },
    [CountryCode.LU]: { name: "Luxembourg", code: CountryCode.LU, phoneCode: "+352" },
    [CountryCode.LI]: { name: "Liechtenstein", code: CountryCode.LI, phoneCode: "+423" },
    [CountryCode.MT]: { name: "Malta", code: CountryCode.MT, phoneCode: "+356" },
    [CountryCode.HR]: { name: "Croatia", code: CountryCode.HR, phoneCode: "+385" },
    [CountryCode.RO]: { name: "Romania", code: CountryCode.RO, phoneCode: "+40" },
    [CountryCode.BG]: { name: "Bulgaria", code: CountryCode.BG, phoneCode: "+359" },
    [CountryCode.SK]: { name: "Slovakia", code: CountryCode.SK, phoneCode: "+421" },
    [CountryCode.RS]: { name: "Serbia", code: CountryCode.RS, phoneCode: "+381" },
    [CountryCode.SI]: { name: "Slovenia", code: CountryCode.SI, phoneCode: "+386" },
    [CountryCode.EE]: { name: "Estonia", code: CountryCode.EE, phoneCode: "+372" },
    [CountryCode.LV]: { name: "Latvia", code: CountryCode.LV, phoneCode: "+371" },
    [CountryCode.LT]: { name: "Lithuania", code: CountryCode.LT, phoneCode: "+370" },
    [CountryCode.UA]: { name: "Ukraine", code: CountryCode.UA, phoneCode: "+380" },
    [CountryCode.GE]: { name: "Georgia", code: CountryCode.GE, phoneCode: "+995" },
    [CountryCode.KZ]: { name: "Kazakhstan", code: CountryCode.KZ, phoneCode: "+7" },
    [CountryCode.AZ]: { name: "Azerbaijan", code: CountryCode.AZ, phoneCode: "+994" },
    [CountryCode.BY]: { name: "Belarus", code: CountryCode.BY, phoneCode: "+375" },
    [CountryCode.MA]: { name: "Morocco", code: CountryCode.MA, phoneCode: "+212" },
    [CountryCode.TN]: { name: "Tunisia", code: CountryCode.TN, phoneCode: "+216" },
    [CountryCode.EG]: { name: "Egypt", code: CountryCode.EG, phoneCode: "+20" },
    [CountryCode.JO]: { name: "Jordan", code: CountryCode.JO, phoneCode: "+962" },
    [CountryCode.LB]: { name: "Lebanon", code: CountryCode.LB, phoneCode: "+961" },
    [CountryCode.KW]: { name: "Kuwait", code: CountryCode.KW, phoneCode: "+965" },
    [CountryCode.QA]: { name: "Qatar", code: CountryCode.QA, phoneCode: "+974" },
    [CountryCode.AE]: { name: "United Arab Emirates", code: CountryCode.AE, phoneCode: "+971" },
    [CountryCode.SA]: { name: "Saudi Arabia", code: CountryCode.SA, phoneCode: "+966" },
    [CountryCode.OM]: { name: "Oman", code: CountryCode.OM, phoneCode: "+968" },
    [CountryCode.BH]: { name: "Bahrain", code: CountryCode.BH, phoneCode: "+973" },
    [CountryCode.IL]: { name: "Israel", code: CountryCode.IL, phoneCode: "+972" },
    [CountryCode.TH]: { name: "Thailand", code: CountryCode.TH, phoneCode: "+66" },
    [CountryCode.MY]: { name: "Malaysia", code: CountryCode.MY, phoneCode: "+60" },
  };
  
  