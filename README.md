### Note: 
The idea for the project is not mine and not all of this code is mine, look at original files folder and the old github for who is responsible for writing the other code (Notable contributors: github users agilan123, gvvven, and whoever else worked on the front-end html that wasn't listed on the GitHub). Original files can be seen at https://github.com/agilan123/UIUC-Involvement-BOT.

# finishing-involvement-bot

Find project page at https://finishing-involvement-bot.onrender.com/. Instructions for running locally can be found [here](#instructions-for-running-locally)

*Note: May take up to a minute to load, this is due to the hosting service spinning down the website with inactivity*

## Motivation

The club and organization search can be relatively tougher than it should be at UIUC. The UIUC Involvement Bot is meant to provide a means for someone to get a list of potential clubs that could match their interests. Originally this project was a part of Project: Code. Due to special circumstances, it was not able to be completed with the group. I still wanted to see this vision come to life, so I took it into my own hands.

## Description

The UIUC Involvement Bot takes in a query of a user's interests and outputs clubs and organizations that align with the category and intensity level of the interest.
<br>
This project consists of two neural networks trained and designed for sentiment analysis of the same query. One determines the intensity level of the query (how involved the person wants to be) and the other determines the category. From the intensity level and the category, results are displayed from a database of school clubs and organizaitons that have the corresponding values. 

## Instructions For Running Locally

Setup: clone github repo, install python version 3.10.12 (pyenv or pyenv-win can help), and it is reccomended you set up a virtual environment.
1. Install all necessary packages with pip install -r "requirements.txt"
2. Start the server with "flask run" in the main repo directory
3. Take the localhost server that it launches and change the urls in app.py and static/scripts.js to match your localhost url
4. Relaunch the server with "flask run"

## Project Continuation (What could be added)

This project is more of a proof of concept than a fully completed and launchable app. It has all the functionality it needs, but is not polished for a good user experience. Some things that would be worked on are:
- Further tuning of intensity and category models
- Expansion of the clubs database beyond the 136 clubs that are present
- More functionality for saving, favoriting clubs
- Having active user feedback for the models