<h1 align="center">
	<a>
		<img align="center"
			width="200"
			alt="Logo"
			src="https://phexora.com/assets/Logo-TransBGFullScale.png">
	</a>
</h1>

This is the website frontend client that communicates with the backend server. It is static, and you only need to compile and serve the `./dist` directory.

## Making Changes
When making changes, be sure to have your branch set to the `staging` branch and test that your code works correctly.
If your code runs without issue you may push it to the `staging` branch and the frontend for the staging domain (https://staging.phexora.com) will immediately start compiling your changes and running them (you won't need to run build each time).

## Running Development Environment

To run in a developer environment, run ```npm run dev``` in the project folder to fire up a development environment with Vite.
<br><br>
The environment will automatically recompile and restart when changes are made to the frontend code.
<br><br>
To stop the development environment, press ```CTRL+C```.

## Running in Production
If you want to simulate running in production, you can run ```npm run build``` and your code will be compiled and will be accessible on the `./dist` folder.
Note: The staging branch automatically runs on the staging API. You will need to change the baseUrl to the production API for a full simulation, but if you are developing the frontend to communicate with API endpoints that are still in staging, your code won't work.
## Setting Up a MongoDB database

For storing users, circles, and more, Phexora uses MongoDB.
<br><br>
Create a MongoDB instance either locally or using a cloud provider such as MongoDB Cloud Atlas.
<br><br>
Onc you have created your instance, create a database named "platform". Then, set the `DB_URI` to the following, filling in the spots: `mongodb+srv://USERNAME:PASSWORD@DBURL/platform?retryWrites=true&w=majority`

## Creating a Redis Server

For caching and key/value stores, Redis is used. Create a Redis instance either locally or using a cloud provider such as Redis Enterprise or DigitalOcean Databases.
<br><br>
The only key you need to create is a `STRING` key named `"maintenance"`, and set it to either `"true"` (maintenance mode on) or `"false"` (maintenance mode off).
<br><br>
After you have created the key, set the `REDIS` env paramater to the following, filling in the spots:
`redis://USERNAME:PASSWORD@HOST:PORT`

## Setting the JWT token

The JWT token can be anything you would like it to be. Usually, I set `TOKEN` to `TEST` but you could set it to something random if you would like (including symbols, lowercase levels, numbers, etc).

## Discord Setup

To test out development of the Discord Bot, use the development bot in the testing server. (https://discord.gg/)
<br><br>
The development bot is free to be used by all platform developers to aide in the development while testing on your local machine.
<br><br>
This makes it easier so that every developer does not have to create a discord bot and set up OAuth.
<br><br>
To use the development bot and client, set the following ENV Parameters to the following values:
| Paramater Name | Value |
| ----------- | ----------- |
| DISCORD_CLIENT_ID   | TBD |
| DISCORD_CLIENT_SECRET | TBD |
| DISCORD_GUILD | TBD |
| DISCORD_VERIFIED | TBD |
| BOT_TOKEN | TBD |
