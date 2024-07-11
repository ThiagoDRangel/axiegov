import { useContext } from 'react';
import { FooterContext } from '../contexts/FooterContext';
import { IFooterContextType } from '../interfaces/IFooterContextType';

export const useFooter: () => IFooterContextType = () => {
    const context = useContext(FooterContext);
    if (!context) {
        throw new Error('useFooter must be used within a FooterProvider');
    }
    return context;
};
