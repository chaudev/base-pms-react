import { useEffect, useState } from "react";

const useFetcher = <IData extends object>(
  fetcher: () => Promise<IData>,
  options?: {
    pause?: boolean;
    onError?: (err: any) => void;
    initData?: IData;
    deps?: React.DependencyList;
  }
) => {
  const [response, setResponse] = useState<IData>(
    options?.initData || ({} as IData)
  );
  const [error, setError] = useState<Error | null>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (options?.pause) return;
      try {
        setIsLoading(true);
        setResponse(await fetcher());
      } catch (error: any) {
        setError(error);
        options?.onError?.(error);
      } finally {
        setIsLoading(false);
      }
    })();
    return () => {};
  }, [...(options?.deps || [])]);

  return { response, error, isLoading };
};

export default useFetcher;
