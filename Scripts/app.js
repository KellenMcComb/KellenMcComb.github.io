// IIFE -- Immediately Invoked Function Expression - (function(){})()
// AKA anonymous self-executing function
"use strict";
(function()
{
    function DisplayHome()
    {
        console.log("Home Page");

        // jQuery - returns an array of elements that match the query and attaches a click event
        $("#AboutUsButton").on("click", () =>
        {
            location.href = "about.html";
        });

        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph</p>`);

        $("body").append(`<article class="container">
            <p id="ArticleParagraph" class="mt-3">This is the Article Paragraph!</p>
            </article>`)
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

    /**
     * Adds a Contact Object to localStorage
     *
     * @param {string} fullName
     * @param {string} contactNumber
     * @param {string} emailAddress
     */
    function AddContact(fullName, contactNumber, emailAddress)
    {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize())
        {
            let key = contact.FullName.substring(0, 1) + Date.now();

            localStorage.setItem(key, contact.serialize());
        }
    }

    /**
     * Validates an input text field in the form and displays error 
     * in the message area if invalid
     *
     * @param {string} input_field_ID
     * @param {RegExp} regular_expression
     * @param {string} error_message
     */
     function ValidateField(input_field_ID, regular_expression, error_message)
     {
         let messageArea = $("#messageArea").hide();
         
         $("#" + input_field_ID).on("blur", function()
         {
             let inputFieldText = $(this).val();
 
             if(!regular_expression.test(inputFieldText))
             {
                 $(this).trigger("focus").trigger("select"); 
                 messageArea.addClass("alert alert-danger").text(error_message).show(); 
             }
             else
             {
                 messageArea.removeAttr("class").hide();
             }
         });
     }

     function ContactFormValidation()
    {
        ValidateField("fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]{1,})+([\s,-]([A-Z][a-z]{1,}))*$/,"Please enter a valid Full Name.");
        ValidateField("contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]?\d{4}$/, "Please enter a valid Contact Number.");
        ValidateField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address.");
    }

    function DisplayContactPage()
    {
        console.log("Contact Us Page");

        ContactFormValidation();

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function(event)
        {
            if(subscribeCheckbox.checked)
            {
                AddContact(fullName.value, contactNumber.value, emailAddress.value);
            }
        })
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

                let contact = new core.Contact(); // create empty Contact object
                contact.deserialize(contactData);

                // inject a repeatable row into the contactList table
                data += `<tr>
                <th scope="row" class="text-center">${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
                <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
                </tr>
                `;

                index++;
            }

            contactList.innerHTML = data;

            $("#addButton").on("click", () =>
            {
                location.href = "edit.html#add";
            });

            $("button.delete").on("click", function() // binds the lexical 'this' to this function's scope
            {
                if(confirm("Are you sure?"))
                {
                    localStorage.removeItem($(this).val());
                }

                // Refresh the page
                location.href = "contact-list.html";
            });

            $("button.edit").on("click", function()
            {
                location.href = "edit.html#" + $(this).val();
            });
        }
    }

    function DisplayEditPage()
    {
        console.log("Edit Page");

        ContactFormValidation();

        let page = location.hash.substring(1);

        switch(page)
        {
            case "add":
                {
                    $("main>h1").text("Add Contact");

                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);

                    $("#editButton").on("click", (event) =>
                    {
                        // Prevent default (edit)
                        event.preventDefault();
                        // Add Contact
                        AddContact(fullName.value, contactNumber.value, emailAddress.value);
                        // Refresh contact page
                        location.href= "contact-list.html";
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        location.href= "contact-list.html";
                    });
                }
                break;

            default:
                {
                    // Get Contact info from localStorage
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page));

                    // Display Contact info in the edit form
                    $("#fullName").val(contact.FullName);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);

                    // On editButton click update the Contact
                    $("#editButton").on("click", (event) =>
                    {
                        event.preventDefault();

                        // Get any changes from the form
                        contact.FullName = $("#fullName").val();
                        contact.ContactNumber = $("#contactNumber").val();
                        contact.EmailAddress = $("#emailAddress").val();

                        // Replace the item in localStorage
                        localStorage.setItem(page, contact.serialize());

                        // Return to the contact-list
                        location.href = "contact-list.html";
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        location.href = "contact-list.html";
                    });
                }
                break;
        }
    }

    function DisplayLoginPage()
    {
        console.log("Login Page");
    }

    function DisplayRegisterPage()
    {
        console.log("Register Page");
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

            case "Edit":
                DisplayEditPage();
                break;

            case "Login":
                DisplayLoginPage();
                break;

            case "Register":
                DisplayRegisterPage();
                break;
            
        }
    }


    window.addEventListener("load", Start);

})();