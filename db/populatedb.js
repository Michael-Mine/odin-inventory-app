#! /usr/bin/env node

const { argv } = require("node:process");
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS developers (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS systems (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL UNIQUE,
  gamepads INTEGER CHECK (gamepads > 0),
  retiredOn TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 255 ) NOT NULL,
  year INTEGER CHECK (year > 1971 AND year < 2100) NOT NULL,
  system INTEGER REFERENCES systems,
  developer INTEGER REFERENCES developers,
  retiredOn TIMESTAMP WITH TIME ZONE
);

INSERT INTO developers (name)
VALUES ('Valve'), ('id Software'), ('ArenaNet'), ('Infinity Ward'),
('Treyarch'), ('Dice'), ('Rockstar North'), ('343 Industries');

INSERT INTO systems (name, gamepads)
VALUES ('PC', '14'), ('Xbox 360', '15'), 
('Xbox One', '16'), ('Xbox Series X', '17');

INSERT INTO games (title, year, system, developer)
VALUES
  ('Team Fortress Classic',     '1999', '1', '1'),
  ('Counter Strike',            '2000', '1', '1'),
  ('Quake 3 Arena',             '2001', '1', '2'),
  ('Guild Wars',                '2004', '1', '3'),
  ('COD 4: Modern Warfare',     '2008', '2', '4'),
  ('COD World at War',          '2009', '2', '5'),
  ('COD Modern Warfare 2',      '2010', '2', '4'),
  ('Battlefield: Bad Company 2','2011', '2', '6'),
  ('COD 7 Black Ops',           '2011', '2', '5'),
  ('Battlefield 3',             '2012', '2', '6'),
  ('Grand Theft Auto 5',        '2013', '2', '7'),
  ('Battlefield 4',             '2014', '3', '6'),
  ('Halo 5',                    '2015', '3', '8'),
  ('Battlefield Hardline',      '2015', '3', '6'),
  ('Star Wars Battlefront',     '2016', '3', '6'),
  ('Battlefield 1',             '2017', '3', '6'),
  ('Battlefield 5',             '2019', '3', '6'),
  ('Halo Infinite',             '2021', '4', '8'),
  ('Battlefield 2042',          '2021', '4', '6'),
  ('Battlefield 6',             '2025', '4', '6');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: argv[2],
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
