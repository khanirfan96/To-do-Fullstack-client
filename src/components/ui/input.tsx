import { Input, FormControl, FormLabel, FormHelperText, FormErrorMessage } from "@chakra-ui/react";

interface InputTypes {
    id?: string;
    type?: string;
    className?: string;
    placeholder?: string;
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "2xs" | "xs";
    value?: string;
    label?: string;
    handleInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    errorMessage?: string;
    showError?: boolean;
}

const CustomInput: React.FC<InputTypes> = ({ 
    id, 
    type = "text", 
    className, 
    placeholder, 
    size = "md", 
    label, 
    value, 
    handleInput, 
    disabled, 
    errorMessage, 
    showError = false,
    ...props 
}) => {

    const shouldShowError = showError && !!errorMessage;

    return (
        <FormControl isRequired={!!label} isInvalid={!!errorMessage}>
            {label && (
                <FormLabel htmlFor={id} className="text-white">
                    {label}
                </FormLabel>
            )}
            <Input
                id={id}
                type={type}
                className={className}
                placeholder={placeholder}
                size={size}
                value={value}
                onChange={handleInput}
                disabled={disabled}
                color={'white'}
                bg="whiteAlpha.200"
                border="1px solid rgba(255, 255, 255, 0.2)"
                _placeholder={{ color: "whiteAlpha.500" }}
                {...props}
            />
            {shouldShowError  ? (
                <FormErrorMessage>{errorMessage}</FormErrorMessage>
            ) : (
                <FormHelperText className="text-white">{label && `${label} is required`}</FormHelperText>
            )}
        </FormControl>
    );
};

export default CustomInput;