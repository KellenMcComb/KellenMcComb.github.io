// Name: Kellen McComb & Arbin Chowdhury
// Student ID: 100528029 (Kellen) & 100736044 (Arbin)
// Date Completed: 2022-02-06

(function()
{
    function DisplayHome()
    {
        
        // Get a reference to entry point(s)
        let MainContent = document.getElementsByTagName("main")[0];
        let DocumentBody = document.body;

        // Create HTML element in memory
        let MainParagraph = document.createElement("p");
        let Article = document.createElement("article");
        let ArticleParagraph = `
        <p id="ArticleParagraph" class="mt-3"><img src="./Content/Images/Homepage.jpg" width="100%" alt="Home Page Image" /> <br/><br/><br/></p>`

        // Configure new element
        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3"); 
        MainParagraph.textContent = `This is the website for the legendary website designers Kellen and Arbin. You are welcome for what you are
            about to experience.`;
        Article.setAttribute("class", "container");

        // Perform insertion
        MainContent.appendChild(MainParagraph);
        Article.innerHTML = ArticleParagraph;
        DocumentBody.appendChild(Article);
    }

    function DisplayAboutPage()
    {
        console.log("About Page");

        
        let MainContent = document.getElementsByTagName("main")[0];

        // Create the content of the page inside the innerHTML of the main tag
        MainContent.innerHTML = `<main class="container">
        <h1>Welcome to Our About Page!</h1>
        <p id="DescriptionParagraph" class="mt-3" style="font-size:25px;">Meet our team of professionals:<br/></p>
        <div class="row align-items-start">
          <div class="col">
                <p id="KellenParagraph" class="mt-3">Kellen McComb:<br/>
                Enjoys problem solving, programming, Seinfeld, and coffee.<br/><br/>
                <img src="./Content/Images/KellenProfile.jpg" height="400" alt="About Page Kellen Profile" /><br/>
                <a href = "./Content/Attachments/Kellen McComb Resume.pdf" target = "_blank">Click to view resume.</a></p>
            </div>
            <div class="col">
                <p id="ArbinParagraph" class="mt-3">Arbin Chowdhury:<br/>
                Enjoys playing soccer, listening to music, and developing websites.<br/><br/>
                <img src="./Content/Images/ArbinProfile.png" height="400" alt="About Page Arbin Profile" /><br/>
                <a href = "./Content/Attachments/Arbin Chowdhury Resume.pdf" target = "_blank">Click to view resume.</a></p>
            </div>
            </div>
        </main>`;
    }


    function DisplayProductsPage()
    {
        console.log("Our Projects Page");

        // Get a reference to entry point(s)
        let MainContent = document.getElementsByTagName("main")[0];
        let DocumentBody = document.body;

        // Set innerHTML of MainContent to a welcome message
        MainContent.innerHTML = `<main class="container">
            <h1>Welcome to Our Projects Page!</h1>        
            </main>`;

        // Create HTML elements in memory
        let MainParagraph = document.createElement("p");
        let Article1 = document.createElement("article");
        let Article1Paragraph = `<p id="Article1Paragraph" class="mt-3">This first project is an animated greeting card made for the Holiday season.<br/><br/>
        <img src="./Content/Images/ProjectsPage1.png" width="700" alt="Projects Page Image 1" /></p>`;

        let Article2 = document.createElement("article");
        let Article2Paragraph = `<p id="Article2Paragraph" class="mt-3">The second project is a functional calculator! How scientific!<br/><br/>
        <img src="./Content/Images/ProjectsPage2.png" width="260" alt="Projects Page Image 2" /></p>`;

        let Article3 = document.createElement("article");
        let Article3Paragraph = `<p id="Article3Paragraph" class="mt-3">The third project is an inventory management program for cars.<br/><br/>
        <img src="./Content/Images/ProjectsPage3.png" width="700" alt="Projects Page Image 3" /></p>`;

        // Configure new element
        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3");
        MainParagraph.textContent = `Here are some of our projects we've worked on.`;
        Article1.setAttribute("class", "container");
        Article2.setAttribute("class", "container");
        Article3.setAttribute("class", "container");

        // Perform insertion
        MainContent.appendChild(MainParagraph);
        Article1.innerHTML = Article1Paragraph;
        DocumentBody.appendChild(Article1);

        Article2.innerHTML = Article2Paragraph;
        DocumentBody.appendChild(Article2);

        Article3.innerHTML = Article3Paragraph;
        DocumentBody.appendChild(Article3);
    }

    function DisplayServicesPage()
    {
        console.log("Our Services Page");

        // Get a reference to entry point(s)
        let MainContent = document.getElementsByTagName("main")[0];
        let DocumentBody = document.body;

        // Create the page content consisting of a short description, listing of three skills, and associated images.
        MainContent.innerHTML = `<main class="container">
        <h1>Welcome to Our Services Page!</h1>
        <p id="DescriptionParagraph" class="mt-3" style="font-size:30px;color:grey;"><i>We offer a full range of services for many web-related jobs.</i><br/></p>
        <div class="row align-items-start">
          <div class="col">
                <p id="Article1Paragraph" class="mt-3">Web Development:<br/><br/>
                <img src="./Content/Images/ServicesPage1.png" height="200" alt="Services Page Image 1" /></p>
            </div>
            <div class="col">
                <p id="Article2Paragraph" class="mt-3">Graphic Design:<br/><br/>
                <img src="./Content/Images/ServicesPage2.png" height="200" alt="Services Page Image 2" /></p>
            </div>
            <div class="col">
                <p id="Article3Paragraph" class="mt-3">Mobile development.<br/><br/>
                <img src="./Content/Images/ServicesPage3.png" height="200" alt="Services Page Image 3" /></p>
            </div>
            </div>
        </main>`;
    }

    function DisplayContactPage()
    {
        console.log("Contact Us Page");

        // Set sendButton to a variable
        let sendButton = document.getElementById("sendButton");

        // Logic of "sendButton"
        sendButton.addEventListener("click", function(event)
        {
            // Prevent default nature of form (refreshing the page)
            event.preventDefault();

            // Print the user input to the console log
            console.log("Name: " + fullName.value);
            console.log("Contact Number: " + contactNumber.value);
            console.log("Email: " + emailAddress.value);
            console.log("Message: " + message.value);

            // Wait 3 seconds before sending the user to the home page
            window.setTimeout(function(){location.href = "index.html"}, 3000);
        })
    }


    // Named function
    function Start()
    {
        console.log("Hello World!");

        document.body.style.backgroundColor = "rgb(133,220,186)";
        
        // Create the navbar that appears at the top of every page
        let navbar = document.getElementById("navbarSupportedContent");
        navbar.innerHTML = `<ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="index.html"><i class="fas fa-home"></i> Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="products.html"><i class="fas fa-project-diagram"></i> Projects</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="services.html"><i class="fas fa-tools"></i> Services</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="about.html"><i class="fas fa-info"></i> About Us</a>
        </li>
        <li class="nav-item">
          <a class="nav-link"><i class="fas fa-user-friends"></i> Human Resources</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="contact.html"><i class="far fa-envelope"></i> Contact Us</a>
        </li>
        </ul>`;

        // Append a fixed-bottom navbar with copyright info to the body element
        let DocumentBody = document.body;
        let copyrightNavbar = `<nav class="navbar fixed-bottom navbar-dark bg-dark">
            <div class="container-fluid">
            <a class="navbar-brand" href="#">&copy; Copyright 2022</a>
            </div>
            </nav>`
        DocumentBody.innerHTML += copyrightNavbar;
        

        // Switch "Our Products" page title to "Our Projects"
        if(document.title == "Our Products")
        {
            document.title = "Our Projects";
        }

        // Switch case that determines which page-specific function to run based on document title
        switch(document.title)
        {
            case "Home":
                DisplayHome();
                break;

            case "About Us":
                DisplayAboutPage();
                break;

            case "Our Projects":
                DisplayProductsPage();
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
        }
    }

    window.addEventListener("load", Start);

})();