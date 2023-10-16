import { useEffect, useState } from "react";

type SetStateAction<S> = S | ((prevState: S) => S);
type Dispatch<A> = (value: A) => void;

export default function useStorageState<S = undefined>(
  defaultValue: S,
  key: string,
  initCallback?: (value: S) => void,
): [S, Dispatch<SetStateAction<S>>, boolean] {
  const [value, setValue] = useState(defaultValue);
  const [inited, setInited] = useState(false);

  useEffect(() => {
    chrome.storage.local.get([key]).then((result) => {
      if (initCallback) {
        initCallback(result[key]);
      }
      setValue(
        result[key] === undefined ? defaultValue : JSON.parse(result[key]),
      );
      setInited(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    chrome.storage.local.set({ [key]: JSON.stringify(value) });
  }, [key, value]);

  return [value, setValue, inited];
}
