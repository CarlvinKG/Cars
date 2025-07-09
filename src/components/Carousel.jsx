import React, { useEffect, useState } from 'react'
import { SiFord, SiBmw, SiToyota, SiHonda, SiAudi, SiChrysler, SiFiat, SiBugatti, SiCadillac, SiChevrolet, SiCitroen, SiFerrari, SiHyundai, SiNissan, SiMaserati, SiBentley,  SiVolkswagen, SiMercedes, SiKia, SiMclaren, SiPorsche, SiSubaru, SiMazda, SiAlfaromeo } from 'react-icons/si'

const Carousel = ({direction}) => {
    let manufacturerList = [
        SiFord, SiBmw, SiToyota, SiHonda, SiAudi, SiChrysler, SiFiat, SiBugatti, SiCadillac, SiChevrolet, SiCitroen, SiFerrari, SiHyundai, SiNissan, SiMaserati, SiBentley,  SiVolkswagen, SiMercedes, SiKia, SiMclaren, SiPorsche, SiSubaru, SiMazda, SiAlfaromeo
    ].map((Icon) => ({ icon: <Icon size={50} /> }));


    if (direction === 'right') {
        manufacturerList = manufacturerList.slice(0, 12)
    } else if (direction === 'left') {
        manufacturerList = manufacturerList.slice(12)
    }

    let duplicateList = manufacturerList.slice();


   for (let i = 0; i < manufacturerList.length; i++) {
        duplicateList.push(manufacturerList[i])
    }

    const [isAnimated, setIsAnimated] = useState(false)

    const addAnimation = () => {
        setIsAnimated(true);
    }

    useEffect(() => {
        if (typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            addAnimation();
        }
    }, []);

    return (
        <div className="container">
        <div className={`scroller ${isAnimated ? 'overflow-hidden mask-l-from-80%  mask-r-from-80%' : ''}`}>
            <div className={`scroller-content ${direction} ${isAnimated ? '' : 'flex-wrap '}`}>
                {duplicateList.map((manufacturer, index) => (
                    <div className="icon" key={index}>{manufacturer.icon}</div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default Carousel;