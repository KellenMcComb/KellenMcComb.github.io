// IIFE -- Immediately Invoked Function Expression - (function(){})()
// AKA anonymous self-executing function
(function()
{
    function DisplayHome()
    {
        let AboutUsButton = document.getElementById("AboutUsButton");
        AboutUsButton.addEventListener("click", function()
        {
            location.href = "about.html";
        });
    }


    // Named function
    function Start()
    {
        console.log("Hello World!");

        switch(document.title)
        {
            case "Home":
                DisplayHome();
                break;
        }
    }




    window.addEventListener("load", Start);

})();