
# Brilliant Minds: Pious

## Project Overview
This project is a simple web application that allows users to create, read, update, and delete ideas. The app has a `home page` and an `edit/create page`. Users can add new ideas or modify existing ones on the `create/update` page, which can be accessed from the main page.

## Project Functionality

Home Page

The home page displays a list of existing ideas. The ideas are fetched from the server using a GET request to the `/ideas` endpoint. Each idea is displayed as a card that contains the following information:

- Listing Number (based on the ideas available at the moment, not on ideas ID)
- Idea Title
- Idea Description
- Date Created
- Date Modified (if applicable)
- Update Button
- Delete Button

**A Not-Modified Idea**

![Screenshot 2023-03-05 at 11 31 14](https://user-images.githubusercontent.com/102190049/222958969-7f20d4a9-bbf9-421c-9ae2-5725a5daa286.png)

**A Modified Idea**

![Screenshot 2023-03-05 at 11 42 11](https://user-images.githubusercontent.com/102190049/222958976-b062ec9b-dcc9-40ed-a852-aca2fa17da35.png)

## The Update/Delete Buttons
The update button allows users to navigate to the create/update page to update the idea, while the delete button allows users to delete the idea.

## The home page also has two text effects:
- When the mouse cursor is moved over the page title, the letters in the title are randomly replaced with other letters from the alphabet.
- There are several magic stars in the background of a part of the subheading text that move randomly.

**Some main functions in action**

![FullStackExercise](https://user-images.githubusercontent.com/102190049/222959202-bffea045-c385-4645-9554-b231639143e4.gif)

**Using the Delete Button**

![Delete Functions](https://user-images.githubusercontent.com/102190049/222959216-37e26d96-b780-4b2c-8422-6c269010240d.gif)


## The Create/Update Page
The create/update page allows users to create new ideas or update existing ones. The page title and description change dynamically based on whether the page is being used to create a new idea or update an existing one.

If the page is being used to update an existing idea, the idea data is fetched from the server using a GET request to the `/ideas/:id` endpoint, where `:id` is the ID of the idea being updated. The form fields are then populated with the existing data.

Users can fill in the form fields and click the "Save" button to create a new idea or update an existing one. If the form is submitted with empty fields, an error message is displayed.

**Create Page**

![Screenshot 2023-03-05 at 13 04 26](https://user-images.githubusercontent.com/102190049/222959442-831a5f4f-5a3d-4f46-b513-e276554d4200.png)


**Update Page**

![Screenshot 2023-03-05 at 13 04 38](https://user-images.githubusercontent.com/102190049/222959446-e93bda4a-ceb8-4ab3-a21b-7003f1524452.png)


## API Functions:

The `api.js` file contains functions for interacting with the server. These functions are used to fetch ideas from the server, create new ideas, and update existing ones.

The `loadIdeas` function fetches ideas from the server using a GET request to the `/ideas` endpoint. The function then creates HTML elements to display the ideas on the home page.

The `createIdea` function creates a new idea by sending a POST request to the `/ideas` endpoint with the title and description of the new idea.

The `updateIdea` function updates an existing idea by sending a PUT request to the `/ideas/:id` endpoint with the updated title and description.

## Utility Functions
The `utils.js` file contains a single utility function called `fetchIdea`. This function fetches an existing idea from the server using a GET request to the `/ideas/:id` endpoint. The function is used to fetch the data for an existing idea when the create/update page is being used to update an existing idea.


## Getting Started
To run the application, you need to have a server running on `localhost:3000`. You can use a tool like `json-server` to run a local JSON API server. Once you have a server running, you can open the `index.html` file in your web browser to view the homepage.

## Usage
To create a new idea, click on the "Create Idea" button on the homepage. This will take you to a form where you can enter a title and description for your idea. Once you have entered the details, click on the "Save" button to save the idea to the server. The new idea will be added to the list of existing ideas on the homepage.

To update an existing idea, click on the "Update" button next to the idea you want to update. This will take you to a form similar to the one for creating a new idea, but with the title and description fields pre-populated with the existing idea details. Update the details as needed, and click on the "Save" button to update the idea on the server.

To delete an existing idea, click on the "Delete" button next to the idea you want to delete. This will display a confirmation modal asking you to confirm the deletion. Click on the "Confirm" button to delete the idea from the server.

[Project Gist](https://gist.github.com/Piouscode/2218942a61c8e530a62c040cf8f560e9)


## Conclusion
It would be an understatement to say that I did not find this assignment particularly difficult. Here are some of the common challenges I faced while working on it:

1. Understanding the project requirements: It was critical for me to have a clear knowledge of what was needed before beginning the project. I had to go through the project instructions multiple times to properly comprehend what I needed to accomplish, and even when I do, I often struggle to put it down in code.

2. Setting up the server: To store and retrieve data for the project, I needed to set up a local server.
   While I had previously used a server, I had never utilized it in the manner that I needed to for this project.
   Since the website is built dynamically, I have a lot of trouble serving the files that I am changing.
   It took some time to figure out, but I was eventually able to accomplish it and check that everything was functioning correctly.

3. Working with asynchronous code: At first I didn't understand well, why asynchronicity is so valued in Back end 
   programming. There were several asynchronous functions and methods used in the project, such as fetching data 
   from the server and handling form submissions. This was challenging for me as I was not too very well-equipped 
   with asynchronous programming. I had to spend some time learning about promises and async/await to fully understand how to work with them and when and why I should work with them. 

4. Error debugging: While working on the project, I discovered various issues that I had to troubleshoot. This was difficult since it was not always evident what was generating the issues or how to correct them. I had to spend hours debugging the code and seeking internet for answers. Looking at the source code, you can see that I use console.log a lot, significantly more than I have in any of my past projects.

5. Styling the website: Although the project's primary emphasis was functionality, I also wanted the homepage to appear presentable.
   This was difficult at times due to the design I was looking for, since I had little expertise with adding functionality to the styling.
   To obtain the aesthetic I want, I had to spend time studying about how CSS and JavaScript can work together to bring useful styling to your website and experimenting with various styles.

Ultimately, working on this project was a wonderful learning opportunity. Although it was difficult at times, it assisted me in gaining a better grasp of web development and the tools and technologies utilized in the area, notably `RESTful` APIs. 

**Note**: I made some changes to the applications as a whole so that the project can be seen in real time from a browser. I want to use a free service instead of localhost to host my database. Once that is done, you will be able to see everything in real time.
