CREATE DATABASE  IF NOT EXISTS `the2cjk` ;
USE `the2cjk`;

DROP TABLE IF EXISTS `Infor`;
CREATE TABLE `Infor`(
  ID  VARCHAR(7)  primary key,
  Fname VARCHAR(20) NOT NULL,
  Lname VARCHAR(20) NOT NULL,
  Email VARCHAR(50) NOT NULL,
  Uname VARCHAR(20) NOT NULL,
  Pwd  VARCHAR(20) NOT NULL,
  checkAdmin INT NOT NULL default 0
);


DROP TABLE IF EXISTS `Promo`;
Create TABLE `Promo`(
  Pro_ID INT PRIMARY KEY,
  Pro_Name VARCHAR(20) NOT NULL,
  Pro_Desc VARCHAR(200), -- Product describe
  Pro_StartDate date,
  Pro_EndDate date,
  Pro_Price float,
  Pro_image varchar(50)
);

DROP TABLE IF EXISTS `ShabuSet`;
CREATE TABLE `ShabuSet` (
  Shabu_ID VARCHAR(4) PRIMARY KEY,
  Shabu_Name VARCHAR(50),
  Shabu_Desc VARCHAR(200),
  Shabu_Price FLOAT,
  Shabu_image varchar(50)
  -- 3 things khon, kid rai oak then go add
);

DROP TABLE IF EXISTS `Ingredient`;
CREATE TABLE `Ingredient` (
  Ingre_ID VARCHAR(4) PRIMARY KEY,
  Ingre_Name VARCHAR(50),
  Ingre_Price VARCHAR(4),
  Ingre_Amount VARCHAR(4),
  Ingre_image varchar(50)
);

INSERT INTO `Infor` (ID,Fname,Lname,Email,Uname,Pwd,checkAdmin) 
VALUES 	(6288006,"Jiratchaya","Benyakul","nunjiratchaya@gmail.com","nunhipstu","nunnynnunnoon",1),
		(6288009,"Chotikarn","Chalermjirarat","sherbie@gmail.com","SherChotikarn","sherbiethreee",1),
        (6288078,"Konton","Hongtong","kontonHT@gmail.com","DomeKonton","domemydome",1),
        (6288086,"Chatchai","Krisornsin","chatchai@gmail.com","Khaitoon","KThaloey",1),
        (6288088,"Phutthipong","Assarattanakul","bbillkin@gmail.com","bbillkin","tewplabudbillkin",0),
        (6288097,"Kanpimook","Bhuwakul","bambam@gmail.com","bambam1a","bambamlovesmarktuan",0),
        (6288096,"Chittaphon","Leechaiyapornkul","tenn@gmail.com","ten1001","tenlovesjae",0),
        (6288085,"Yibo","Wang","yibo85@gmail.com","yibo_85","yiboisacoolguy",0),
        (0,"Yibo","Wang","yibo85@gmail.com","test","testtest",0);
			
        
 -- SELECT * FROM Infor;
-- delete from Promo
INSERT INTO `Promo` (Pro_ID ,Pro_Name ,Pro_Desc, Pro_StartDate, Pro_EndDate,Pro_Price,Pro_image) 
VALUES (1, "Hot Deal", "The 2CJK Shabu coorperate with the organic farmers Hot Deal at the 2CJK Shabu provide discount 200 Bath for each of these items","2021-03-15", "2021-10-15",200,"https://i.imgur.com/DSXTv6n.jpg"),
	   (2, "Special Deal", "The 2CJK Shabu support the school Special Deal at the 2CJK Shabu provide discount 350 Bath for the student show student ID before start eating","2021-04-15", "2021-09-15",350,"https://i.imgur.com/i0KYwGk.jpg"),
	   (3, "Big Deal", "The 2CJK Shabu coorperate with the 1Card Big Deal at the 2CJK Shabu. Discount 400 Bath for The 1Card member","2021-05-15", "2021-08-15",400,"https://i.imgur.com/E6CSfor.jpg");
       

 -- SELECT * FROM Promo;


INSERT INTO `ShabuSet` (Shabu_ID, Shabu_Name, Shabu_Desc, Shabu_Price,Shabu_image)
VALUES	("0001","Classic Meat Shabu Set","The 2CJK is proudly to present our Classic Meat Shabu Set including all of our premium ingredients that will make you happier than before",740,"https://i.imgur.com/6Hrcx71.jpg"),
		("0002","Lonely wolf Shabu Set","The 2CJK is proudly to present this set is provides pork, beef, vegetable that make you happy",360,"https://imgur.com/TsXl6vV.jpg"),
        ("0003","Veggie Shabu Set","This set provides many kinds of vegetables more than classic set with the lower price",460,"https://imgur.com/JcMM9pB.jpg"),
        ("0004"," F**kin Full Sea food & Veggie lover Shabu Set","This set provides all of the vegetable that you need, also the fresh sea food only for you",999,"https://imgur.com/BH9YwYh.jpg"), 
        ("0005","Couple Shabu Set","This set provides vegetables, meat, eggs, and the various sauces for you and your mate",430,"https://imgur.com/dAKYu3q.jpg"),
        ("0006","Minimal Shabu Set","This set provides the vegetable and meat in the amount of one person : not alone when you eat with us",260,"https://imgur.com/fpOpJK9.jpg");
-- SELECT * FROM ShabuSet;



INSERT INTO `Ingredient` (Ingre_ID,Ingre_Name,Ingre_Price,Ingre_Amount,Ingre_image)
VALUES	("0001","Pangasius Hypophthalmus","39","4","https://i.imgur.com/zy6KK3v.jpg"),
		("0002","New Zealand Mussel","120","6","https://i.imgur.com/KWs93XW.jpg"),
		("0003","River Prawn","200","6","https://i.imgur.com/QRZI3Fd.jpg"),
		("0004","Squid","50","8","https://i.imgur.com/t65dvkp.jpg"),
		("0005","Australian Chuck Roll","180","6","https://i.imgur.com/Ds4ysyY.jpg"),
        ("0006","Bacon","65","10","https://i.imgur.com/Bpqm52E.jpg"),
		("0007","Pork ","139","4","https://i.imgur.com/qvggSEG.jpg"),
		("0008","Egg","4","1","https://i.imgur.com/4mnxBcv.jpg"),
		("0009","New Zealand Lamb","200","4","https://i.imgur.com/G5yHrgh.jpg"),
		("0010","Pork Ball","39","15","https://i.imgur.com/QfAKLi3.jpg"),
        ("0011","Chinese Cabbage","180","4","https://i.imgur.com/ubGSm5M.jpg"),
		("0012","Shrimp Dumpling","21","3","https://i.imgur.com/g1dVN6v.jpg"),
		("0013","Water Moming Glory","35","160g","https://i.imgur.com/yVjMF7q.jpg"),
		("0014","Enokitake Mushroom","39","100g","https://i.imgur.com/A1obWw6.jpg"),
		("0015","Pak Choi","39","160g","https://i.imgur.com/HyCYCqm.jpg");
        


