function screenshotAnimate(){
    let maxDeg = 24
    for(let skewDeg = 0;skewDeg < maxDeg;skewDeg++){
        setTimeout(()=>{
            screenshot1.style.transform =   `skewX(${skewDeg}deg) translateX(${skewDeg*3}px)`
            console.log(skewDeg);
        },200);
    }
}

window.onload = ()=>{
    setTimeout(screenshotAnimate,2000);
}