import { useState, useRef, useEffect } from 'react';
import useOutsideClick from './PopupData';
import { DropdownSearchHealperfunctions } from './DropdownSearchHealperfunctions';
import { useDispatch, useSelector } from 'react-redux';

const DropDownHelper = (options, onChange, name, type, setItemData, setcusData, setBasicDetailsDisplayName) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(null);
    const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    const optionRefs = useRef([]);
    const dispatch = useDispatch();
    const debounceTimeoutRef = useRef(null); // Store debounce timeout reference
    const productType = useSelector((state) => state?.type);


    const handleSelect = (option) => {
        if (option.active !== "0") {
       
            onChange({
                target: {
                    name,
                    value: type === "masters" ? option.labelid : type === "service" ? option?.label : type === "masters2" ? option?.label : type === "taxRate" ? option?.tax_percentge : type === "currency" ? option?.code :type === "currency2" ? `${option?.country} (${option?.code})`: type === "rate" ? option : type === "masters_salutation" ? option?.label: type === "select_item2" ? option?.flight_name : type === "account" ? option?.account_type : option.id,

                }
            });

            if (type === "vendor" || type == "purchase") {
                setcusData(option);
            } else if (type === "select_item") {
                setItemData(option)
            }


            if (type === "basicDetail") {
                setBasicDetailsDisplayName((prevDetails) => ({
                    ...prevDetails,
                    display_name: option
                }));
            }

            setIsOpen(false);
            setSearchTerm('');
            setFocusedOptionIndex(-1);
            dropdownRef.current.focus();
        }
    };

    const handleSearch = () => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current); // Clear previous timeout
        }
        debounceTimeoutRef.current = setTimeout(() => {
            DropdownSearchHealperfunctions(searchTerm, type, dispatch, productType);
        }, 800);
        // }
    };

    useEffect(() => {
        if (isOpen) {
            handleSearch();
        }
        // else {
        //     setSearchTerm("");
        // }
    }, [searchTerm]);

    // custom Search
    if (type === "sub_categories") {
        options = searchTerm?.length === 0 ? options : options?.filter(option =>
            option?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        );
    }

    if (type === "masters") {
        options = searchTerm?.length === 0 ? options : options?.filter(option =>
            option?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        );
    }

    if (type === "masters2") {
        options = searchTerm?.length === 0 ? options : options?.filter(option =>
            option?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        );
    }

    if (type === "service") {
        options = searchTerm?.length === 0 ? options : options?.filter(option =>
            option?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        );
    }

    if (type === "taxRate") {
        options = searchTerm?.length === 0 ? options : options?.filter(option =>
            option?.tax_percentge?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        );
    }

    if (type === "currency") {
        options = searchTerm?.length === 0 ? options : options?.filter(option =>
            option?.code?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        );
    }
    if (type === "currency2") {
        options = searchTerm?.length === 0 ? options : options?.filter(option =>
            option?.code?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        );
    }

    if (type === "purchase") {
        options = searchTerm?.length === 0 ? options : options?.filter(option =>
            option?.purchase_order_id ? option?.purchase_order_id?.toLowerCase().includes(searchTerm?.toLowerCase()) : false
        );
    }


    if (type === "countries") {
        options = searchTerm?.length === 0 ? options : options?.filter(option =>
            option?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        );
    }

    // else if (type === "masters") {
    //     filteredOptions = searchTerm?.length === 0 ? options : options?.filter(option =>
    //         option?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    //     );
    // }
    // else if (type === "masters_salutation") {
    //     filteredOptions = searchTerm?.length === 0 ? options : options?.filter(option =>
    //         option?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    //     );
    // }
    // else if (type === "taxRate") {
    //     filteredOptions = searchTerm?.length === 0 ? options : options?.filter(option =>
    //         option?.tax_percentge?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    //     );
    // }
    // // else if (type === "vendor" || type === "vendor_charges") {
    // //     filteredOptions = searchTerm?.length === 0 ? options : options?.filter(option =>
    // //         option?.first_name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    // //     );
    // // }

    // else if (type === "select_item") {

    //     filteredOptions = searchTerm?.length === 0 ? options : options?.filter(option =>
    //         option?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    //     );
    // }

    // else if (type === "select_expense") {
    //     filteredOptions = searchTerm?.length === 0 ? options : options?.filter(option =>
    //         option.expense_name ? option.expense_name.toLowerCase().includes(searchTerm.toLowerCase()) : false
    //     );
    // }

    // else if (type === "bill_no") {
    //     filteredOptions = searchTerm?.length === 0 ? options : options??.filter(option =>
    //         option?.bill_no ? option?.bill_no?.toLowerCase().includes(searchTerm?.toLowerCase()) : false
    //     );
    // } else if (type === "basicDetail") {
    //     filteredOptions = options;
    // }

    // else if (type === "rate") {
    //     filteredOptions = options;
    // }
    // else if (type === "acc_type") {
    //     filteredOptions = searchTerm?.length === 0 ? options : options??.filter(option =>
    //         option?.account_type ? option?.account_type?.toLowerCase().includes(searchTerm?.toLowerCase()) : false
    //     );
    // }


    const handleKeyDown = (e) => {
        if (isOpen) {
            switch (e.key) {
                case 'ArrowDown':
                    setFocusedOptionIndex((prevIndex) => {
                        let nextIndex = prevIndex;
                        do {
                            nextIndex = nextIndex < options?.length - 1 ? nextIndex + 1 : 0;
                        } while (options[nextIndex]?.active == "0" && nextIndex !== prevIndex);
                        optionRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        return nextIndex;
                    });
                    break;
                case 'ArrowUp':
                    setFocusedOptionIndex((prevIndex) => {
                        let nextIndex = prevIndex;
                        do {
                            nextIndex = nextIndex > 0 ? nextIndex - 1 : options?.length - 1;
                        } while (options[nextIndex]?.active == "0" && nextIndex !== prevIndex);
                        optionRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        return nextIndex;
                    });
                    break;
                case 'Enter':
                    if (focusedOptionIndex >= 0 && options[focusedOptionIndex]?.active !== "0") {
                        handleSelect(options[focusedOptionIndex]);
                    }
                    break;
                case 'Tab':
                    setIsOpen(false);
                    break;
                default:
                    break;
            }
        } else if (e.key === "ArrowDown") {
            setIsOpen(true);
        }
    };


    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            setFocusedOptionIndex(-1);
        }
    }, [isOpen]);

    useOutsideClick(dropdownRef, () => setIsOpen(false));
    return {
        isOpen,
        setIsOpen,
        searchTerm,
        setSearchTerm,
        focusedOptionIndex,
        setFocusedOptionIndex,
        dropdownRef,
        inputRef,
        optionRefs,
        handleKeyDown,
        handleSelect,
    };
};

export default DropDownHelper;
