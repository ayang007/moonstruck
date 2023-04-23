##Elevator Pitch:

Missing your other half? Create a pocket of space-time at Moon-Struck, where you can pass notes like it's passing period, check the weather where they are, and count the days till you see them next! Moon-Struck is a beautiful, interactive mood and information board, fully equipped with hand-drawn skeuomorphic UI. We, having experienced lovesickness ourselves, developed Moon-Struck out of a recognition and understanding that those who are in long-distance relationships often miss out on the day-to-day activities that couples face-to-face have the fortune of experiencing. Moon-Struck allows for fun and accessible opportunities for intimacy, closeness, and spontaneity in couples in long distance relationships.

The word ‘moonstruck’ refers to the inability to think or act normally, often due to being consumed by love. Nights are endless when you miss someone, so our site is dappled in deep blues and purple hues. Magpies greet you and your partner in the main dashboard, as they are symbolic messengers of lovers kept apart, as told by Chinese mythology. In the background, the red thread of fate weaves remain unbroken still, even worlds apart.

With Moon-Struck—missing someone—doesn’t have to be so lonely.

##Inspiration:

We developed Moon-Struck out of a recognition and understanding that those who are in long-distance relationships often miss out on the day-to-day activities that couples face-to-face have the fortune of experiencing. When people are apart from their partners for long periods of time, it can be easy to miss out on the small details that exist in the person they cherish. By developing an application that can keep track of these details and can let your loved one know about your everyday activities, we provided a fun and accessible solution through these hardships.

##What it does:

Moon-Struck is a web application that enables couples who are in a long-distance relationship to stay in touch with each other and allows them to keep an active role in each others’ everyday lives. Moon-Struck is focused on the “Home Away from Home” track, which is best showcased through a user’s ability to see their partner’s real-time weather updates, location, timezone information, and post-it notes. Through these windows into your loved ones’ life, as well as quality-of-life features such as a menstrual calendar and a countdown to your reunion, Moonstruck allows people to feel as if they were with their partners in real life.

##How we built it:

Moon-Struck was built in the MERN software stack; specifically, we used MongoDB with Mongoose, Express, React, and NodeJS. Jacob focused on architecture, frontend logic, and integration of the frontend and backend. Jared focused on creating the database, working on API endpoints to service the frontend, and general backend duties. Angela worked on planning, frontend design, and asset creation. Shalini concentrated on frontend design and layout.

The frontend is comprised of React and CSS styling. Most styling had to be done manually to provide a unique skeuomorphic design and for better user experience, rather than using frontend libraries. Most of the assets and images are hand drawn (even the mouse pointers) to better showcase a romantic style.

The frontend requests backend services, such as creating, getting, updating, and deleting documents through XHR. All data about the users and their shared space is stored in MongoDB Atlas as documents. The backend provides MongoDB Atlas and other cloud services using NodeJS and Express. For the cloud services, This application requests data from the user and their partner, and if it is provided, Oracle Cloud, Heroku, and Google Cloud endpoints are called to provide accurate location data and to set up an independent Linux server to run the backend.

In addition, the server is also responsible for processing raw data returned from other API’s, reducing frontend complexity.

##Challenges we ran into:

One of the primary challenges we faced was due to our approach to the backend. For this project, the backend was responsible for both interacting with the database as well as external API’s. The primary backend server is a standalone server in Oracle cloud, with a Node instance running to process request. Also, due to CORS and TLS issues communicating with the server necessitated the use of an additional proxy, which runs on Heroku and runs a separate Node instance to forward requests.

In addition, the custom styling required significant time to complete, especially complex components such as a custom shape for a map integration.

Lastly, we ran into serious bugs when implementing the real-time synchronization between users. For example, synchronizing the position of post-it notes for users with different screen sizes posed a serious challenge. Scaling it so it would maintain the same relative position for all users was especially difficult. Bugs were also when React would not update changes from other clients.

##Accomplishments that we're proud of:

This project is the first major collaborative project that one of our teammates have worked on. This was their first experience in styling with CSS, utilizing Git and coding with React. In addition, this is the first time that we used MongoDB as a database for storing documents. Almost all of our images and assets used were hand-crafted by one of our teammates, leading to a more stylized final product. Finally, we are very proud of our ability to coordinate effectively to create a complex web application in such a short amount of time.

##What we learned:

We obtained greater experience in API development, design, and architecture. Specifically, we learned how to utilize HTTP requests to call APIs with fetch, axios, and XHP and how to structure our code around them to deal with any potential errors. In regards to the frontend, we learned how to use CSS to create more complicated stylings and how to make more complex React components.

##What's next for Moon-Struck:

One major feature that we had for Moon-Struck is a messaging feature. Users are able to schedule letters to send to their partners, and at a specified time, their partners can read these notes. In addition, we wanted to implement more personalized options for greater intimacy between partners. For example, we wanted to store images for a memory board that a user and partner could add to and drawing functionality.