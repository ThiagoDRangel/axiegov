import React, { createContext, useState, ReactNode } from 'react';
import { IFooterContextType } from '../interfaces/IFooterContextType';

export const FooterContext = createContext<IFooterContextType | undefined>(undefined);

export const FooterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isFooterVisible, setFooterVisible] = useState(true);

    return (
        <FooterContext.Provider value={{ isFooterVisible, setFooterVisible }}>
            {children}
        </FooterContext.Provider>
    );
};
