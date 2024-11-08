//---------------------------------Dark Mode----------------------------------------------------

document.querySelector('.darkmode-toggle').addEventListener("change",(e) => {
    if (e.target.classList.contains('darkmode'))
    {
        const darkmodeevent = new CustomEvent('darkmode:toggle',{
            detail: {
                enabledbruh: e.target.checked
            }
        });

        e.stopPropagation();

        document.querySelector('.darkmode').dispatchEvent(darkmodeevent)
    }
})

document.querySelector('.darkmode').addEventListener('darkmode:toggle', function (event) {
    
    if (event.detail.enabledbruh){
        document.body.classList.add("darkness");
    }
    else{
        document.body.classList.remove("darkness");
    }

});
//---------------------------------Dark Mode----------------------------------------------------

