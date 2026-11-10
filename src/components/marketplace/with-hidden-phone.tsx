import React from 'react';

interface UseAuthReturn {
  isAuthenticated: boolean;
  user?: any;
}

// Mock useAuth hook - replace with your actual implementation
const useAuth = (): UseAuthReturn => {
  // This should be replaced with your actual auth context/hook
  return {
    isAuthenticated: false, // Replace with actual auth state
    user: null
  };
};

interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
  [key: string]: any;
}

interface WithPhoneProps {
  phone?: string;
  contacts?: ContactInfo;
  [key: string]: any;
}

export const withHiddenPhoneWrappingCard = <P extends WithPhoneProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithHiddenPhoneComponent = (props: P) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      const modifiedProps = { ...props };
      
      // Handle direct phone prop
      if (modifiedProps.phone) {
        modifiedProps.phone = "Доступно только авторизованным";
      }
      
      // Handle contacts object with phone
      if (modifiedProps.contacts && modifiedProps.contacts.phone) {
        modifiedProps.contacts = {
          ...modifiedProps.contacts,
          phone: "Доступно только авторизованным"
        };
      }
      
      return <WrappedComponent {...modifiedProps} />;
    }

    return <WrappedComponent {...props} />;
  };

  WithHiddenPhoneComponent.displayName = `withHiddenPhone(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithHiddenPhoneComponent;
};