
import { useState} from "react"

const useInput = (initialValue: any) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (e:any, name:any) => {
        setValue((prevState: any) => ({
            ...prevState,
            [name]: e
        }));
    };
    return [
        value,
        onChange]
    };




export default useInput;