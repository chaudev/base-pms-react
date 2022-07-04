import BaseAPI from "../methods";

type TFilterParams = {
  Type: number;
};

const { globalCRUD, put } = new BaseAPI<TCustomers & TFilterParams>(
  "contact-customer"
);

// /api/Student

export const contactCustomers = {
  ...globalCRUD,
  updateAssignContact: (params: {
    contactCustomerId: string;
    saleId: string;
  }) =>
    put(
      `/assign-contact/${params.contactCustomerId}/${params.saleId}`,
      undefined,
      {
        params,
      }
    ),
};
