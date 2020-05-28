import { SAVE_DATA } from "../Saga/index";

const initialState = {
  products: null,
  featuresList: null,
  compareSummary: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_DATA: {
      return {
        ...state,
        products: action.data,
        featuresList: action.data.products.featuresList,
        compareSummary: action.data.products.compareSummary,
      };
    }
    default:
      return state;
  }
};

export default reducer;
