// src/utils/validation.ts

// This is a plain TypeScript module. No <script setup>, no 'ref'.
// Its only job is to EXPORT reusable constants.

// We can define a reusable type for our validation functions.
type Rule = (v: string) => boolean | string;

export const emailRules: Rule[] = [
  (v : string) => !!v || "Required",
  (v) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      v
    ) || "E-mail must be valid",
];

export const nameRules: Rule[] = [
  (v:string) => !!v || "Required",
  (v) =>
    (/^[^\s]/.test(v) && /^[a-zA-z0-9\s]+$/.test(v)) ||
    v === "." ||
    "Wrong Characters Used",
];

export const jobNoRules: Rule[] = [
    (v) => !!v || "Required",
    (v) =>
      (/^[^\s]/.test(v) && /^[a-zA-Z0-9-#\s]+$/.test(v)) ||
      v === "." ||
      "Wrong Characters Used",
];
  
export const addressRules: Rule[] = [
    (v) => !!v || "Required",
    (v) =>
      /^[^-\s][\.a-zA-Z0-9/&,#&$--!? ]*$/.test(v) || v === "." || "Invalid",
];

export const contactPhoneRules: Rule[] = [
    (v) => !!v || "Required",
    (v) => (v && v.length >= 10) || "Minimum 10 characters required",
    (v) => /^[0-9]+$/.test(v) || v === "." || "Numbers Only",
];

export const contactExtensionRules: Rule[] = [
    (v) => /^[0-9]+$/.test(v) || v === "." || "Numbers Only",
];

export const companyNameRules: Rule[] = [
    (v) => !!v || "Required",
    (v) => (v && v.length <= 50) || "Must be less than 50 characters",
    (v) =>
      /^[^ ][a-zA-z0-9&-,.',\s]+$/.test(v) ||
      v === "." ||
      "Spaces are not allowed",
];

export const cityRules: Rule[] = [
    (v) => !!v || "Required",
    (v) => (v && v.length <= 100) || "Must be less than 100 characters",
    (v) =>
      /^[^ ][a-zA-z0-9-',\s]+$/.test(v) ||
      v === "." ||
      "Spaces are not allowed",
];

export const emaildomainRules: Rule[] = [
    (v) => !!v || "Required",
    (v) => /..+.com/.test(v) || /..+.us/.test(v) || "Domain must be valid",
];

export const alphabetsRules: Rule[] = [
    (v) => !!v || "Required",
    (v) => /^[a-zA-Z\s]+$/.test(v) || v === "." || "Alphabets Only",
];

export const loadsRules: Rule[] = [
    (v) => !!v || "Required",
    (v) => /^[0-9-\s]+$/.test(v) || v === "." || "Numbers Only",
];

export const alpheSpecialCaseRules: Rule[] = [
    (v) => !!v || "Required",
    (v) =>
      /^(?!\\)[a-zA-z@#*_\s]*$/.test(v) ||
      v === "." ||
      "Alphabets and Special Case characters Only",
];

export const alphaNumericRules: Rule[] = [
    (v) => !!v || "Required",
    (v) =>
      /^[a-zA-Z0-9]*$/.test(v) ||
      v === "." ||
      "Alphabets and Numbers characters Only",
];

export const mobileRules: Rule[] = [
    (v) => !!v || "Required",
    (v) => (v && v.toString().length >= 10) || "Minimum 10 characters required",
];

export const titleRules: Rule[] = [
    (v) =>
      (/^[^\s]/.test(v) && /^[a-zA-z0-9\s]+$/.test(v)) ||
      v === "." ||
      "Wrong Characters Used",
];

export const urlRules: Rule[] = [
    (v) =>
      (v &&
        !!v.match(
          "^(https?://)?(www\\.)?([-a-zA-Z0-9]{1,63}\\.)*?[a-zA-Z0-9][-a-zA-Z0-9]{0,61}[a-zA-Z0-9]\\.[a-zA-Z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$"
        )) ||
      "Website must be valid",
];

export const rfiReasonRules: Rule[] = [
    (v) => !!v || "Please enter the reason",
    (v) =>
      (v && v.length < 201) || "Description must be 200 characters or less",
];