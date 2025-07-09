import React, {useEffect, useState} from 'react'
import { BsSun, BsMoonStars } from 'react-icons/bs'
import {useLocalStorage} from 'react-use'

const DarkMode = () => {
    const [dark, setDark] = useState(false);
    const [value, setValue, remove]  = useLocalStorage('dark-mode', false);

    useEffect(() => {
        if (value) setDark(value);
    }, [value]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const root = window.document.documentElement;
            if (dark) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        }
        setValue(dark);
    }, [dark]);

    return (
        <div className="mx-[8px] cursor-pointer" onClick={() => setDark(!dark)}>
            {dark ? <BsSun className="text-yellow-300" size={35} /> : <BsMoonStars className="text-primary" size={35} />}
        </div>
    );
};

export default DarkMode;