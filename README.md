<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Henry


## Nasdrovia

This is a student project we made as part of our education at [Soy Henry](https://www.soyhenry.com/), which consisted of creating a full-stack React application from scratch.

### Our stack of technologies:

- Front End:
    + HTML - CSS - Javascript
    + React
    + React-Bootstrap
    + Redux

- Back End:
    + Node.js
    + Express
    + Passport
    + Sequelize

- Database: 
    + PostgreSQL

# How to start the project:

If you want to see the page for yourself, you'll need to do the following:

- Clone the repository
- Create a `.env` file in the `client` folder with the following contents: 
```
REACT_APP_API_URL=http://localhost:3001
```

- Install [PostgreSQL](https://www.postgresql.org/) on your computer and create a database called `development`.
- Head to the [Google](https://console.developers.google.com/projectselector2/apis/dashboard?supportedpurview=project), [Facebook](https://developers.facebook.com/) developer consoles to obtain your OAuth keys. If you're unfamiliat with the process, you can find some helpful guides [here](https://developers.google.com/fit/android/get-api-key), [here](https://theonetechnologies.com/blog/post/how-to-get-facebook-application-id-and-secret-key).

- Sign up with [Mailgun](https://www.mailgun.com/) and obtain an API key.

- Create a `.env` file in in the `api` folder with the following contents:
```
DB_USER={Your postgreSQL user}
DB_PASSWORD={Your postgreSQL password}
DB_HOST=localhost

passportSecret={Anything you want}

googleClientID={Your Google OAuth ID}
googleClientSecret={Your Google OAuth secret}

facebookClientID={Your Facebook OAuth ID}
facebookClientSecret={Your Facebook OAuth secret}

mailgunApiKey={Your Mailgun API key}
mailgunDomain={Your Mailgun domain}
```

The app doesn't have any products or users created by default, you'll have to add them yourself! In order to do so, you'll have to log in as an admin. The default admin is:

```
Email: admin@nasdrovia.com
Password: admin
```


# Previews

### Home page:

![alt text]("Home Page")

### Product Page:
![alt text]( "Product Page")

### Login:
![alt text]( "Login")

### User Profile:
![alt text]("User Profile")

### Admin Control Panel:
![alt text]( "Admin Control Panel")

### Purchase Order:
![alt text]( "Purchase Order Panel")

### 404 Page:
![alt text]("404 Page")

# About Us:

We are a group of 5 [Soy Henry](https://www.soyhenry.com/) students. These are our Github accounts:


