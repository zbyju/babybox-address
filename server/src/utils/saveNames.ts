import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import { Name } from '../types/names.types';
import { save as saveFirstname } from '../dto/names/firstnameDto';
import { save as saveLastname } from '../dto/names/lastnameDto';

export const saveFile = (saveFunction: Function, file: string, sex: "male"|"female") => {
  return new Promise((resolve, reject) => {
    let i = 0
    fs.createReadStream(file)
    .pipe(csv())
    .on('data', async (row) => {
      const name: Name = {
        count: row.count,
        case1: row.case1,
        case5: row.case5.split(":")[0],
        sex: sex
      }
      await saveFunction(name)
    })
    .on('end', () => {
      // console.log('CSV file successfully processed');
      setTimeout(() => {
        resolve(true)
      }, 2 * 60 * 1000)
    });
  })
}

export const saveFirstnamesMen = async (saveFunction: Function) => {
  return new Promise(async (resolve, reject) => {
    await saveFile(saveFunction, path.join(__dirname, "../csv/krestni_muzi.csv"), "male")
    console.log("Done Firstnames Men")
    resolve(true)
  })
}

export const saveFirstnamesWomen = async (saveFunction: Function) => {
  return new Promise(async (resolve, reject) => {
    await saveFile(saveFunction, path.join(__dirname, "../csv/krestni_zeny.csv"), "female")
    console.log("Done Firstnames Women")
    resolve(true)
  })
}

export const saveLastnamesMen = async (saveFunction: Function) => {
  return new Promise(async (resolve, reject) => {
    await saveFile(saveFunction, path.join(__dirname, "../csv/prijmeni_muzi_1.csv"), "male")
    await saveFile(saveFunction, path.join(__dirname, "../csv/prijmeni_muzi_2.csv"), "male")
    console.log("Done Lastnames Men")
    resolve(true)
  })
}

export const saveLastnamesWomen = async (saveFunction: Function) => {
  return new Promise(async (resolve, reject) => {
    await saveFile(saveFunction, path.join(__dirname, "../csv/prijmeni_zeny_1.csv"), "female")
    await saveFile(saveFunction, path.join(__dirname, "../csv/prijmeni_zeny_2.csv"), "female")
    console.log("Done Lastnames Women")
    resolve(true)
  })
}

export const saveFirstnames = async () => {
  return new Promise(async (resolve, reject) => {
    await saveFirstnamesMen(saveFirstname)
    await saveFirstnamesWomen(saveFirstname)
    console.log("Done Firstnames")
    resolve(true)
  })
}

export const saveLastnames = async () => {
  return new Promise(async (resolve, reject) => {
    await saveLastnamesMen(saveLastname)
    await saveLastnamesWomen(saveLastname)
    console.log("Done Lastnames")
    resolve(true)
  })
}

export const saveNames = async () => {
  await saveFirstnames()
  await saveLastnames()
}
