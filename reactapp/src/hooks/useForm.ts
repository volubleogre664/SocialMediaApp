import { useState } from "react";

function useForm<T>(callback: Function, initialState: T = {} as T) {
    const [values, setValues] = useState(initialState);

    const onChange = (onChangeEvent: any) => {
        switch (onChangeEvent.target.type) {
            case "file": {
                const [file] = onChangeEvent.target.files;

                if (!file) return;

                const fileReader = new FileReader();

                fileReader.onload = (readerEvent: any) => {
                    setValues({
                        ...values,
                        [onChangeEvent.target.name]: readerEvent.target.result,
                        [onChangeEvent.target.name + "File"]: file,
                    });
                };
                fileReader.readAsDataURL(file);
                break;
            }

            case "checkbox": {
                setValues({
                    ...values,
                    [onChangeEvent.target.name]: onChangeEvent.target.checked,
                });
                break;
            }

            default: {
                setValues({
                    ...values,
                    [onChangeEvent.target.name]: onChangeEvent.target.value,
                });
            }
        }
    };

    const onSubmit = (e: any = undefined) => {
        e?.preventDefault();
        callback();
    };

    const updateValues = (valueName: string, value: any) =>
        setValues({
            ...values,
            [valueName]: value,
        });

    return {
        onChange,
        onSubmit,
        updateValues,
        values,
    };
}

export default useForm;
