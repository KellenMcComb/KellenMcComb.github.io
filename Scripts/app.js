// IIFE -- Immediately Invoked Function Expression - (function(){})()
// AKA anonymous self-executing function
"use strict";
(function()
{
    function DisplayHome()
    {
        console.log("Home Page");

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
        <p id="ArticleParagraph" class="mt-3">This is the Article Paragraph!</p>`

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
        
    }


    function DisplayAboutPage()
    {
        console.log("About Page");
    }


    function DisplayProjectsPage()
    {
        console.log("Our Projects Page");
    }


    function DisplayServicesPage()
    {
        console.log("Our Services Page");
    }


    function DisplayContactPage()
    {
        console.log("Contact Us Page");

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function(event)
        {
            if(subscribeCheckbox.checked)
            {
                let contact = new Contact(fullName.value, contactNumber.value, emailAddress.value);
                if(contact.serialize())
                {
                    let key = contact.FullName.substring(0, 1) + Date.now();

                    localStorage.setItem(key, contact.serialize());
                }
            }
        });
    }

    function DisplayContactListPage()
    {
        console.log("Contact-List Page");
        if(localStorage.length > 0)
        {
            let contactList = document.getElementById("contactList");

            let data = ""; // data container - add deserialized data from the localStorage

            let keys = Object.keys(localStorage); // returns a string array of keys

            let index = 1; // counts number of keys

            // for every key in the keys array (collection), loop
            for (const key of keys) 
            {
                let contactData = localStorage.getItem(key); // get localStorage data value related to the key

                let contact = new Contact(); // create empty Contact object
                contact.deserialize(contactData);

                // inject a repeatable row into the contactList table
                data += `<tr>
                <th scope="row" class="text-center">${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td></td>
                <td></td>
                </tr>
                `;

                index++;
            }

            contactList.innerHTML = data;
        }
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

            case "About Us":
                DisplayAboutPage();
                break;

            case "Our Projects":
                DisplayProjectsPage();
                break;

            case "Our Services":
                DisplayServicesPage();
                break;

            case "Contact Us":
                DisplayContactPage();
                break;

            case "Contact-List":
                DisplayContactListPage();
                break;
        }
    }


    window.addEventListener("load", Start);

})();