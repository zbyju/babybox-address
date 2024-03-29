import {
  Address,
  FormAddressError,
  FormAddressItemError,
} from "../types/address";

export const isValidAddress = (address: Address): boolean => {
  return (
    address.firstname !== "" &&
    address.firstname5 !== "" &&
    address.lastname !== "" &&
    address.lastname5 !== "" &&
    address.street !== "" &&
    address.city !== "" &&
    address.postcode !== "" &&
    address.company !== "" &&
    (!address.email || address.email === "" || address.email.includes("@"))
  );
};

export const isValidFirstname = (name: string): FormAddressItemError => {
  if (name === "") return { isError: true, message: "Jméno je prázdné." };
  else return { isError: false };
};

export const isValidLastname = (name: string): FormAddressItemError => {
  if (name === "") return { isError: true, message: "Příjmení je prázdné." };
  else return { isError: false };
};

export const isValidSex = (sex: string): FormAddressItemError => {
  if (sex === "") return { isError: true, message: "Pohlaví je prázdné." };
  if (sex !== "male" && sex !== "female")
    return { isError: true, message: "Pohlaví musí být muž nebo žena." };
  else return { isError: false };
};

export const isValidTitleInFront = (title: string): FormAddressItemError => {
  return { isError: false };
};

export const isValidTitleBehind = (title: string): FormAddressItemError => {
  return { isError: false };
};

export const isValidCompany = (name: string): FormAddressItemError => {
  if (name === "") return { isError: true, message: "Společnost je prázdná." };
  else return { isError: false };
};

export const isValidStreet = (name: string): FormAddressItemError => {
  if (name === "") return { isError: true, message: "Ulice je prázdná." };
  else return { isError: false };
};

export const isValidCity = (name: string): FormAddressItemError => {
  if (name === "") return { isError: true, message: "Město je prázdné." };
  else return { isError: false };
};

export const isValidPostcode = (postcode: string): FormAddressItemError => {
  if (postcode === "") return { isError: true, message: "PSČ je prázdné." };
  else return { isError: false };
};

export const isValidEmail = (email: string): FormAddressItemError => {
  if (email === "") return { isError: false };
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email))
    return { isError: true, message: "Email je ve špatném formátu." };
  else return { isError: false };
};

export const calculateProgress = (
  address: Address,
  errors: FormAddressError
): number => {
  const split = 100 / 8; // 100 divided by #fields that has to be filled in
  let result = 0;

  if (address.firstname !== "" && !errors.firstname.isError) result += split;
  if (address.lastname !== "" && !errors.lastname.isError) result += split;
  if (address.firstname5 !== "" && !errors.firstname5.isError) result += split;
  if (address.lastname5 !== "" && !errors.lastname5.isError) result += split;
  if (address.company !== "" && !errors.company.isError) result += split;
  if (address.street !== "" && !errors.street.isError) result += split;
  if (address.city !== "" && !errors.city.isError) result += split;
  if (address.postcode !== "" && !errors.postcode.isError) result += split;

  return result;
};

export const sexToCZ = (sex: "male" | "female"): string => {
  return sex === "male" ? "Muž" : "Žena";
};

function arrayUnique(array: Array<Address>) {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i]._id === a[j]._id) a.splice(j--, 1);
    }
  }

  return a;
}

export const concatUnique = (
  x: Array<Address>,
  y: Array<Address>
): Array<Address> => {
  return arrayUnique(x.concat(y));
};

export const prettyShortAddress = (address?: Address): string => {
  if (!address) return "";
  const emailString = address.email ? `(${address.email})` : " ";
  return `${address.firstname} ${address.lastname} ${emailString}- ${address.company}`;
};

export const shortHouseAddress = (address?: Address): string => {
  if (!address) return "";
  return `${address.street}, ${address.city}, ${address.postcode}`;
};

export const shortFullname = (address?: Address): string => {
  if (!address) return "";
  return `${address.firstname} ${address.lastname}`;
};

export const filterEditedDuplicate = (
  duplicates: Array<Address>,
  address: Address
) => {
  if (!duplicates) return duplicates;
  return (duplicates as Array<Address>).filter((x) => x._id !== address._id);
};

export const filterByDonor = (
  addresses: Array<Address>,
  donorFilter: "all" | "donor" | "notDonor"
): Array<Address> => {
  if (donorFilter === "all") return addresses;
  if (donorFilter === "donor")
    return addresses.filter((a) => a.flags?.isDonor === true);
  if (donorFilter === "notDonor")
    return addresses.filter((a) => !a.flags?.isDonor);
  return addresses;
};

export const filterByEmail = (
  addresses: Array<Address>,
  emailFilter: "all" | "emailSent" | "emailNotSent"
): Array<Address> => {
  if (emailFilter === "all") return addresses;
  if (emailFilter === "emailSent")
    return addresses.filter((a) => a.flags?.isEmailSent === true);
  if (emailFilter === "emailNotSent")
    return addresses.filter((a) => !a.flags?.isEmailSent);
  return addresses;
};

export const filterBySearch = (
  addresses: Array<Address>,
  searchTerm: string
): Array<Address> => {
  if (!searchTerm) return addresses;
  const searchTermLower = searchTerm.toLowerCase();
  return addresses.filter((a) => {
    return (
      a.company.toLowerCase().includes(searchTermLower) ||
      a.email?.toLowerCase().includes(searchTermLower) ||
      a.firstname.toLowerCase().includes(searchTermLower) ||
      a.lastname.toLowerCase().includes(searchTermLower) ||
      a.street.toLowerCase().includes(searchTermLower) ||
      a.city.toLowerCase().includes(searchTermLower)
    );
  });
};

export const getTitleSalutation = (address: Address): string => {
  const tf = address.titleInFront || "";
  const tb = address.titleInFront || "";
  const titles = (tf + tb).toLowerCase();
  if (titles === "") return "";
  if (address.sex === "male") {
    if (titles.includes("prof")) return "profesore";
    if (titles.includes("doc")) return "docente";
    if (
      titles.includes("phd") ||
      titles.includes("mudr") ||
      titles.includes("mvdr") ||
      titles.includes("mddr") ||
      titles.includes("pharmdr") ||
      titles.includes("judr") ||
      titles.includes("thdr") ||
      titles.includes("drsc")
    )
      return "doktore";
    if (titles.includes("ing")) return "inženýre";
    if (
      titles.includes("mgr") ||
      titles.includes("phmr") ||
      titles.includes("mga")
    )
      return "magistře";
    if (titles.includes("bc")) return "bakaláři";
  } else {
    if (titles.includes("prof")) return "profesorko";
    if (titles.includes("doc")) return "docentko";
    if (
      titles.includes("phd") ||
      titles.includes("mudr") ||
      titles.includes("mvdr") ||
      titles.includes("mddr") ||
      titles.includes("pharmdr") ||
      titles.includes("judr") ||
      titles.includes("thdr") ||
      titles.includes("drsc")
    )
      return "doktorko";
    if (titles.includes("ing")) return "inženýrko";
    if (
      titles.includes("mgr") ||
      titles.includes("phmr") ||
      titles.includes("mga")
    )
      return "magistro";
    if (titles.includes("bc")) return "bakalářko";
  }
  return "";
};

export const getSpecialSalutation = (address: Address): string => {
  if (address.flags?.isMayor === true) {
    return address.sex === "male" ? "starosto" : "starostko";
  }
  return "";
};

export const getGenderSalutation = (address: Address): string => {
  if (address.sex === "male") {
    return "pane";
  } else {
    return "paní";
  }
};

export const getPresalutation = (address: Address): string => {
  const genderSal = getGenderSalutation(address);
  const specialSal = getSpecialSalutation(address);
  const titleSal = getTitleSalutation(address);
  let res = genderSal;
  if (specialSal !== "") res += " " + specialSal;
  if (titleSal !== "") res += " " + titleSal;
  return res;
};

export const getSalutation = (
  address: Address,
  customText?: string
): string => {
  return `${address.sex === "male" ? "Milý" : "Milá"} ${
    customText ? customText : getPresalutation(address)
  } ${address.lastname5},`;
};
