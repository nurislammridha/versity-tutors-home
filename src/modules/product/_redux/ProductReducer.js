import * as Types from "./Types";
import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";
const initialState = {
  productList: null,
  productInput: {
    productName: "",
    productNameBangla: "",
    productNameBangla: "",
    commonDiscountPrice: 0,
    commonPrice: 0,
    productIcon: { url: "", publicId: null },
    productImg: { url: "", publicId: null },
    productImages: [],
    categoryName: "",
    categoryId: "",
    subCategoryName: "",
    subCategoryId: "",
    subSubCategoryName: "",
    subSubCategoryId: "",
    brandName: "",
    brandId: "",
    relatedProducts: [],
    isAvailableCashOnDelivery: false,
    isTrending: false,
    isFlashSell: false,
    isTodayDeal: false,
    isActive: true,
    variantImg: { url: "", publicId: null },
    stock: 0,
    minStock: 0,
    variantName: "",
    variantId: 0,
    unitName: "",
    unitId: "",
    colorName: "",
    colorId: "",
    colorHexCode: "",
    originName: "",
    originId: "",
    originLogo: { url: "", publicId: null },
    note: "",
    minQuantity: 0,
    maxQuantity: 0,
    price: 0,
    discountPrice: 0,
    startDate: "",
    endDate: "",
    multipleProducts: [],
    variantProducts: [],
    length: "",
    width: "",
    height: "",
    weight: "",
    shortDescriptions: "",
    shortDescriptionsBangla: "",
    longDescriptions: "",
    longDescriptionsBangla: "",
    videoUrl: "",
    seoTag: "",
    warrantyPolicy: "",
    warrantyStartDate: "",
    warrantyEndDate: "",
  },
  isCreateProduct: false,
  afterUpdate: false,
  isIconLoading: false,
  isImgLoading: false,
  isVariantImgLoading: false,
  productDetails: null
};
const ProductReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.GET_PRODUCT_INPUT:
      const productInput = { ...state.productInput };
      productInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        productInput: productInput,
      };
    case Types.PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload,
      };
    case Types.PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: action.payload,
      };
    case Types.IS_CREATE_PRODUCT:
      return {
        ...state,
        isCreateProduct: action.payload,
      };
    case Types.AFTER_CREATE_PRODUCT:
      const productInputAfter = initialState.productInput;
      productInputAfter.productImgColor = []
      return {
        ...state,
        productInput: productInputAfter,
      };
    case Types.AFTER_UPDATE_PRODUCT:
      return {
        ...state,
        afterUpdate: action.payload,
      };
    case Types.ICON_LOADING:
      return {
        ...state,
        isIconLoading: action.payload,
      };
    case Types.IMG_LOADING:
      return {
        ...state,
        isImgLoading: action.payload,
      };
    case Types.VARIANT_IMG_LOADING:
      return {
        ...state,
        isVariantImgLoading: action.payload,
      };
    case Types.PRE_UPDATE_PRODUCT:
      const { categoryInfo, subCategoryInfo, subSubCategoryInfo, brandInfo, price, discountPrice, model } = action.payload;
      let productEdit = initialState.productInput;
      productEdit = action.payload
      productEdit.videoUrl = arrToStri(productEdit.videoUrl)
      productEdit.productImg = { url: "", publicId: null }
      productEdit.variantImg = { url: "", publicId: null }
      productEdit.commonPrice = price
      productEdit.commonDiscountPrice = discountPrice
      productEdit.model = model
      const obj = {
        stock: 0,
        minStock: 0,
        variantName: "",
        variantId: 0,
        unitName: "",
        unitId: "",
        colorName: "",
        colorId: "",
        colorHexCode: "",
        originName: "",
        originId: "",
        originLogo: { url: "", publicId: null },
        note: "",
        minQuantity: 0,
        maxQuantity: 0,
        price: 0,
        discountPrice: 0,
        startDate: "",
        endDate: "",
        multipleProducts: [],
        categoryName: categoryInfo?.categoryName,
        subCategoryName: subCategoryInfo?.subCategoryName,
        subSubCategoryName: subSubCategoryInfo?.subSubCategoryName,
        brandName: brandInfo?.brandName,
      }
      productEdit = { ...productEdit, ...obj }

      delete productEdit._id
      return {
        ...state,
        productInput: productEdit,
      };
    default:
      break;
  }
  return newState;
};
export default ProductReducer;


export const MyhtmlToDraft = (data) => {
  const blocksFromHtml = htmlToDraft(data);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  const editorState = EditorState.createWithContent(contentState);
  return editorState;
};
const arrToStri = (arr = []) => {
  let str = ""
  if (arr?.length > 0) {
    arr?.forEach((item, index) => {
      if (index === 0) {
        str = item
      } else {
        str = str + "," + item
      }

    });
  }
  return str
}
