import * as React from 'react';
import {useState} from 'react';

const useTextInput = (defaultValue="") => {
    const [text, setText] = useState<string>(defaultValue);

    return [text, setText];
}

export default useTextInput;