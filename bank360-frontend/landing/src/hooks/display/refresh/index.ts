import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useRefreshAccountsMutation } from "../../../features/services";
import { MONO_PUBLIC_KEY } from "../../../utils/constants";
import { monoImport } from "../../../pages/Homepage/mono-import";
import { useGetTokens } from "../../getDataFromStore/getDataFromState";

export const useRefresh = () => {
  const { access } = useGetTokens();
  const [refresh] = useRefreshAccountsMutation();
  const [refreshing, setRefreshing] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const MonoConnect: any = monoImport.MonoConnect;
  const monoConnect = useMemo(() => {
    const monoInstance = new MonoConnect({
      key: MONO_PUBLIC_KEY,
      onSuccess: ({ code }: { code: string }) => {
        toast.success("Successfully refreshed data");
      },
    });

    return monoInstance;
  }, []);

  function reauthoriseAccount(reauth_token: string) {
    if (reauth_token) {
      monoConnect.reauthorise(reauth_token);
      monoConnect.open();
    } else {
      toast.error("An error occured while refreshing data");
    }
  }

  const refreshAccounts = async (accountId: string) => {
    try {
      setRefreshing(true);
      const response: any = await refresh({
        accessToken: access,
        accountId,
      }).unwrap();

      toast.success("Successfully refreshed data");
    } catch (err: any) {
      if (err.status === 400) {
        const token = err.data.token;
        console.log("token here", token);
        reauthoriseAccount(token);
      } else {
        toast.error("An error occured while refreshing data");
      }
    } finally {
      setRefreshing(false);
    }
  };

  return { refreshAccounts, refreshing };
};
