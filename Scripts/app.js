// Authors: Kellen McComb (100528029) & Arbin Chowdhury (100736044)
// Date: 2022-02-26

"use strict";

/**
 * User class created for registered users of the system as per Lab 2 requirements
 *
 * @class User
 */
class User
    {

        // ==== Lab 2g ====
        
        // Constructor for User
        constructor(firstName = "", lastName = "", username ="", email = "", password = "")
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Email = email;
            this.Username = username;
            this.Password = password;
        }

        // Overridden toString() function to print out details of the user
        toString()
        {
            return `Full name: ${this.FirstName} ${this.LastName}\nEmail Address: ${this.Email}\nUsername: ${this.Username}`;
        }
    }

// IIFE
(function()
{
    /**
     * This function uses AJAX open a connection to the url and returns data to the 
     * callback function
     *
     * @param {string} method 
     * @param {string} url
     * @param {Function} callback
     */
    function AjaxRequest(method, url, callback)
    {
        // Step 1 - create new XHR object
        let XHR = new XMLHttpRequest();

        // Step 2 - create an event
        XHR.addEventListener("readystatechange", () =>
        {
            if(XHR.readyState === 4 && XHR.status === 200)
            {
                callback(XHR.responseText);
            }
        });

        // Step 3 - open a request
        XHR.open(method, url);

        // Step 4 - send request
        XHR.send();
    }

    /**
     * This function loads Navbar from the Header from the header file and injects the 
     * header and underlying HTML into the page
     *
     * @param {string} data
     */
    function LoadHeader(data)
    {
        $("header").html(data);
        $(`li>a:contains(${document.title})`).addClass("active");
        CheckLogin();
    }

    /**
     * Function that displays some learning exercises on the home page
     *
     */
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
            </article>`);
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
     * @param {string} input_field_ID the id of the element to access
     * @param {RegExp} regular_expression the regex to validate the user input
     * @param {string} error_message the error message to show if the input is not valid
     * @param {string} message_area_name the id of the message area to display the error message
     */
    function ValidateField(input_field_ID, regular_expression, error_message, message_area_name)
     {
         // ==== Lab 2e(2/2) ====

         // variable message area name based on added 4th parameter of function
         let messageArea = $(message_area_name).hide();
         
         $("#" + input_field_ID).on("blur", function()
         {
             let inputFieldText = $(this).val();

             // If the chosen field is not empty and fails the regex test, OR...
             if(inputFieldText && !regular_expression.test(inputFieldText) || 
             // ... if the passwords both have input and do not match...
                ($("#password").val() && $("#confirmPassword").val() &&
                 $("#password").val() != $("#confirmPassword").val()))
             {
                // ... focus on the incorrect field, and display the error message
                $(this).trigger("focus"); 
                messageArea.addClass("alert alert-danger").text(error_message).show(); 

                // If error was solely due to mismatched passwords, update error message to more appropriate one
                if($("#password").val() != $("#confirmPassword").val() &&
                    $("#password").val().length > 5 && 
                    $("#confirmPassword").val().length > 5)
                {
                    messageArea.text("Your passwords must match.");
                }

                // Clear the value of the incorrect field
                $(this).val("");
             }
             // If it passes, remove the error and hide
             else
             {
                messageArea.removeAttr("class").hide();
             }
         });
     }

    /**
     * Validation for the Contact Form
     *
     */
    function ContactFormValidation()
    {
        ValidateField("fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]{1,})+([\s,-]([A-Z][a-z]{1,}))*$/,"Please enter a valid Full Name.", "#messageArea");
        ValidateField("contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]?\d{4}$/, "Please enter a valid Contact Number.", "#messageArea");
        ValidateField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address.", "#messageArea");
    }

    /**
     * Validation for the Register Form
     *
     */
    function RegisterFormValidation()
    {
        // // ==== Lab 2c, 2d, 2e(1/2) ====
        ValidateField("firstName", /([A-Za-z]){2,}$/, 
            "Your first name must be at least 2 characters.", "#ErrorMessage");
        ValidateField("lastName", /([A-Za-z]){2,}$/, 
            "Your last name must be at least 2 characters.", "#ErrorMessage");
        ValidateField("emailAddress", /^[a-zA-Z0-9.@]{8,}\b$/, 
            "Your email address must be at least 8 characters and contain an @ symbol.", "#ErrorMessage");
        ValidateField("password", /[A-Za-z0-9!@#$%^&()]{6,}$/, 
            "Your passwords must contain at least 6 characters.", "#ErrorMessage");
        ValidateField("confirmPassword", /[A-Za-z0-9!@#$%^&()]{6,}$/, 
            "Your passwords must contain at least 6 characters.", "#ErrorMessage");
    }

    /**
     * Function to display the Contact page
     *
     */
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


    /**
     * Function to display the Contact List page
     *
     */
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

    /**
     * Function to display the Edit page
     *
     */
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

    /**
     * Function to display the Login page
     *
     */
    function DisplayLoginPage()
    {
        console.log("Login Page");
        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function()
        {
            let success = false;

            // create an empty user object
            let newUser = new core.User();

            // use jQuery shortcut to lod the users.json file
            $.get("./Assets/users.json", function(data)
            {
                // for every user in the users.json file, loop
                for (const user of data.users) 
                {
                    // check if the username and password entered matches the user data
                    if(username.value == user.Username && password.value == user.Password)
                    {
                        // get the user data from the file and assign it to our empty user object
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }

                 // if username and password matches..success! -> perform the login sequence
                if(success)
                {
                    // add user to session storage
                    sessionStorage.setItem("user", newUser.serialize());

                    // hide any error message
                    messageArea.removeAttr("class").hide();

                    // redirect the user to the secure area of the site - contact-list.html
                    location.href = "contact-list.html";
                }
                else
                {
                    // display an error message
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid Login Credentials").show();
                }
            });
        });

        $("#cancelButton").on("click", function()
        {
            // clear the login form
            document.forms[0].reset();

            // return to the home page
            location.href = "index.html";
        });
    }

    /**
     * Function that checks if a user is logged in, then modifies the nav bar based on result
     *
     */
    function CheckLogin()
    {

        // if user is logged in, then...
        if(sessionStorage.getItem("user"))
        {
            // ==== Lab 2a ====

            // get the user's username from the user info in session storage
            let currentUser = sessionStorage.getItem("user");
            let userDataArray = currentUser.split(",");
            
            // Set alias "currentUsername" for the 3rd item in the userDataArray, which is the username
            let currentUsername = userDataArray[2];

            // insert the current username into the navbar before the login link
            $(`<li class="nav-item">
            <a class="nav-link"> ${currentUsername}</a>
            </li>`).insertBefore("#login");


            // swap out the login link for logout
            $("#login").html(
                `<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`
            );

            $("#logout").on("click", function()
            {
                // perform logout
                sessionStorage.clear();
                
                // redirect back to login page
                location.href = "login.html";
            });
        }
    }

    /**
     * Function to display the Register page
     *
     */
    function DisplayRegisterPage()
    {
        console.log("Register Page");

        // ==== Lab 2b ====

        // Insert a div element with id "ErrorMessage" before the registerForm
        $(`<div id="ErrorMessage"></div>`).insertBefore("#registerForm");

        RegisterFormValidation();

        // If the ErrorMessage element is empty (no errors or cleared), hide it
        $("#ErrorMessage:empty").hide();

        // ==== Lab 2f ====

        // When the Register button is clicked...
        $("#submitButton").on("click", (event) =>
            {
                // Prevent default form submission
                event.preventDefault();


                // ==== Lab 2h ====

                // If all of the input fields have values...
                if ($("#firstName").val() && $("#lastName").val() &&
                    $("#emailAddress").val() && $("#password").val() &&
                    $("#confirmPassword").val() && $("#ErrorMessage:empty"))
                {
                    // Create a new User object with form input as attributes
                    let newUser = new User();
                    newUser.FirstName = $("#firstName").val();
                    newUser.LastName = $("#lastName").val();
                    newUser.Username = $("#firstName").val().toLowerCase() + $("#lastName").val().toLowerCase();
                    newUser.Email = $("#emailAddress").val();
                    newUser.Password = $("#password").val();

                    // Clear all of the form fields
                    $("#firstName").val("");
                    $("#lastName").val("");
                    $("#emailAddress").val("");
                    $("#password").val("");
                    $("#confirmPassword").val("");

                    // Display the User object
                    console.log(newUser.toString());
                }
                // If the form wasn't completed when the register button was clicked...
                else
                {
                    // Clear the form's password fields
                    $("#password").val("");
                    $("#confirmPassword").val("");

                    // Display an error message for not filling out the form before trying to register.
                    $("#ErrorMessage").addClass("alert alert-danger").text("The form must be filled to register.").show();
                }
            });



    }


    /**
     * Function that runs at the start of each page loading
     *
     */
    function Start()
    {
        console.log("Hello World!");

        AjaxRequest("GET", "header.html", LoadHeader);

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