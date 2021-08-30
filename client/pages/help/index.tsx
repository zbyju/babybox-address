import { Alert, AlertIcon, Kbd, Heading, ListItem, Text, UnorderedList, OrderedList } from "@chakra-ui/react";
import React from "react";

export default function Babybo() {
    const headings = [{
        label: "Úvodní stránka",
        tag: "homepage"
    }]
    return (
        <>
            <Heading>Úvodní stránka</Heading>
            <Text>
                Na úvodní stránce je přehled všech Babyboxů. Karta každého babyboxu obsahuje:
            </Text>
            <UnorderedList ml={10}>
                <ListItem>Titulek - název babyboxu</ListItem>
                <ListItem>Hvězdu - po kliknutí je možné tento babybox přidat do oblíbených, nebo zase odebrat</ListItem>
                <ListItem>Další informace - počet adres, poznámky, ...</ListItem>
                <ListItem>Tlačítko <b>Otevřít</b> - Otevře stránku daného Babyboxu se statistikami a dalšími možnostmi</ListItem>
                <ListItem>Tlačítko <b>Přidat adresy</b> - Otevře formulář pro přidávání adres</ListItem>
            </UnorderedList>
            <Text>
                Na této stránce je možné vytvořit nový Babybox pomocí tlačítka <b>+</b>, které je umístěno nahoře.
            </Text>



            <Heading mt="5">Přidání adresy</Heading>
            <Text>
                Otevření formuláře pro přidání adres je možné na hlavní stránce pomocí tlačítka <b>Přidat adresy</b> nebo po otevření stránky babyboxu pomocí tlačítka <b>Přidávat další adresy</b>.
            </Text>
            <Text>
                Všechna povinná pole ve formuláři je nutné vyplnit, tato pole jsou označená pomocí <Text as="span" fontSize="xl" color="tomato">*</Text> (Jméno a příjmení v obou pádech, pohlaví, název společnosti, email, ulici, město a PSČ).
            </Text>
            <Alert status="info" variant="left-accent" my="3">
                <AlertIcon />
                <span>Mezi jednotlivými poli je možné se přesouvat pomocí: <Kbd mx="2">Tab</Kbd> (pro procházení v opačném směru <Kbd ml={2}>Shift</Kbd> + <Kbd>Tab</Kbd>)</span>
            </Alert>
            <Text>Pokud je zadané jméno v databázi jmen, pak je automaticky převedeno na 5. pád. Pokud jméno není převedeno, pak je potřeba zkontrolovat, jestli je napsané správně (velké/malé písmena, diakritika), může se však stát, že je databáze neúplná a v takovém případě je nutné 5. pád vyplnit ručně.</Text>
            <Alert status="info" variant="left-accent" my="3">
                <AlertIcon />
                <span>Pro rychlejší a přesnější vyplňování jednotlivých polí je dobré používat zkratky na kopírování a vkládání - <Kbd>CTRL</Kbd> + <Kbd>C</Kbd> a <Kbd>CTRL</Kbd> + <Kbd>V</Kbd></span>
            </Alert>
            <Text>Není možné přidávat adresy, které jsou duplicitní. Duplicitní adresy se zobrazí v tabulce pod formulářem (pokud je vše ok, pak se tabulka nezobrazuje). Pokud se zobrazuje duplicitní adresa jsou dvě možnosti, jak to řešit:</Text>
            <UnorderedList ml="10">
                <ListItem>Adresu ve formuláři neukládat a pokračovat dalšími adresami</ListItem>
                <ListItem>Odstranit duplicitní adresu v tabulce pomocí červeného tlačítka koše a následně uložit adresu ve formuláři</ListItem>
            </UnorderedList>
        </>
    )
}
