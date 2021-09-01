import { Address } from "../types/address.types";

function arrayUnique(array: Array<Address>) {
  var a = array.concat();
  for(var i=0; i<a.length; ++i) {
      for(var j=i+1; j<a.length; ++j) {
          if(a[i]._id?.toString() === a[j]._id?.toString())
              a.splice(j--, 1);
      }
  }

  return a;
}

export const duplicatesUnique = (duplicatesCompany: Array<Address>, duplicatesEmail: Array<Address>): Array<Address> => {
  return arrayUnique(duplicatesCompany.concat(duplicatesEmail));
}
