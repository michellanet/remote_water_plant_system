# remote_water_plant_system
Application to water plants remotely. Frontend and backend built using React and .Net Core respectively with Microsoft SQL Server

# backend system specification
1. Visual Studio 2019
2. Microsoft SQL Server Management Studio 18

# backend setup (.Net Core)
1. Goto folder
2. Open WaterPlantAPI
3. Code First Database Migration: Run SVPlantsAPI.sln
4. Build and run code
5. Goto Microsoft SQL Server Management Studio
6. Login and connect to SVPlantsDB database
7. Open query window
8. Insert SQL query and run
   'INSERT INTO dbo.Plants
           (PlantName
           ,PlantPhotoFileName
           ,WaterStartTime
           ,WaterEndTime)
     VALUES
           ('Corn Plant',	'corn_plant',	'2021-09-13 03:25:50.347',	'2021-09-13 03:26:01.807'),
           ('Rubber Plant',	'rubber_plant',	'2021-09-13 03:25:50.347',	'2021-09-13 03:26:01.807'),
           ('Plumeria Plant',	'plumeria_plant',	'2021-09-13 03:25:50.347',	'2021-09-13 03:26:01.807');'
           
 
# frontend system specification
1. Node version : v14.17.1
2. React version : 17.0.2

# frontend setup (react)
1. Goto terminal
2. Goto frontend directore: 'cd sv-plants-frontend'
3. Install dependencies: `npm ci`
4. Run frontend: `npm start`
5. Open url on browser: http://localhost:3000 
  
