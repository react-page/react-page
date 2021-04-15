import type { Dispatch, SetStateAction } from 'react';
import React, { useContext, useMemo, useState } from 'react';

const DialogContext = React.createContext<{
  visible?: boolean;
  setVisible?: Dispatch<SetStateAction<boolean>>;
}>({});

const DialogVisibleProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const value = useMemo(() => ({ visible, setVisible }), [visible, setVisible]);
  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
};
export const useDialogIsVisible = () => {
  return useContext(DialogContext)?.visible;
};
export const useSetDialogIsVisible = () => {
  return useContext(DialogContext)?.setVisible;
};
export default DialogVisibleProvider;
