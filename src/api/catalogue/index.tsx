import BaseAPI from "../methods";

const { get } = new BaseAPI("catalogue");

type TParams = Pick<TPaginationParams, "SearchContent">;

export const catalogue = {
  getSourceTypes: (params?: TParams) =>
    get<TSourceTypesCatalogue[]>("/source-type", { params }),

  getUserGroup: (params?: TParams) =>
    get<TSourceTypesCatalogue[]>("/user", { params }),

  getSystemStatus: (params?: TParams) =>
    get<TSourceTypesCatalogue[]>("/get-catalogue-system", { params }),
};
