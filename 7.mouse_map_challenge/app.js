document.addEventListener("mousemove", colorChange);


function colorChange(e){
    const r = Math.floor(e.pageX * 256 / window.innerWidth);
    const b = Math.floor(e.pageY * 256 / window.innerHeight);
    
    document.body.style.backgroundColor = `rgb(${r}, 0, ${b})`   
};