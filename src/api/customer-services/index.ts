import BaseAPI from "../methods";

type TFilterParams = {
  Type: number;
};

const { globalCRUD } = new BaseAPI<TCustomers & TFilterParams>(
  "contact-customer-services"
);

export const customerServices = globalCRUD;
