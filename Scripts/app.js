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

        
        // Step 1 - get a reference to entry point(s) (insertion / deletion point)
        let MainContent = document.getElementsByTagName("main")[0];
        let DocumentBody = document.body;

        // Step 2 - create an HTML element in memory
        let MainParagraph = document.createElement("p");
        let Article = document.createElement("article");
        let ArticleParagraph = `
        <p id="ArticleParagraph" class="mt-3">This is the Article Paragraph</p>`

        // Step 3 - configure new element
        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3");
        let FirstString = "This is";
        let SecondString = `${FirstString} the Main Paragraph.`;
        MainParagraph.textContent = SecondString;
        Article.setAttribute("class", "container");

        // Step 4 - perform insertion / deletion
        // Example - insert DOM after (append)
        MainContent.appendChild(MainParagraph);
        Article.innerHTML = ArticleParagraph;
        DocumentBody.appendChild(Article);
        
        // Example - replace the whole document body with super string!
        // DocumentBody.innerHTML = `
        //     <div class ="container">
        //     <h1 class="display-1">Hello, World!</h1>
        //     <p class="mt-5">and...what do you think of this!</p>
        //     </div>
        // `;




        // Example - insert DOM before
        // MainContent.before(MainParagraph);

        // Examples - deletion of AboutUsButton
        // document.getElementById("AboutUsButton").remove();
        // AboutUsButton.remove();

        // ES6 and HTML5 - Template Strings - "Super Strings"


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