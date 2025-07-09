import React from 'react';

const CarImage = (make, year, model, angle, color) => {
    const url = new URL("https://cdn.imagin.studio/getimage");

   // const { make, year, model } = car;

    url.searchParams.append("customer", "hrjavascript-mastery");
    url.searchParams.append("zoomType", "fullscreen");
    url.searchParams.append("paintdescription", `${color}`);
    url.searchParams.append("modelFamily", model.split(" ")[0]);
    url.searchParams.append("make", make);
    url.searchParams.append("modelYear", `${year}`);
    url.searchParams.append("angle", `${angle}`);

    return `${url}`;
};

export default CarImage