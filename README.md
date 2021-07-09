![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/kopcion/792d640ad8dad0e4c316a487f04cf471/raw/nurse-scheduling-problem-frontend__heads_next.json)
# Nurse Scheduling Problem

The algorithm implementation is a part of solution created for [Fundacja Rodzin Adopcyjnych](https://adopcja.org.pl), the adoption foundation in Warsaw (Poland) during Project Summer [AILab](http://www.ailab.agh.edu.pl) & [Glider](http://www.glider.agh.edu.pl) 2020 event. The aim of the system is to improve the operation of the foundation by easily and quickly creating work schedules for its employees and volunteers. So far, this has been done manually in spreadsheets, which is a cumbersome and tedious job.

The solution presented here is problem-specific. It assumes a specific form of input and output schedules, which was adopted in the foundation for which the system is created. The schedules themselves are adjusted based on the rules of the Polish Labour Code.

The system consists of three components which are on two GitHub repositories:

- web application which allows the user to load a schedule, modify it, set basic requirements, have it sent to solver service to be adjusted for another month and display discrepancies between shifts as seen in schedule and the rules of the Polish Labour Code
- solver written in Julia which adjusts schedules and provides information about points where the schedules do not adhere to the Polish Labour Code, if they arise (detailed information [here](https://github.com/Project-Summer-AI-Lab-Glider/nurse-scheduling-problem-solver))
- backend also written in Julia ([Genie framework](https://genieframework.com/)) which allows for communication of both aforementioned components (detailed information [here](https://github.com/Project-Summer-AI-Lab-Glider/nurse-scheduling-problem-solver))

This repository contains the frontend web application, and also a mock backend server created for testing purposes.

## Running an app

```
git clone https://github.com/Project-Summer-AI-Lab-Glider/nurse-scheduling-problem-frontend.git nurse-scheduling
cd nurse-scheduling
git checkout develop
npm install
npm start
```

## Electron

```
npm run e-start
```
