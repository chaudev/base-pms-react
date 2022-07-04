export const config = {
  PRODUCTION: "" || process.env.PRODUCTION,
  DEVELOPMENT: "" || process.env.DEVELOPMENT,
  API_URL: "https://api-lmsdemo.monamedia.net",
  ENV: process.env.NODE_ENV,
};

export const regex = {
  email: /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
  number: /^[0-9]+$/,
  numberAndWord: /^[a-zA-Z 0-9_.+-]+$/,
  numbersWithCommas: /^\d+(\,\d+)*$/g,
};

export const defaultPagination = {
  current: 1,
  pageSize: 20,
  Total: 0,
};

export const defaultSorter = {
  field: "Id",
  order: "descend",
} as any;

export enum EContactStatusData {
  NotContact = 0,
  Contacted = 1,
  Potential = 2,
  NonPotential = 3,
  Contract = 4,
  SignNewProject = 5,
  NotNeed = 6,
}

export const statusContact = [
  {
    id: EContactStatusData.NotContact,
    name: "Chưa liên hệ",
    color: "#eb7d07",
  },
  {
    id: EContactStatusData.Contacted,
    name: "Đang liên hệ",
    color: "#0072f5",
  },
  {
    id: EContactStatusData.NonPotential,
    name: "Đã liên hệ",
    color: "#289c11",
  },
  {
    id: EContactStatusData.Potential,
    name: "Hẹn gọi lại",
    color: "#8916e0",
  },
  {
    id: EContactStatusData.SignNewProject,
    name: "Chưa liên hệ được",
    color: "#e0bb16",
  },
  {
    id: EContactStatusData.Contract,

    name: "Sai thông tin",
    color: "#eb0707",
  },
  {
    id: EContactStatusData.NotNeed,
    name: "Chưa có nhu cầu",
    color: "#a8a09e",
  },
];

export enum EStaffStatusData {
  NotActivated = 0,
  IsActive = 1,
  Locked = 2,
}

export const statusStaff = [
  {
    id: EStaffStatusData.NotActivated,
    name: "Chưa kích hoạt",
    color: "#eb7d07",
  },
  {
    id: EStaffStatusData.IsActive,
    name: "Đang hoạt động",
    color: "#eb7d07",
  },
  {
    id: EStaffStatusData.Locked,
    name: "Đang khoá",
    color: "#eb7d07",
  },
];

export enum EGenderStatusData {
  Male = 0,
  FeMale = 1,
}

export const GenderData = [
  {
    id: EGenderStatusData.Male,
    name: "Nam",
    color: "#eb7d07",
  },
  {
    id: EGenderStatusData.FeMale,
    name: "Nữ",
    color: "#eb7d07",
  },
];
