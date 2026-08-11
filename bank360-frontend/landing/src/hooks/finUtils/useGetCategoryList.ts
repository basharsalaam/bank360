import { useAppDispatch } from "./../../app/hooks";
import { useGetTokens } from "./../getDataFromStore/getDataFromState";
import { ISelectOption } from "./../../frontend-components/Select/Select.interface";
import { ICategoryInfo } from "./../../features/services/services.interface";
import { useEffect, useState } from "react";
import { useGetCategoryListMutation } from "../../features/services";
import { updateCategories } from "../../features/finData/finData.slice";

export const useGetCategoryList = () => {
  const [categoryList, setCategoryList] = useState<ICategoryInfo[]>([]);
  const { access } = useGetTokens();
  const [getCategoryList] = useGetCategoryListMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getCategoryList({ accessToken: access })
      .unwrap()
      .then((data) => {
        setCategoryList(data);
        dispatch(updateCategories(data));
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    categories: categoryList.map(
      (cat) =>
        ({
          label: cat.category,
          value: cat.id.toString(),
        } as ISelectOption)
    ),
  };
};

export const useGetCategories = () => {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState<ICategoryInfo[]>([]);
  const { access } = useGetTokens();
  const [getCategoryList] = useGetCategoryListMutation();
  const dispatch = useAppDispatch();
  const getCategories = () => {
    getCategoryList({ accessToken: access })
      .unwrap()
      .then((data) => {
        setCategoryList(data);
        dispatch(updateCategories(data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    categories: categoryList,
    loading,
    getCategories,
  };
};
