import React, { Dispatch, SetStateAction, useContext, useState } from 'react';

const DialogContext = React.createContext<{
  visible?: boolean;
  setVisible?: Dispatch<SetStateAction<boolean>>;
}>({});

const DialogVisibleProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  return (
    <DialogContext.Provider value={{ visible, setVisible }}>
      {children}
    </DialogContext.Provider>
  );
};
export const useDialogIsVisible = () => {
  return useContext(DialogContext)?.visible;
};
export const useSetDialogIsVisible = () => {
  return useContext(DialogContext)?.setVisible;
};
export default DialogVisibleProvider;
