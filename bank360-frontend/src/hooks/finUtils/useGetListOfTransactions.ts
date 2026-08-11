import { stringifySelectOptions } from "./../../utils/helpers/stringify-array";
import { useEffect, useRef } from "react";
import { ITransaction } from "./../../features/services/services.interface";
import { ISelectOption } from "./../../components/Select/Select.interface";
import { useGetTokens } from "./../getDataFromStore/getDataFromState";
import { useGetTransactionsListMutation } from "../../features/services";
import { dateOptionsGraphMeaning } from "../../utils/placeholders";

export const useGetListOfTransactions = ({
  setScrollState,
  selectedDate,
  selectedCurrency,
  selectedBanks,
  setLoadingTransactions,
  setPage,
  setTransactions,
  setTransactionCount,
  page,
  transactionCount,
  transactions,
  rootElement,
  element,
  more,
  searchInput,
  categories,
  noPaginate,
  accountId,
}: IProps) => {
  const [getTransactions] = useGetTransactionsListMutation();
  const { access } = useGetTokens();

  const getListOfTransactions = (
    append?: boolean,
    newPage?: number,
    date?: string,
    banks?: ISelectOption[],
    currency?: string,
    search?: string,
    chosenBanks?: ISelectOption[]
  ) => {
    if (append && setScrollState) {
      setScrollState((prev) => ({
        ...prev,
        loading: true,
      }));
    }
    const selectedDateRange = (date || selectedDate.value) as string;
    const dateRange = dateOptionsGraphMeaning()[selectedDateRange];
    const isAllTime = selectedDateRange === "All time";

    // Get transactions function
    const getTransact = () =>
      getTransactions({
        accessToken: access,
        params: {
          date: isAllTime ? undefined : dateRange.date,
          duration: isAllTime ? undefined : dateRange.duration,
          size: isAllTime ? undefined : dateRange.size,
          currency: currency || selectedCurrency.value,
          bank_name:
            chosenBanks && chosenBanks!.length > 0
              ? stringifySelectOptions(chosenBanks!)
              : selectedBanks
              ? stringifySelectOptions(banks || selectedBanks)
              : "",
          page_size: noPaginate ? 0 : 10,
          page: noPaginate ? 0 : newPage || 1,
          paginate: noPaginate ? "false" : true,
          search: search === undefined ? searchInput : search,
          categories,
          account_id: accountId,
        },
      })
        .unwrap()
        .then((res) => {
          const results = Array.isArray(res) ? res : res.results || [];
          const count = Array.isArray(res) ? res.length : res.count;
          setLoadingTransactions(false);

          // if infinite update,
          if (append) {
            setPage(newPage as number);
            setScrollState!((prev) => ({ ...prev, loading: false }));
            // add new response to old transactions
            setTransactions!((prev) => [...prev, ...results]); // check if there is more
          } else {
            setTransactions!((prev) => results);
            // start from scratch
            setPage(1);
          }
          setTransactionCount &&
            setTransactionCount((prev) => Number(count));
          return res;
        })
        .catch((err) => {
          throw Error(err.message);
          // getListOfTransactions();
        })
        .finally(() => {
          setLoadingTransactions(false);
          setScrollState &&
            setScrollState((prev) => ({
              ...prev,
              loading: false,
            }));
        });

    if (noPaginate) return getTransact();
    return getTransact()
      .then((data) => {})
      .catch((err) => {
        getTransact();
        console.error(err);
        // setLoadingTransactions(false);
      })
      .finally(() => {
        setLoadingTransactions(false);
      });
  };

  // Get the list of transactions with the date, banks and length filter
  useEffect(() => {
    if (selectedBanks) {
      if (
        selectedDate.value &&
        selectedBanks.length > 0 &&
        selectedCurrency.value
      ) {
        getListOfTransactions();
      }
    } else {
      if (selectedDate.value && selectedCurrency.value) {
        getListOfTransactions();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate.value, selectedBanks, selectedCurrency, categories]);

  // check if there is more transactions
  useEffect(() => {
    setScrollState &&
      setScrollState!((prev) => ({
        ...prev,
        more: page! < Math.ceil((transactionCount as number) / 10),
      }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions, transactionCount]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadMore = () => {
    if (!more) {
      return;
    }
    getListOfTransactions(true, page! + 1);
  };
  const loader = useRef(loadMore);
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          // getListOfTransactions(true, page + 1);
          loader.current();
        }
      },
      { root: rootElement!?.current, rootMargin: "0px", threshold: 0 }
    )
  );

  useEffect(() => {
    loader.current = loadMore;
  }, [loadMore]);
  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  return { getListOfTransactions };
};

interface IProps {
  setScrollState?: (
    value: React.SetStateAction<{
      loading: boolean;
      more: boolean;
    }>
  ) => void;
  selectedDate: ISelectOption;
  selectedCurrency: ISelectOption;
  selectedBanks?: ISelectOption[];
  setLoadingTransactions: (value: React.SetStateAction<boolean>) => void;
  setPage: (value: React.SetStateAction<number>) => void;
  setTransactions: (value: React.SetStateAction<ITransaction[]>) => void;
  setTransactionCount?: (
    value: React.SetStateAction<number | undefined>
  ) => void;
  page?: number;
  transactionCount?: number | undefined;
  transactions: ITransaction[];
  rootElement?: React.MutableRefObject<any>;
  element?: any;
  more?: boolean;
  searchInput?: string;
  categories?: string;
  noPaginate?: boolean;
  accountId?: string;
}
