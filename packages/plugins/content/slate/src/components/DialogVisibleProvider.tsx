import React, { Dispatch, SetStateAction, useContext, useState } from 'react';

const DialogContext = React.createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>([false, () => null]);

const DialogVisibleProvider = ({ children }) => {
  const visibleState = useState(false);

  return (
    <DialogContext.Provider value={visibleState}>
      {children}
    </DialogContext.Provider>
  );
};
export const useDialogIsVisible = () => {
  return useContext(DialogContext)?.[0];
};
export const useSetDialogIsVisible = () => {
  return useContext(DialogContext)?.[1];
};
export default DialogVisibleProvider;
